import { spendPoints } from "@/lib/points";
import prisma from "@/lib/prisma";
import siteConfig from "@/lib/siteConfig";
import fieldErrorResponse from "@/utils/fieldErrorResponse";
import isAuthenticated from "@/utils/isAuthenticated";
import { NextRequest, NextResponse } from "next/server";

export async function POST(req: NextRequest) {
  try {
    const auth = await isAuthenticated(req);
    if (!auth.isSuccess) return auth.response;

    const userId = auth.data.id;
    const { searchParams } = req.nextUrl;

    // 1. Fix: Correct param key for period
    const plan = searchParams.get("plan") as "PREMIUM" | "PRO";
    const period = searchParams.get("period") as "month" | "year";

    // 2. Validation
    if (!["PREMIUM", "PRO"].includes(plan))
      return fieldErrorResponse("root", "Invalid plan", 400);

    if (!["month", "year"].includes(period))
      return fieldErrorResponse("root", "Invalid period", 400);

    const result = await prisma.$transaction(async (tx) => {
      const user = await tx.user.findUnique({ where: { id: userId } });
      if (!user) throw new Error("USER_NOT_FOUND");

      if (user.plan === plan) throw new Error("ALREADY_ON_PLAN");
      if (user.plan === "PRO" && plan === "PREMIUM")
        throw new Error("CANNOT_DOWNGRADE");

      const planPointsPrice =
        Number(siteConfig.plans[plan].price) *
        (period === "month" ? 1 : 10) *
        siteConfig.POINTS_RATE;

      if (user.points < planPointsPrice) throw new Error("INSUFFICIENT_POINTS");

      const expiryDate = new Date();
      expiryDate.setDate(
        expiryDate.getDate() + (period === "month" ? 30 : 365)
      );

      const updatedUser = await tx.user.update({
        where: { id: userId },
        data: {
          points: { decrement: planPointsPrice },
          plan,
          currentPeriodEnd: expiryDate,
          pointTransactions: {
            create: {
              amount: planPointsPrice,
              type: "SPEND",
              source: "PURCHASE",
            },
          },
        },
        include: {
          pointTransactions: { take: 1, orderBy: { createdAt: "desc" } },
        },
      });

      return updatedUser;
    });

    return NextResponse.json({
      success: true,
      data: { plan: result.plan, expiry: result.currentPeriodEnd },
    });
  } catch (error: any) {
    if (error.message === "INSUFFICIENT_POINTS")
      return fieldErrorResponse("root", "Insufficient points balance", 400);
    if (error.message === "ALREADY_ON_PLAN")
      return fieldErrorResponse("root", "You are already on this plan", 400);
    if (error.message === "CANNOT_DOWNGRADE")
      return fieldErrorResponse("root", "You are already on higher plan", 400);

    console.error("Upgrade Error:", error);
    return fieldErrorResponse("root", "Internal server error", 500);
  }
}

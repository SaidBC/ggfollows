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

    const authUser = auth.data;
    const userId = authUser.id;

    const { searchParams } = req.nextUrl;
    const plan = searchParams.get("plan");

    if (!(plan === "PREMIUM" || plan === "PRO"))
      return fieldErrorResponse("root", "Invalid plan param value", 404);

    const user = await prisma.user.findUnique({
      where: {
        id: userId,
      },
    });

    if (!user) return fieldErrorResponse("root", "User not found", 404);
    if (user.plan === plan)
      return fieldErrorResponse(
        "root",
        "User already upgraded to this plan",
        404
      );
    if (user.plan === "PRO" && plan === "PREMIUM")
      return fieldErrorResponse(
        "root",
        "Cannot downgrade plan from PRO to PREMIUM",
        404
      );
    const planPointsPrice =
      Number(siteConfig.plans[plan].price) * siteConfig.POINTS_RATE;

    if (planPointsPrice > user.points)
      return fieldErrorResponse("root", "You don't have enough points", 400);

    const { transaction } = await spendPoints(
      user.id,
      planPointsPrice,
      "PURCHASE"
    );

    await prisma.user.update({
      where: {
        id: user.id,
      },
      data: {
        plan,
      },
    });

    return NextResponse.json({
      success: true,
      data: transaction,
    });
  } catch (error) {
    console.log(error);
    return fieldErrorResponse("root", "Internal server error", 500);
  }
}

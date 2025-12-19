import checkPlanExpiry from "@/lib/checkPlanExpiry";
import prisma from "@/lib/prisma";
import siteConfig from "@/lib/siteConfig";
import fieldErrorResponse from "@/utils/fieldErrorResponse";
import isAuthenticated from "@/utils/isAuthenticated";
import { NextRequest, NextResponse } from "next/server";

export async function GET(req: NextRequest) {
  try {
    const auth = await isAuthenticated(req);
    if (!auth.isSuccess) return auth.response;

    const authUser = auth.data;
    const userId = authUser.id;

    const today = new Date();

    const user = await prisma.user.findUnique({
      where: {
        id: userId,
      },
    });

    if (!user) return fieldErrorResponse("root", "User not found", 404);
    const isExpired = await checkPlanExpiry(user);
    const dailyReward =
      siteConfig.plans[isExpired ? "FREE" : user.plan].dailyReward;

    const lastClaim = user.lastDailyRewardDate
      ? new Date(user.lastDailyRewardDate)
      : null;

    const isClaimedToday =
      lastClaim &&
      lastClaim.getDate() === today.getDate() &&
      lastClaim.getMonth() === today.getMonth() &&
      lastClaim.getFullYear() === today.getFullYear();

    return NextResponse.json({
      success: true,
      data: {
        claimed: Boolean(isClaimedToday),
        streak: user.currentStreak,
        reward: dailyReward,
      },
    });
  } catch {
    return fieldErrorResponse("root", "Internal server error", 500);
  }
}

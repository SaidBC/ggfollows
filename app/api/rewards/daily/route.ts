import { earnPoints } from "@/lib/points";
import { TransactionSource } from "@prisma/client";
import isAuthenticated from "@/utils/isAuthenticated";
import { NextRequest } from "next/server";
import prisma from "@/lib/prisma";
import fieldErrorResponse from "@/utils/fieldErrorResponse";

const DAILY_BONUS = 20;
const DAY_IN_MS = 24 * 60 * 60 * 1000;

export async function POST(req: NextRequest) {
  const auth = await isAuthenticated(req);
  if (!auth.isSuccess) return auth.response;

  const authUser = auth.data;
  const userId = authUser.id;

  try {
    const today = new Date();
    today.setHours(0, 0, 0, 0);

    const user = await prisma.user.findUnique({
      where: {
        id: auth.data.id,
      },
    });
    if (!user) return fieldErrorResponse("root", "User not found", 404);

    const lastClaim = user.lastDailyRewardDate
      ? new Date(user.lastDailyRewardDate)
      : null;

    const isClaimedToday =
      lastClaim &&
      lastClaim.getDate() === today.getDate() &&
      lastClaim.getMonth() === today.getMonth() &&
      lastClaim.getFullYear() === today.getFullYear();
    const resetStreak = lastClaim
      ? lastClaim < new Date(today.getTime() - DAY_IN_MS)
      : false;
    if (isClaimedToday) {
      return fieldErrorResponse(
        "root",
        "You have already claimed today's reward!",
        400
      );
    }

    const { balance, transaction } = await earnPoints(
      userId,
      DAILY_BONUS,
      TransactionSource.DAILY_REWARD
    );
    await prisma.user.update({
      where: {
        id: user.id,
      },
      data: {
        lastDailyRewardDate: transaction.createdAt,
        currentStreak: resetStreak ? 1 : { increment: 1 },
      },
    });

    return Response.json({
      success: true,
      data: {
        message: `You have claimed ${DAILY_BONUS} points today!`,
        balance,
      },
    });
  } catch {
    return fieldErrorResponse(
      "root",
      "An error occurred during claiming reward",
      500
    );
  }
}

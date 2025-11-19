import { earnPoints } from "@/lib/points";
import { TransactionSource } from "@prisma/client";
import isAuthenticated from "@/utils/isAuthenticated";
import { NextRequest } from "next/server";
import prisma from "@/lib/prisma";

const DAILY_BONUS = 10; // points awarded per day

export async function POST(req: NextRequest) {
  const auth = await isAuthenticated(req);
  if (!auth.isSuccess) return auth.response;

  const authUser = auth.data;
  const userId = authUser.id;

  try {
    // Check if user already claimed today
    const today = new Date();
    today.setHours(0, 0, 0, 0); // start of today

    const claimedToday = await prisma.pointTransaction.findFirst({
      where: {
        userId,
        source: TransactionSource.DAILY_REWARD,
        createdAt: { gte: today },
      },
    });

    if (claimedToday) {
      return Response.json(
        { error: "You have already claimed today's reward!" },
        { status: 400 }
      );
    }

    // Award points using reusable function
    const newBalance = await earnPoints(
      userId,
      DAILY_BONUS,
      TransactionSource.DAILY_REWARD
    );

    return Response.json({
      success: true,
      message: `You have claimed ${DAILY_BONUS} points today!`,
      balance: newBalance,
    });
  } catch (err: any) {
    return Response.json({ error: err.message }, { status: 500 });
  }
}

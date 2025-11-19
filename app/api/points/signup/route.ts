import prisma from "@/lib/prisma";
import { earnPoints } from "@/lib/points";
import { TransactionSource } from "@prisma/client";
import isAuthenticated from "@/utils/isAuthenticated";
import { NextRequest } from "next/server";

const SIGNUP_BONUS_AMOUNT = 100;

export async function POST(req: NextRequest) {
  const auth = await isAuthenticated(req);
  if (!auth.isSuccess) return auth.response;

  const authUser = auth.data;
  const userId = authUser.id;

  try {
    // Check if user already claimed signup bonus
    const alreadyClaimed = await prisma.pointTransaction.findFirst({
      where: {
        userId,
        source: TransactionSource.SIGNUP_BONUS,
      },
    });

    if (alreadyClaimed) {
      return Response.json(
        { error: "Signup bonus already claimed" },
        { status: 400 }
      );
    }

    // Award signup bonus using reusable function
    const newBalance = await earnPoints(
      userId,
      SIGNUP_BONUS_AMOUNT,
      TransactionSource.SIGNUP_BONUS
    );

    return Response.json({
      success: true,
      message: `You have claimed your signup bonus of ${SIGNUP_BONUS_AMOUNT} points!`,
      balance: newBalance,
    });
  } catch (err: any) {
    return Response.json({ error: err.message }, { status: 500 });
  }
}

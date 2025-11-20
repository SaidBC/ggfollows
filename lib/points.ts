import { TransactionSource } from "@prisma/client";
import prisma from "./prisma";

/**
 * Get current user balance
 */
export async function getBalance(userId: string) {
  const user = await prisma.user.findUnique({
    where: { id: userId },
    select: { points: true },
  });

  return user?.points ?? 0;
}

/**
 * Add points to a user
 */
export async function earnPoints(
  userId: string,
  amount: number,
  source: TransactionSource
) {
  if (amount <= 0) throw new Error("Amount must be positive");

  return prisma.$transaction(async (tx) => {
    // update balance
    const updatedUser = await tx.user.update({
      where: { id: userId },
      data: { points: { increment: amount } },
    });

    // log transaction
    const transaction = await tx.pointTransaction.create({
      data: {
        userId,
        amount,
        type: "EARN",
        source,
      },
    });

    return {
      transaction,
      balance: updatedUser.points,
    };
  });
}

/**
 * Spend points safely (auto checks balance)
 */
export async function spendPoints(
  userId: string,
  amount: number,
  source: TransactionSource
) {
  if (amount <= 0) throw new Error("Amount must be positive");

  return prisma.$transaction(async (tx) => {
    const user = await tx.user.findUnique({
      where: { id: userId },
      select: { points: true },
    });

    if (!user) throw new Error("User not found");
    if (user.points < amount) throw new Error("Not enough points");

    const updatedUser = await tx.user.update({
      where: { id: userId },
      data: { points: { decrement: amount } },
    });

    await tx.pointTransaction.create({
      data: {
        userId,
        amount: -amount,
        type: "SPEND",
        source,
      },
    });

    return updatedUser.points;
  });
}

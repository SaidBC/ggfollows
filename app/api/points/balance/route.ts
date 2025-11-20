import prisma from "@/lib/prisma";
import fieldErrorResponse from "@/utils/fieldErrorResponse";
import isAuthenticated from "@/utils/isAuthenticated";
import { NextRequest, NextResponse } from "next/server";

export async function GET(req: NextRequest) {
  try {
    const auth = await isAuthenticated(req);
    if (!auth.isSuccess) return auth.response;

    const { id } = auth.data;

    const user = await prisma.user.findUnique({
      where: { id },
    });

    if (!user) return fieldErrorResponse("root", "User not found", 404);

    const now = new Date();

    const currentStart = new Date(now);
    currentStart.setDate(now.getDate() - 30);

    const previousStart = new Date(now);
    previousStart.setDate(now.getDate() - 60);

    const previousEnd = currentStart;

    const currentMonthTransactions = await prisma.pointTransaction.findMany({
      where: {
        userId: id,
        createdAt: {
          gte: currentStart,
          lte: now,
        },
      },
      select: { amount: true },
    });

    const previousMonthTransactions = await prisma.pointTransaction.findMany({
      where: {
        userId: id,
        createdAt: {
          gte: previousStart,
          lte: previousEnd,
        },
      },
      select: { amount: true },
    });

    const currentTotal = currentMonthTransactions.reduce(
      (a, t) => a + t.amount,
      0
    );
    const previousTotal = previousMonthTransactions.reduce(
      (a, t) => a + t.amount,
      0
    );

    let percentageChange = 0;

    if (previousTotal === 0) {
      if (currentTotal === 0) percentageChange = 0;
      else percentageChange = 100;
    } else {
      percentageChange = ((currentTotal - previousTotal) / previousTotal) * 100;
    }

    const formattedChange =
      (percentageChange > 0 ? "+" : "") + Math.round(percentageChange) + "%";

    return NextResponse.json({
      success: true,
      data: {
        points: user.points,
        changes: {
          month: {
            change: formattedChange,
            currentTotal,
            previousTotal,
          },
        },
      },
    });
  } catch (error) {
    console.error(error);
    return fieldErrorResponse("root", "Internal server error", 500);
  }
}

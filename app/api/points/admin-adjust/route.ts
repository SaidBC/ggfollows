import { earnPoints, spendPoints } from "@/lib/points";
import prisma from "@/lib/prisma";
import adminPointsAdjustSchema from "@/lib/schemas/adminPointsAdjustSchema";
import fieldErrorResponse from "@/utils/fieldErrorResponse";
import isAuthenticated from "@/utils/isAuthenticated";
import validateData from "@/utils/validateDate";
import { PointTransaction, TransactionSource } from "@prisma/client";
import { NextRequest, NextResponse } from "next/server";

export async function POST(req: NextRequest) {
  try {
    const auth = await isAuthenticated(req);
    if (!auth.isSuccess) return auth.response;
    const { id } = auth.data;
    const user = await prisma.user.findUnique({
      where: {
        id,
      },
    });
    if (!user) return fieldErrorResponse("root", "User not found", 404);
    if (user.role !== "ADMIN")
      return fieldErrorResponse("root", "Unauthorized", 403);
    const validatedData = await validateData(req, adminPointsAdjustSchema);
    if (!validatedData.isSuccess) return validatedData.response;

    const { userId, points } = validatedData.data;

    const targetUser = await prisma.user.findUnique({
      where: {
        id: userId,
      },
    });
    if (!targetUser)
      return fieldErrorResponse("root", "Target user not found", 404);
    let transaction: null | PointTransaction = null;
    let balance: null | number = null;
    if (points >= 0) {
      const res = await earnPoints(targetUser.id, points, "ADMIN_ADJUST");
      [transaction, balance] = [res.transaction, res.balance];
    }
    if (points < 0) {
      const res = await spendPoints(targetUser.id, points * -1, "ADMIN_ADJUST");
      [transaction, balance] = [res.transaction, res.balance];
    }
    return NextResponse.json({
      success: true,
      data: { transaction, balance },
    });
  } catch (err: any) {
    if (err instanceof Error)
      return fieldErrorResponse(
        "root",
        err.message || "Internal server error",
        500
      );
  }
}

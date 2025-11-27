import prisma from "@/lib/prisma";
import fieldErrorResponse from "@/utils/fieldErrorResponse";
import isAuthenticated from "@/utils/isAuthenticated";
import { Prisma } from "@prisma/client";
import { NextRequest, NextResponse } from "next/server";

export async function GET(req: NextRequest) {
  try {
    const auth = await isAuthenticated(req);
    if (!auth.isSuccess) return auth.response;

    const user = await prisma.user.findUnique({
      where: {
        id: auth.data.id,
      },
    });
    if (!user) return fieldErrorResponse("root", "User not found", 404);

    const where: Prisma.PointTransactionWhereInput = {};

    const { searchParams } = req.nextUrl;
    const userId = searchParams.get("userId");
    if (userId !== null) {
      if (user.id !== userId && user.role !== "ADMIN")
        return fieldErrorResponse(
          "root",
          "Cannot access other users transactions",
          400
        );
      where.userId = user.id;
    }
    if (userId === null && user.role !== "ADMIN")
      return fieldErrorResponse(
        "root",
        "Cannot view all application transactions",
        400
      );
    const transactions = await prisma.pointTransaction.findMany({
      where: where,
    });

    return NextResponse.json({ success: true, data: transactions });
  } catch {
    return fieldErrorResponse("root", "Internal server error", 500);
  }
}

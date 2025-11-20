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
      where.userId = user.id;
    }
    const transactions = await prisma.pointTransaction.findMany({
      where: where,
    });

    return NextResponse.json({ success: true, data: transactions });
  } catch (error) {
    return fieldErrorResponse("root", "Internal server error", 500);
  }
}

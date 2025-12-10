import prisma from "@/lib/prisma";
import siteConfig from "@/lib/siteConfig";
import fieldErrorResponse from "@/utils/fieldErrorResponse";
import isAuthenticated from "@/utils/isAuthenticated";
import { Prisma } from "@prisma/client";
import { NextRequest, NextResponse } from "next/server";

const DEFAULT_LIMIT = siteConfig.DEFAULT_LIMIT;

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
    let take: number | undefined = DEFAULT_LIMIT;
    let skip: number | undefined;

    const { searchParams } = req.nextUrl;
    const userId = searchParams.get("userId");
    const page = searchParams.get("page");
    const limit = searchParams.get("limit");

    if (page) {
      const pageValue = parseInt(page);
      if (isNaN(pageValue) || pageValue < 0)
        return fieldErrorResponse("root", "Invalid page value", 400);
      skip = (pageValue - 1) * parseInt(limit ?? String(DEFAULT_LIMIT));
    }
    if (limit) {
      const limitValue = parseInt(limit);
      if (isNaN(limitValue) || limitValue <= 0)
        return fieldErrorResponse("root", "Invalid take value", 400);
      take = limitValue;
    }

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
    const total = await prisma.pointTransaction.count({ where });
    const transactions = await prisma.pointTransaction.findMany({
      where: where,
      take,
      skip,
    });

    return NextResponse.json({ success: true, data: { transactions, total } });
  } catch {
    return fieldErrorResponse("root", "Internal server error", 500);
  }
}

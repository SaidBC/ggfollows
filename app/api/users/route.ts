import prisma from "@/lib/prisma";
import siteConfig from "@/lib/siteConfig";
import fieldErrorResponse from "@/utils/fieldErrorResponse";
import isAuthenticated from "@/utils/isAuthenticated";
import { Prisma, Task } from "@prisma/client";
import { NextRequest, NextResponse } from "next/server";

const DEFAULT_LIMIT = siteConfig.DEFAULT_LIMIT;

export async function GET(req: NextRequest) {
  try {
    const auth = await isAuthenticated(req);
    if (!auth.isSuccess) return auth.response;

    const where: Prisma.UserWhereInput = {};
    let take: number | undefined = DEFAULT_LIMIT;
    let skip: number | undefined;

    const { searchParams } = req.nextUrl;
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

    const total = await prisma.user.count({ where });
    const users = await prisma.user.findMany({
      where: where,
      take,
      skip,
    });

    return NextResponse.json({ success: true, data: { users, total } });
  } catch {
    return fieldErrorResponse("root", "Internal server error", 500);
  }
}

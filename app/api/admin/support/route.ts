import prisma from "@/lib/prisma";
import siteConfig from "@/lib/siteConfig";
import fieldErrorResponse from "@/utils/fieldErrorResponse";
import isAuthenticated from "@/utils/isAuthenticated";
import { Prisma, SupportTicketStatus } from "@prisma/client";
import { NextRequest, NextResponse } from "next/server";

const DEFAULT_LIMIT = siteConfig.DEFAULT_LIMIT;

export async function GET(req: NextRequest) {
  try {
    const auth = await isAuthenticated(req);
    if (!auth.isSuccess) return auth.response;

    const user = await prisma.user.findUnique({
      where: { id: auth.data.id },
    });

    if (!user || user.role !== "ADMIN") {
      return fieldErrorResponse("root", "Forbidden: Admin access only", 403);
    }

    const { searchParams } = req.nextUrl;
    const page = searchParams.get("page");
    const limit = searchParams.get("limit");
    const status = searchParams.get("status") as SupportTicketStatus | null;

    const where: Prisma.SupportTicketWhereInput = {};
    if (status) {
      where.status = status;
    }

    let take = DEFAULT_LIMIT;
    let skip = 0;

    if (page) {
      const pageValue = parseInt(page);
      if (!isNaN(pageValue) && pageValue > 0) {
        const limitValue = limit ? parseInt(limit) : DEFAULT_LIMIT;
        take = isNaN(limitValue) ? DEFAULT_LIMIT : limitValue;
        skip = (pageValue - 1) * take;
      }
    }

    const total = await prisma.supportTicket.count({ where });
    const tickets = await prisma.supportTicket.findMany({
      where,
      take,
      skip,
      orderBy: { createdAt: "desc" },
      include: {
        user: {
          select: {
            id: true,
            username: true,
            email: true,
          },
        },
      },
    });

    return NextResponse.json({ success: true, data: { tickets, total } });
  } catch (error) {
    console.error("Fetch tickets error:", error);
    return fieldErrorResponse("root", "Internal server error", 500);
  }
}

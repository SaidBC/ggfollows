import prisma from "@/lib/prisma";
import fieldErrorResponse from "@/utils/fieldErrorResponse";
import isAuthenticated from "@/utils/isAuthenticated";
import { Prisma } from "@prisma/client";
import { NextRequest, NextResponse } from "next/server";

export async function GET(req: NextRequest) {
  try {
    const auth = await isAuthenticated(req);
    if (!auth.isSuccess) return auth.response;

    const where: Prisma.RewardCampaignWhereInput = {};
    const { searchParams } = req.nextUrl;
    const isActive = searchParams.get("isActive");
    if (isActive !== null) {
      where.isActive = isActive === "true";
    }
    const campaigns = await prisma.rewardCampaign.findMany({ where: where });

    return NextResponse.json({ success: true, data: campaigns });
  } catch (error) {
    return fieldErrorResponse("root", "Internal server error", 500);
  }
}

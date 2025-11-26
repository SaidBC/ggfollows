import prisma from "@/lib/prisma";
import fieldErrorResponse from "@/utils/fieldErrorResponse";
import isAuthenticated from "@/utils/isAuthenticated";
import { NextRequest, NextResponse } from "next/server";

export async function GET(
  req: NextRequest,
  { params }: { params: Promise<{ name: string }> }
) {
  try {
    const auth = await isAuthenticated(req);
    if (!auth.isSuccess) return auth.response;
    const compaignName = (await params).name;

    const campaign = await prisma.rewardCampaign.findFirst({
      where: {
        name: compaignName,
      },
    });

    return NextResponse.json({ success: true, data: campaign });
  } catch {
    return fieldErrorResponse("root", "Internal server error", 500);
  }
}

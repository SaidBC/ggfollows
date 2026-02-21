import prisma from "@/lib/prisma";
import fieldErrorResponse from "@/utils/fieldErrorResponse";
import isAuthenticated from "@/utils/isAuthenticated";
import { SupportTicketStatus } from "@prisma/client";
import { NextRequest, NextResponse } from "next/server";

export async function PATCH(
  req: NextRequest,
  { params }: { params: Promise<{ id: string }> }
) {
  try {
    const { id } = await params;
    const auth = await isAuthenticated(req);
    if (!auth.isSuccess) return auth.response;

    const user = await prisma.user.findUnique({
      where: { id: auth.data.id },
    });

    if (!user || user.role !== "ADMIN") {
      return fieldErrorResponse("root", "Forbidden: Admin access only", 403);
    }

    const body = await req.json();
    const { status } = body;

    if (!status || !Object.values(SupportTicketStatus).includes(status)) {
      return fieldErrorResponse("root", "Invalid status", 400);
    }

    const ticket = await prisma.supportTicket.update({
      where: { id },
      data: { status: status as SupportTicketStatus },
    });

    return NextResponse.json({ success: true, data: ticket });
  } catch (error) {
    console.error("Update ticket error:", error);
    return fieldErrorResponse("root", "Internal server error", 500);
  }
}

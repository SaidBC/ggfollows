import prisma from "@/lib/prisma";
import supportTicketSchema from "@/lib/schemas/supportTicketSchema";
import validateData from "@/utils/validateDate";
import { getServerSession } from "next-auth";
import { authOptions } from "@/lib/auth";
import { NextRequest, NextResponse } from "next/server";

export async function POST(req: NextRequest): Promise<NextResponse> {
  try {
    const session = await getServerSession(authOptions);
    const userId = session?.user?.id;

    const validatedData = await validateData(req, supportTicketSchema);
    if (!validatedData.isSuccess) return validatedData.response;

    const { email, subject, message } = validatedData.data;

    const ticket = await prisma.supportTicket.create({
      data: {
        userId,
        email,
        subject,
        message,
      },
    });

    return NextResponse.json({ success: true, data: ticket });
  } catch (error) {
    console.error("Support ticket error:", error);
    return NextResponse.json(
      { success: false, error: "Failed to submit support ticket" },
      { status: 500 }
    );
  }
}

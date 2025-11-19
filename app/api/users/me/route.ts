import prisma from "@/lib/prisma";
import fieldErrorResponse from "@/utils/fieldErrorResponse";
import isAuthenticated from "@/utils/isAuthenticated";
import { NextRequest, NextResponse } from "next/server";

export async function GET(req: NextRequest) {
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
    return NextResponse.json({ success: true, data: user });
  } catch (error) {
    return fieldErrorResponse("root", "Internal server error", 500);
  }
}

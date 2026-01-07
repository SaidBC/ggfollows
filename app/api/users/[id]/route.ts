import prisma from "@/lib/prisma";
import updateUserSchema from "@/lib/schemas/updateUserSchema";
import fieldErrorResponse from "@/utils/fieldErrorResponse";
import isAuthenticated from "@/utils/isAuthenticated";
import validateData from "@/utils/validateDate";
import { NextRequest, NextResponse } from "next/server";

export async function PATCH(
  req: NextRequest,
  { params }: { params: Promise<{ id: string }> }
) {
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
    if (user.role !== "ADMIN") {
      return fieldErrorResponse("root", "Unauthorized", 403);
    }
    const { id: targetUserId } = await params;
    const targetUser = await prisma.user.findUnique({
      where: {
        id: targetUserId,
      },
    });
    if (!targetUser)
      return fieldErrorResponse("root", "Target user not found", 404);
    const validatedData = await validateData(req, updateUserSchema);
    if (!validatedData.isSuccess) {
      return validatedData.response;
    }
    const updatedUser = await prisma.user.update({
      where: {
        id: targetUserId,
      },
      data: {
        role: validatedData.data.role,
      },
    });
    return NextResponse.json({
      success: true,
      data: updatedUser,
    });
  } catch {
    return fieldErrorResponse("root", "Internal server error", 500);
  }
}

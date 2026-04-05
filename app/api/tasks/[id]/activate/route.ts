import prisma from "@/lib/prisma";
import fieldErrorResponse from "@/utils/fieldErrorResponse";
import isAuthenticated from "@/utils/isAuthenticated";
import { NextRequest, NextResponse } from "next/server";

export async function PATCH(
  req: NextRequest,
  { params }: { params: { id: string } }
) {
  try {
    const auth = await isAuthenticated(req);
    if (!auth.isSuccess) return auth.response;

    const { id } = await params;

    const task = await prisma.task.findUnique({
      where: { id },
    });

    if (!task) return fieldErrorResponse("root", "Task not found", 404);

    if (task.userId !== auth.data.id) {
      return fieldErrorResponse("root", "Unauthorized", 401);
    }

    const now = new Date();
    const expiresAt = new Date(now.getTime() + 24 * 60 * 60 * 1000); // 24 hours from now

    const updatedTask = await prisma.task.update({
      where: { id },
      data: { expiresAt },
    });

    return NextResponse.json({
      success: true,
      data: updatedTask,
    });
  } catch (error) {
    console.error(error);
    return fieldErrorResponse("root", "Internal server error", 500);
  }
}

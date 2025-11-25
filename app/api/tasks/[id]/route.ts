import { earnPoints } from "@/lib/points";
import prisma from "@/lib/prisma";
import checkTaskSchema from "@/lib/schemas/checkTaskSchema";
import fieldErrorResponse from "@/utils/fieldErrorResponse";
import isAuthenticated from "@/utils/isAuthenticated";
import validateData from "@/utils/validateDate";
import { NextRequest, NextResponse } from "next/server";

export async function DELETE(
  req: NextRequest,
  { params }: { params: Promise<{ id: string }> }
) {
  try {
    const auth = await isAuthenticated(req);
    if (!auth.isSuccess) return auth.response;
    const user = await prisma.user.findFirst({
      where: {
        id: auth.data.id,
      },
    });
    if (!user) return fieldErrorResponse("root", "User not found", 404);
    const taskId = (await params).id;
    const task = await prisma.task.findUnique({
      where: { id: taskId },
      select: {
        id: true,
        amount: true,
        quantity: true,
        _count: {
          select: {
            completions: {
              where: {
                status: "VERIFIED",
              },
            },
          },
        },
      },
    });
    if (!task) return fieldErrorResponse("root", "Task not found", 404);
    await prisma.task.delete({
      where: {
        id: task.id,
      },
    });
    if (task.quantity > task._count.completions) {
      const refundBalance =
        (task.quantity - task._count.completions) * task.amount;
      await earnPoints(auth.data.id, refundBalance, "TASK_FUNDING");
    }
    return NextResponse.json({
      success: true,
      data: task,
    });
  } catch (error) {
    console.error(error);
    return fieldErrorResponse("root", "Internal server error", 500);
  }
}

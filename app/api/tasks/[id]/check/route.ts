import { earnPoints } from "@/lib/points";
import prisma from "@/lib/prisma";
import checkTaskSchema from "@/lib/schemas/checkTaskSchema";
import fieldErrorResponse from "@/utils/fieldErrorResponse";
import isAuthenticated from "@/utils/isAuthenticated";
import validateData from "@/utils/validateDate";
import { NextRequest, NextResponse } from "next/server";

export async function POST(
  req: NextRequest,
  { params }: { params: Promise<{ id: string }> }
) {
  try {
    const auth = await isAuthenticated(req);
    if (!auth.isSuccess) return auth.response;
    const validatedData = await validateData(req, checkTaskSchema);
    if (!validatedData.isSuccess) return validatedData.response;
    const { platformUsername } = validatedData.data;
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
        allowsMultiAccount: true,
        userId: true,
        _count: {
          select: {
            completions: {
              where: {
                OR: [
                  {
                    status: "VERIFIED",
                    userId: user.id,
                  },
                  {
                    status: "VERIFIED",
                    completionProof: platformUsername,
                  },
                ],
              },
            },
          },
        },
      },
    });
    if (!task) return fieldErrorResponse("root", "Task not found", 404);
    if (task.userId === user.id)
      return fieldErrorResponse("root", "You cannot check your own task", 400);
    if (task._count.completions > 0 && !task.allowsMultiAccount)
      return fieldErrorResponse(
        "root",
        "Cannot check with multiple accounts or profiles",
        404
      );
    const taskCompletion = await prisma.taskCompletion.create({
      data: {
        taskId: task.id,
        completionProof: platformUsername,
        userId: user.id,
        status: "VERIFIED",
      },
    });
    const { transaction } = await earnPoints(
      user.id,
      task.amount,
      "TASK_COMPLETION"
    );

    return NextResponse.json({
      success: true,
      data: {
        transaction,
        taskCompletion,
      },
    });
  } catch {
    return fieldErrorResponse("root", "Internal server error", 500);
  }
}

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

    const result = await prisma.$transaction(async (tx) => {
      const task = await tx.task.findUnique({
        where: { id: taskId },
        select: {
          id: true,
          amount: true,
          allowsMultiAccount: true,
          userId: true,
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

      if (!task) throw { status: 404, message: "Task not found" };
      if (task.userId === user.id)
        throw { status: 400, message: "You cannot check your own task" };

      // Check if task is already full
      if (task._count.completions >= task.quantity) {
        throw { status: 400, message: "This task has already reached its completion limit" };
      }

      // Check for duplicate completion by same user or same platform username (if multi-account not allowed)
      const existingCompletion = await tx.taskCompletion.findFirst({
        where: {
          taskId: task.id,
          status: "VERIFIED",
          OR: [
            { userId: user.id },
            { completionProof: platformUsername },
          ],
        },
      });

      if (existingCompletion && !task.allowsMultiAccount) {
        throw { status: 400, message: "You have already completed this task or the platform profile is already used" };
      }

      const taskCompletion = await tx.taskCompletion.create({
        data: {
          taskId: task.id,
          completionProof: platformUsername,
          userId: user.id,
          status: "VERIFIED",
        },
      });

      return { task, taskCompletion };
    });

    const { transaction } = await earnPoints(
      user.id,
      result.task.amount,
      "TASK_COMPLETION"
    );

    return NextResponse.json({
      success: true,
      data: {
        transaction,
        taskCompletion: result.taskCompletion,
      },
    });
  } catch (error: any) {
    if (error.status) {
      return fieldErrorResponse("root", error.message, error.status);
    }
    console.error("Check Task Error:", error);
    return fieldErrorResponse("root", "Internal server error", 500);
  }
}

import { getBalance, spendPoints } from "@/lib/points";
import prisma from "@/lib/prisma";
import createTaskSchema from "@/lib/schemas/createTaskSchema";
import fieldErrorResponse from "@/utils/fieldErrorResponse";
import isAuthenticated from "@/utils/isAuthenticated";
import validateData from "@/utils/validateDate";
import { Prisma } from "@prisma/client";
import { NextRequest, NextResponse } from "next/server";

export async function POST(req: NextRequest) {
  try {
    const auth = await isAuthenticated(req);
    if (!auth.isSuccess) return auth.response;
    const balance = await getBalance(auth.data.id);
    if (balance === null)
      return fieldErrorResponse("root", "User not found", 404);

    const validatedData = await validateData(req, createTaskSchema);
    if (!validatedData.isSuccess) return validatedData.response;

    const { quantity, amount, description, title, platform, link } =
      validatedData.data;
    const total = quantity * amount;

    if (total > balance)
      return fieldErrorResponse("root", "You don't have enough points", 400);

    const task = await prisma.task.create({
      data: {
        title,
        description,
        quantity,
        amount,
        link,
        platform,
        userId: auth.data.id,
      },
    });

    const { transaction } = await spendPoints(
      auth.data.id,
      total,
      "TASK_FUNDING"
    );

    return NextResponse.json({
      success: true,
      data: {
        transaction,
        task,
      },
    });
  } catch {
    return fieldErrorResponse("root", "Internal server error", 500);
  }
}

export async function GET(req: NextRequest) {
  try {
    const auth = await isAuthenticated(req);
    if (!auth.isSuccess) return auth.response;

    const where: Prisma.TaskWhereInput = {};
    const { searchParams } = req.nextUrl;

    const tasks = await prisma.task.findMany({
      where: where,
      include: {
        creator: {
          select: {
            username: true,
          },
        },
        _count: {
          select: {
            completions: true,
          },
        },
      },
    });

    return NextResponse.json({ success: true, data: tasks });
  } catch {
    return fieldErrorResponse("root", "Internal server error", 500);
  }
}

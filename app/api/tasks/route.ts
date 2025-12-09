import { getBalance, spendPoints } from "@/lib/points";
import prisma from "@/lib/prisma";
import createTaskSchema from "@/lib/schemas/createTaskSchema";
import siteConfig from "@/lib/siteConfig";
import fieldErrorResponse from "@/utils/fieldErrorResponse";
import isAuthenticated from "@/utils/isAuthenticated";
import validateData from "@/utils/validateDate";
import { Prisma } from "@prisma/client";
import { NextRequest, NextResponse } from "next/server";

const DEFAULT_LIMIT = siteConfig.DEFAULT_LIMIT;

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
    let take: number | undefined = DEFAULT_LIMIT;
    let skip: number | undefined;

    const { searchParams } = req.nextUrl;
    const userId = searchParams.get("userId");
    const page = searchParams.get("page");
    const limit = searchParams.get("limit");

    if (page) {
      const pageValue = parseInt(page);
      if (isNaN(pageValue) || pageValue < 0)
        return fieldErrorResponse("root", "Invalid page value", 400);
      skip = (pageValue - 1) * parseInt(limit ?? String(DEFAULT_LIMIT));
    }
    if (limit) {
      const limitValue = parseInt(limit);
      if (isNaN(limitValue) || limitValue <= 0)
        return fieldErrorResponse("root", "Invalid take value", 400);
      take = limitValue;
    }

    if (userId) where.userId = userId;
    const total = await prisma.task.count({ where });
    const tasks = await prisma.task.findMany({
      where: where,
      take,
      skip,
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

    return NextResponse.json({ success: true, data: { tasks, total } });
  } catch {
    return fieldErrorResponse("root", "Internal server error", 500);
  }
}

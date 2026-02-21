import checkPlanExpiry from "@/lib/checkPlanExpiry";
import { spendPoints } from "@/lib/points";
import prisma from "@/lib/prisma";
import createTaskSchema from "@/lib/schemas/createTaskSchema";
import siteConfig from "@/lib/siteConfig";
import fieldErrorResponse from "@/utils/fieldErrorResponse";
import isAuthenticated from "@/utils/isAuthenticated";
import validateData from "@/utils/validateDate";
import { Prisma, Task } from "@prisma/client";
import { NextRequest, NextResponse } from "next/server";

const DEFAULT_LIMIT = siteConfig.DEFAULT_LIMIT;

export async function POST(req: NextRequest) {
  try {
    const auth = await isAuthenticated(req);
    if (!auth.isSuccess) return auth.response;
    const user = await prisma.user.findUnique({
      where: { id: auth.data.id },
      select: {
        id: true,
        plan: true,
        points: true,
        dailyTasksCreatedCount: true,
        lastTaskCreatedAt: true,
        currentPeriodEnd: true,
        _count: {
          select: {
            createdTasks: true,
          },
        },
      },
    });
    if (user === null) return fieldErrorResponse("root", "User not found", 404);

    const validatedData = await validateData(req, createTaskSchema);
    if (!validatedData.isSuccess) return validatedData.response;

    const { quantity, amount, description, title, platform, link } =
      validatedData.data;
    const total = quantity * amount;

    if (total > user.points)
      return fieldErrorResponse("root", "You don't have enough points", 400);

    const isExpired = await checkPlanExpiry(user);
    const now = new Date();
    const isNewDay =
      !user.lastTaskCreatedAt ||
      user.lastTaskCreatedAt.toDateString() !== now.toDateString();

    const isActiveLimitReached =
      user._count.createdTasks >=
      siteConfig.TASK_ACTIVE_LIMITS[isExpired ? "FREE" : user.plan];

    const limitCount = isNewDay ? 0 : user.dailyTasksCreatedCount;

    const isDailyLimitReached =
      limitCount >=
      siteConfig.TASK_DAILY_LIMITS[isExpired ? "FREE" : user.plan];

    if (isActiveLimitReached) {
      return fieldErrorResponse(
        "root",
        "Active tasks limit reached for your plan!",
        400
      );
    }
    if (isDailyLimitReached) {
      return fieldErrorResponse(
        "root",
        "Daily creation limit reached for your plan!",
        400
      );
    }

    const task = await prisma.$transaction(async (tx) => {
      const data = await tx.task.create({
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
      await tx.user.update({
        where: { id: auth.data.id },
        data: {
          dailyTasksCreatedCount: isNewDay ? 1 : { increment: 1 },
          lastTaskCreatedAt: now,
        },
      });
      return data;
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
  } catch (error) {
    console.log(error);
    return fieldErrorResponse("root", "Internal server error", 500);
  }
}

export async function GET(req: NextRequest) {
  try {
    const auth = await isAuthenticated(req);
    if (!auth.isSuccess) return auth.response;

    const user = await prisma.user.findUnique({
      where: { id: auth.data.id },
      select: { role: true }
    });

    const where: Prisma.TaskWhereInput = {};
    let take: number | undefined = DEFAULT_LIMIT;
    let skip: number | undefined;

    const { searchParams } = req.nextUrl;
    const userId = searchParams.get("userId");
    const page = searchParams.get("page");
    const limit = searchParams.get("limit");
    const isAdminView = searchParams.get("admin") === "true" && user?.role === "ADMIN";

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

    // Fetch all tasks matching the where clause
    const allMatchingTasks = await prisma.task.findMany({
      where: where,
      include: {
        creator: {
          select: {
            username: true,
          },
        },
        _count: {
          select: {
            completions: {
              where: { status: "VERIFIED" }
            },
          },
        },
      },
      orderBy: { createdAt: "desc" },
    });

    // Filter out full tasks only if we are browsing as a CLIENT (not looking at our own creator list)
    // AND not in admin view
    const filteredTasks = (userId || isAdminView)
      ? allMatchingTasks // If looking at specific user (likely own tasks) or admin view, show all
      : allMatchingTasks.filter(task => task._count.completions < task.quantity);

    const total = filteredTasks.length;
    const paginatedTasks = filteredTasks.slice(
      skip || 0,
      skip !== undefined ? (skip + (take || DEFAULT_LIMIT)) : undefined
    );

    return NextResponse.json({ success: true, data: { tasks: paginatedTasks, total } });
  } catch {
    return fieldErrorResponse("root", "Internal server error", 500);
  }
}

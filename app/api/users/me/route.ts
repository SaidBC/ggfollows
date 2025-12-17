import prisma from "@/lib/prisma";
import updateSettingsSchema from "@/lib/schemas/updateSettingsSchema";
import fieldErrorResponse from "@/utils/fieldErrorResponse";
import isAuthenticated from "@/utils/isAuthenticated";
import validateData from "@/utils/validateDate";
import { User } from "@prisma/client";
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
    const now = new Date();
    const isNewDay =
      !user.lastTaskCreatedAt ||
      user.lastTaskCreatedAt.toDateString() !== now.toDateString();

    const displayCount = isNewDay ? 0 : user.dailyTasksCreatedCount;
    return NextResponse.json({
      success: true,
      data: { ...user, dailyTasksCreatedCount: displayCount },
    });
  } catch {
    return fieldErrorResponse("root", "Internal server error", 500);
  }
}

type Allowed = Partial<Pick<User, "username">>;

export async function PATCH(req: NextRequest) {
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
    const validatedData = await validateData(req, updateSettingsSchema);
    if (!validatedData.isSuccess) return validatedData.response;
    const data = validatedData.data;

    const allowed: Allowed = {};

    for (const key of ["username"] as const) {
      if (data[key] !== undefined) {
        allowed[key] = data[key] as string;
      }
    }
    if (Object.keys(allowed).length === 0) {
      return fieldErrorResponse("root", "No valid fields provided", 400);
    }

    if (allowed.username) {
      const existingUser = await prisma.user.findFirst({
        where: {
          username: allowed.username,
        },
      });
      if (existingUser)
        return fieldErrorResponse(
          "username",
          "User with this username already exists",
          409
        );
    }
    const updatedUser = await prisma.user.update({
      where: {
        id: user.id,
      },
      data: allowed,
    });
    return NextResponse.json({ success: true, data: updatedUser });
  } catch {
    return fieldErrorResponse("root", "Internal server error", 500);
  }
}

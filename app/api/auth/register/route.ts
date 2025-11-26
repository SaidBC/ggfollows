import { NextRequest, NextResponse } from "next/server";
import bcrypt from "bcrypt";
import prisma from "@/lib/prisma";
import signUpApiSchema from "@/lib/schemas/signUpApiSchema";
import validateData from "@/utils/validateDate";
import fieldErrorResponse from "@/utils/fieldErrorResponse";

export async function POST(req: NextRequest) {
  try {
    const validatedData = await validateData(req, signUpApiSchema);
    if (!validatedData.isSuccess) return validatedData.response;
    const { email, username, password } = validatedData.data;

    const existingUser = await prisma.user.findFirst({
      where: {
        OR: [{ email }, { username }],
      },
    });

    if (existingUser) {
      return fieldErrorResponse(
        "root",
        "User with this email or username already exists",
        409
      );
    }

    const hashedPassword = await bcrypt.hash(password, 10);

    const user = await prisma.user.create({
      data: {
        ...validatedData.data,
        password: hashedPassword,
      },
      select: {
        id: true,
        name: true,
        username: true,
        email: true,
        image: true,
        bio: true,
        role: true,
      },
    });

    return NextResponse.json({ success: true, data: user }, { status: 200 });
  } catch {
    return fieldErrorResponse(
      "root",
      "An error occurred during registration",
      500
    );
  }
}

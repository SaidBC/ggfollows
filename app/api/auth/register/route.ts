import { NextRequest, NextResponse } from "next/server";
import bcrypt from "bcrypt";
import prisma from "@/lib/prisma";
import signUpApiSchema from "@/lib/schemas/signUpApiSchema";
import z from "zod";

export async function POST(req: NextRequest) {
  try {
    const body = await req.json();

    const validatedData = signUpApiSchema.safeParse(body);

    if (!validatedData.success)
      return NextResponse.json(
        {
          success: false,
          errors: z.flattenError(validatedData.error),
        },
        { status: 400 }
      );

    const { email, username, password } = validatedData.data;
    const existingUser = await prisma.user.findFirst({
      where: {
        OR: [{ email }, { username }],
      },
    });

    if (existingUser) {
      return NextResponse.json(
        {
          success: false,
          errors: { root: "User with this email or username already exists" },
        },
        { status: 409 }
      );
    }

    // Hash password
    const hashedPassword = await bcrypt.hash(password, 10);

    // Create user
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

    return NextResponse.json(
      { message: "User registered successfully", user },
      { status: 201 }
    );
  } catch (error) {
    return NextResponse.json(
      {
        success: false,
        errors: { root: "An error occurred during registration" },
      },
      { status: 500 }
    );
  }
}

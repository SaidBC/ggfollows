import prisma from "@/lib/prisma";
import emailVerifySchema from "@/lib/schemas/emailVerifySchema";
import fieldErrorResponse from "@/utils/fieldErrorResponse";
import isAuthenticated from "@/utils/isAuthenticated";
import validateData from "@/utils/validateDate";
import { NextRequest, NextResponse } from "next/server";

export async function POST(req: NextRequest) {
  const auth = await isAuthenticated(req);
  if (!auth.isSuccess) return auth.response;
  const validatedData = await validateData(req, emailVerifySchema);
  if (!validatedData.isSuccess) return validatedData.response;
  const { code } = validatedData.data;
  const email = auth.data.email;
  if (!email)
    return fieldErrorResponse("root", "Email not found in the cookie", 401);
  const user = await prisma.user.findFirst({
    where: {
      email,
    },
  });
  if (!user) return fieldErrorResponse("root", "User not found", 404);
  if (user.emailVerified)
    return fieldErrorResponse("root", "User email is already verified", 400);
  const latestCode = await prisma.verificationCode.findFirst({
    where: {
      email,
      codeExpires: { gt: new Date() },
      reason: "EMAIL_VERIFICATION",
    },
    orderBy: {
      createdAt: "desc",
    },
  });
  if (latestCode?.code !== Number(code)) {
    return fieldErrorResponse(
      "root",
      "Invalid or expired verification code",
      400
    );
  }
  await prisma.user.update({
    where: {
      email,
    },
    data: {
      emailVerified: new Date(),
    },
  });
  return NextResponse.json({ success: true, data: "Code Verification done" });
}

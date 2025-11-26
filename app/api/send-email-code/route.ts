import prisma from "@/lib/prisma";
import sendEmailCodeReasonSchema from "@/lib/schemas/sendEmailCodeReasonSchema";
import fieldErrorResponse from "@/utils/fieldErrorResponse";
import isAuthenticated from "@/utils/isAuthenticated";
import serverEnv from "@/utils/serverEnv";
import validateData from "@/utils/validateDate";
import { NextRequest, NextResponse } from "next/server";
import nodemailer from "nodemailer";
import z from "zod";

function generateCode() {
  return Math.floor(100000 + Math.random() * 900000); // 6-digit code
}

const TEN_DAYS_MS = 10 * 24 * 60 * 60 * 1000;

export async function POST(req: NextRequest): Promise<NextResponse> {
  const auth = await isAuthenticated(req);
  if (!auth.isSuccess) return auth.response;
  const validatedData = await validateData(
    req,
    z.object({ reason: sendEmailCodeReasonSchema })
  );
  if (!validatedData.isSuccess) return validatedData.response;
  const { data } = validatedData;
  const user = auth.data;
  if (!user.email) {
    return fieldErrorResponse("root", "User does not have an email", 400);
  }
  if (Boolean(user.emailVerified)) {
    return fieldErrorResponse("root", "User email is already verified", 400);
  }
  const code = generateCode();
  await prisma.verificationCode.create({
    data: {
      code,
      codeExpires: new Date(Date.now() + TEN_DAYS_MS),
      email: user.email,
      reason: data.reason,
    },
  });

  const transporter = nodemailer.createTransport({
    service: "Gmail",
    auth: {
      user: serverEnv.EMAIL_USER,
      pass: serverEnv.EMAIL_PASS,
    },
  });

  await transporter.sendMail({
    from: '"GGfollows" <noreply@ggfollows.com>',
    to: user.email,
    subject: "Your verification code",
    text: `Your verification code is: ${code}`,
  });

  return NextResponse.json({ success: true, data: "Verification code sent" });
}

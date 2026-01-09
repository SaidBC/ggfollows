import prisma from "@/lib/prisma";
import fieldErrorResponse from "@/utils/fieldErrorResponse";
import { NextResponse } from "next/server";

export async function GET() {
  try {
    const services = await prisma.service.findMany({
      where: { isActive: true },
    });
    return NextResponse.json({ success: true, data: services });
  } catch {
    return fieldErrorResponse("root", "Internal server error", 500);
  }
}

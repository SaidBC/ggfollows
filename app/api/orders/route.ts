import { NextRequest, NextResponse } from "next/server";
import prisma from "@/lib/prisma";
import isAuthenticated from "@/utils/isAuthenticated";
import fieldErrorResponse from "@/utils/fieldErrorResponse";
import validateData from "@/utils/validateDate";
import serviceOrderSchema from "@/lib/schemas/serviceOrderSchema";
import createNowPayment from "@/lib/payments/createNowPayment";
import { Prisma } from "@prisma/client";
import siteConfig from "@/lib/siteConfig";

export async function POST(req: NextRequest) {
  try {
    const auth = await isAuthenticated(req);
    if (!auth.isSuccess) return auth.response;
    const userId = auth.data.id;

    const validatedData = await validateData(req, serviceOrderSchema);
    if (!validatedData.isSuccess) return validatedData.response;
    const { code, quantity, link } = validatedData.data;
    const service = await prisma.service.findFirst({
      where: { code },
    });
    if (!service) return fieldErrorResponse("root", "Service not found", 404);
    if (!service.isActive)
      return fieldErrorResponse("root", "Service not Active", 400);

    const isUserAlreadyOrdered = await prisma.order.findFirst({
      where: {
        userId,
        serviceId: service.id,
        status: {
          in: ["PENDING", "PROCESSING"],
        },
      },
    });
    if (isUserAlreadyOrdered)
      return fieldErrorResponse(
        "root",
        "You have an ongoing order for this service",
        400
      );
    const amount = (service.pricePerUnit * quantity) / 1000;
    const payment = await createNowPayment({ userId, amount });

    const order = await prisma.order.create({
      data: {
        serviceId: service.id,
        quantity,
        link,
        totalPrice: amount,
        userId,
        paymentId: payment.id,
      },
    });

    return NextResponse.json({
      success: true,
      data: {
        order,
        payment,
      },
    });
  } catch (err: any) {
    console.error(err.response?.data || err);
    console.log(err);
    return fieldErrorResponse("root", "Order creation failed", 500);
  }
}

const DEFAULT_LIMIT = siteConfig.DEFAULT_LIMIT;

export async function GET(req: NextRequest) {
  try {
    const auth = await isAuthenticated(req);
    if (!auth.isSuccess) return auth.response;

    const user = await prisma.user.findUnique({
      where: {
        id: auth.data.id,
      },
    });
    if (!user) return fieldErrorResponse("root", "User not found", 404);

    const where: Prisma.OrderWhereInput = {};
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

    if (userId !== null) {
      if (user.id !== userId && user.role !== "ADMIN")
        return fieldErrorResponse(
          "root",
          "Cannot access other users orders",
          400
        );
      where.userId = user.id;
    }
    if (userId === null && user.role !== "ADMIN")
      return fieldErrorResponse(
        "root",
        "Cannot view all application orders",
        400
      );
    const total = await prisma.order.count({ where });
    const orders = await prisma.order.findMany({
      where: where,
      take,
      skip,
      include: {
        service: true,
        payment: true,
      },
    });

    return NextResponse.json({ success: true, data: { orders, total } });
  } catch {
    return fieldErrorResponse("root", "Internal server error", 500);
  }
}

import { NextRequest, NextResponse } from "next/server";
import prisma from "@/lib/prisma";
import isAuthenticated from "@/utils/isAuthenticated";
import fieldErrorResponse from "@/utils/fieldErrorResponse";
import validateData from "@/utils/validateDate";
import serviceOrderSchema from "@/lib/schemas/serviceOrderSchema";
import createNowPayment from "@/lib/payments/createNowPayment";

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
    const amount = (service.pricePerUnit * quantity) / 1000;
    const payment = await createNowPayment({ userId, amount });

    const { paymentId } = payment;
    console.log(payment);
    const order = await prisma.order.create({
      data: {
        serviceId: service.id,
        quantity,
        link,
        totalPrice: amount,
        userId,
        paymentId,
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

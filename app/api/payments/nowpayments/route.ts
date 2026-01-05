import { NextRequest, NextResponse } from "next/server";
import isAuthenticated from "@/utils/isAuthenticated";
import fieldErrorResponse from "@/utils/fieldErrorResponse";
import validateData from "@/utils/validateDate";
import nowPaymentSchema from "@/lib/schemas/nowPaymentSchema";
import createNowPayment from "@/lib/payments/createNowPayment";

export async function POST(req: NextRequest) {
  try {
    const auth = await isAuthenticated(req);
    if (!auth.isSuccess) return auth.response;
    const userId = auth.data.id;

    const validatedData = await validateData(req, nowPaymentSchema);
    if (!validatedData.isSuccess) return validatedData.response;
    const { amount } = validatedData.data;

    const payment = await createNowPayment({
      userId,
      amount,
    });
    return NextResponse.json({ success: true, data: payment });
  } catch (err: any) {
    console.error(err.response?.data || err);
    return fieldErrorResponse("root", "Payment creation failed", 500);
  }
}

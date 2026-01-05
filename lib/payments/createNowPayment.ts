import axios from "axios";
import prisma from "@/lib/prisma";
import serverEnv from "@/utils/serverEnv";
import { NowPaymentsApiPaymentResponse } from "@/types";

export default async function createNowPayment({
  userId,
  amount,
}: {
  userId: string;
  amount: number;
}) {
  const payment = await prisma.payment.create({
    data: {
      userId,
      provider: "CRYPTO",
      status: "PENDING",
      amountFiat: amount,
      currencyFiat: "USD",
      amountCrypto: amount,
      currencyCrypto: "USDT",
    },
  });

  const response = await axios.post<NowPaymentsApiPaymentResponse>(
    "https://api.nowpayments.io/v1/payment",
    {
      price_amount: amount,
      price_currency: "usd",
      pay_currency: "usdttrc20",
      order_id: payment.id,
      order_description: ` GGfollows offer`,
    },
    {
      headers: { "x-api-key": serverEnv.NOWPAYMENTS_API_KEY },
    }
  );

  const nowPayment = response.data;

  await prisma.payment.update({
    where: { id: payment.id },
    data: {
      providerRef: nowPayment.payment_id,
      cryptoAddress: nowPayment.pay_address,
    },
  });

  return {
    paymentId: payment.id,
    cryptoAddress: nowPayment.pay_address,
  };
}

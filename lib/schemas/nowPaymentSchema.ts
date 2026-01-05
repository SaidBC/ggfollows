import z from "zod";

const nowPaymentSchema = z.object({
  amount: z.number(),
});

export default nowPaymentSchema;

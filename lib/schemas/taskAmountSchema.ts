import z from "zod";

const taskAmountSchema = z.coerce
  .number()
  .int({ error: "Amount must be a integer" })
  .min(1, { error: "Amount is must be higher than 1" });

export default taskAmountSchema;

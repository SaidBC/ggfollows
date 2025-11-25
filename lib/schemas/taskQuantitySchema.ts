import z from "zod";

const taskQuantitySchema = z.coerce
  .number()
  .int({ error: "Quantity must be a integer" })
  .min(1, { error: "Quantity is must be higher than 1" });

export default taskQuantitySchema;

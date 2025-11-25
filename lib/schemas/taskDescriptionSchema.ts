import z from "zod";

const taskDescriptionSchema = z
  .string()
  .min(10, "Description too short")
  .optional()
  .or(z.literal(""));

export default taskDescriptionSchema;

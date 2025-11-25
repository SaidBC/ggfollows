import z from "zod";

const passwordSchema = z
  .string()
  .min(8, { error: "Password must be at least 8 length" });

export default passwordSchema;

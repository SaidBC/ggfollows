import z from "zod";

const generateTokenSchema = z.object({
  name: z.string(),
  expiredAt: z.optional(z.string()),
});

export default generateTokenSchema;

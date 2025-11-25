import z from "zod";

const checkTaskSchema = z.object({
  platformUsername: z
    .string()
    .min(1, { error: "Platform username must be at least 1 character" }),
});

export default checkTaskSchema;

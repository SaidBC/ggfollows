import z from "zod";

const checkTaskSchema = z.object({
  platformUsername: z.string(),
});

export default checkTaskSchema;

import z from "zod";

const updateUserSchema = z.object({
  role: z.enum(["USER", "ADMIN"]),
});

export default updateUserSchema;

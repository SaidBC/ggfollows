import z from "zod";

const createProjectSchema = z.object({
  name: z.string().min(6),
});

export default createProjectSchema;

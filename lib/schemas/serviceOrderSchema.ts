import z from "zod";

const serviceOrderSchema = z.object({
  quantity: z.number(),
  code: z.string(),
  link: z.url(),
});

export default serviceOrderSchema;

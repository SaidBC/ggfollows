import z from "zod";

const serviceOrderSchema = z.object({
  quantity: z.number(),
  type: z.enum(["follow", "like"]),
  link: z.url(),
});

export default serviceOrderSchema;

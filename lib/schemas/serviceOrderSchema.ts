import z from "zod";

const serviceOrderSchema = z.object({
  quantity: z.number(),
  code: z.string(),
  link: z.url(),
  acceptedTerms: z
    .boolean()
    .refine((val) => val === true, "You must accept the terms and conditions"),
});

export default serviceOrderSchema;

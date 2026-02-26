import z from "zod";
import emailSchema from "./emailSchema";
import passwordSchema from "./passwordSchema";

const loginSchema = z.object({
  email: emailSchema,
  password: passwordSchema,
  acceptedTerms: z
    .boolean()
    .refine((val) => val === true, "You must accept the terms and conditions"),
});

export default loginSchema;

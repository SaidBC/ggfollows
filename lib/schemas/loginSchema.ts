import z from "zod";
import emailSchema from "./emailSchema";
import passwordSchema from "./passwordSchema";

const loginSchema = z.object({
  email: emailSchema,
  password: passwordSchema,
});

export default loginSchema;

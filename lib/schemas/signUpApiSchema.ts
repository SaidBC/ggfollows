import z from "zod";
import emailSchema from "./emailSchema";
import passwordSchema from "./passwordSchema";

const signUpApiSchema = z.object({
  firstname: z.string(),
  lastname: z.string(),
  username: z.string(),
  email: emailSchema,
  password: passwordSchema,
});

export default signUpApiSchema;

import z from "zod";
import emailSchema from "./emailSchema";
import passwordSchema from "./passwordSchema";
import usernameSchema from "./usernameSchema";

const signUpApiSchema = z.object({
  firstname: z
    .string()
    .min(1, { error: "Firstname must be at least 1 character" }),
  lastname: z
    .string()
    .min(1, { error: "Firstname must be at least 1 character" }),
  username: usernameSchema,
  email: emailSchema,
  password: passwordSchema,
});

export default signUpApiSchema;

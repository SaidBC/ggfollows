import z from "zod";
import emailSchema from "./emailSchema";
import passwordSchema from "./passwordSchema";

const signUpSchema = z
  .object({
    firstname: z.string(),
    lastname: z.string(),
    username: z.string(),
    email: emailSchema,
    password: passwordSchema,
    confirm_password: z.string({
      error: "Confirm password is required",
    }),
  })
  .refine((inputs) => inputs.password === inputs.confirm_password, {
    message: "Confirm password do not match your password",
    path: ["confirm_password"],
  });

export default signUpSchema;

import z from "zod";
import emailSchema from "./emailSchema";
import passwordSchema from "./passwordSchema";
import usernameSchema from "./usernameSchema";
import firstnameSchema from "./firstnameSchema";
import lastnameSchema from "./lastnameSchema";

const signUpSchema = z
  .object({
    firstname: firstnameSchema,
    lastname: lastnameSchema,
    username: usernameSchema,
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

import z from "zod";
import firstnameSchema from "./firstnameSchema";
import lastnameSchema from "./lastnameSchema";
import usernameSchema from "./usernameSchema";

const onboardingSchema = z.object({
  firstname: firstnameSchema,
  lastname: lastnameSchema,
  username: usernameSchema,
});

export default onboardingSchema;

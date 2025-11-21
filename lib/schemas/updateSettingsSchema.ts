import z from "zod";
import usernameSchema from "./usernameSchema";

const updateSettingsSchema = z.object({
  username: z.optional(usernameSchema),
});

export default updateSettingsSchema;

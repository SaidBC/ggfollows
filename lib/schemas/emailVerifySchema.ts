import { z } from "zod";
import emailSchema from "./emailSchema";
import verificationCodeSchema from "./verificationCodeSchema";

const emailVerifySchema = z.object({
  code: verificationCodeSchema,
});

export default emailVerifySchema;

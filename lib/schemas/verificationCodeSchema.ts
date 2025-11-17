import { string, z } from "zod";

const verificationCodeSchema = z
  .string()
  .min(6, "Code must be 6 characters long");

export default verificationCodeSchema;

import z from "zod";

const emailSchema = z
  .string({ message: "Tbis field must be a string" })
  .email({ message: "Invalid email" });

export default emailSchema;

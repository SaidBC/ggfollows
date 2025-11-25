import z from "zod";

const allowMultiAccountsSchema = z
  .enum(["true", "false"], { error: "You must select Yes or No" })
  .or(z.boolean())
  .transform((val) => val == "true");

export default allowMultiAccountsSchema;

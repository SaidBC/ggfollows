import z from "zod";

const allowMultiAccountsSchema = z
  .enum(["true", "false"])
  .transform((val) => val === "true");

export default allowMultiAccountsSchema;

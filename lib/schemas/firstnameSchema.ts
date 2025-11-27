import z from "zod";

const firstnameSchema = z
  .string({})
  .min(1, { error: "Firstname must be at least 1 character" });

export default firstnameSchema;

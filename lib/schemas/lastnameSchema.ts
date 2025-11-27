import z from "zod";

const lastnameSchema = z
  .string({})
  .min(1, { error: "Lastname must be at least 1 character" });

export default lastnameSchema;

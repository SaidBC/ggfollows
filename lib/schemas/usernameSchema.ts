import z from "zod";

const usernameSchema = z
  .string()
  .min(3, { error: "Username must be at least 3 character" })
  .max(20, "Username is up to 20 character");

export default usernameSchema;

import z from "zod";

const taskTitleSchema = z
  .string()
  .min(3, { error: "Title is must be at least 3 character" });

export default taskTitleSchema;

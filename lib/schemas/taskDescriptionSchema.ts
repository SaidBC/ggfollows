import z from "zod";

const taskDescriptionSchema = z
  .string()
  .min(3, { error: "Description is too short" });

export default taskDescriptionSchema;

import z from "zod";

const adminPointsAdjustSchema = z.object({
  userId: z.string(),
  points: z.number(),
});

export default adminPointsAdjustSchema;

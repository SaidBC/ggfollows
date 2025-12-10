import z from "zod";

const platforms = ["FACEBOOK", "INSTAGRAM", "YOUTUBE", "X", "TIKTOK"] as const;

const taskPlatformSchema = z.enum(platforms, {
  error: "Task platform must be " + platforms.join(" OR "),
});

export default taskPlatformSchema;

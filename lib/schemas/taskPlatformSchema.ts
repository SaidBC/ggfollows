import z from "zod";

const platforms = ["FACEBOOK", "INSTAGRAM", "YOUTUBE", "X"] as const;

const taskPlatformSchema = z.enum(platforms);

export default taskPlatformSchema;

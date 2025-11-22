import z from "zod";

import taskPlatformSchema from "./taskPlatformSchema";
import taskTitleSchema from "./taskTitleSchema";
import taskDescriptionSchema from "./taskDescriptionSchema";
import taskQuantitySchema from "./taskQuantitySchema";
import taskAmountSchema from "./taskAmountSchema";
import taskLinkSchema from "./taskLinkSchema";

const createTaskSchema = z.object({
  title: z.optional(taskTitleSchema),
  description: z.optional(taskDescriptionSchema),
  platform: taskPlatformSchema,
  quantity: taskQuantitySchema,
  amount: taskAmountSchema,
  link: taskLinkSchema,
});

export default createTaskSchema;

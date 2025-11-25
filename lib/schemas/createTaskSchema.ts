import z from "zod";

import taskPlatformSchema from "./taskPlatformSchema";
import taskTitleSchema from "./taskTitleSchema";
import taskDescriptionSchema from "./taskDescriptionSchema";
import taskQuantitySchema from "./taskQuantitySchema";
import taskAmountSchema from "./taskAmountSchema";
import taskLinkSchema from "./taskLinkSchema";
import allowMultiAccountsSchema from "./allowMultiAccountsSchema";
import siteConfig from "../siteConfig";

const createTaskSchema = z
  .object({
    title: taskTitleSchema,
    description: z.optional(taskDescriptionSchema),
    platform: taskPlatformSchema,
    quantity: taskQuantitySchema,
    amount: taskAmountSchema,
    link: taskLinkSchema,
    allowMultiAccounts: allowMultiAccountsSchema,
  })
  .superRefine((data, ctx) => {
    const { hostname } = new URL(data.link);

    const allowedHosts = siteConfig.platforms[data.platform]?.hostnames ?? [];

    if (!allowedHosts.includes(hostname)) {
      ctx.addIssue({
        code: "custom",
        message: `Link must be from ${allowedHosts.join(", ")}`,
        path: ["link"],
      });
    }
  });

export default createTaskSchema;

import z from "zod";
import emailSchema from "./emailSchema";

const supportTicketSchema = z.object({
  email: emailSchema,
  subject: z.string().min(5, "Subject must be at least 5 characters").max(100, "Subject is too long"),
  message: z.string().min(10, "Message must be at least 10 characters").max(2000, "Message is too long"),
});

export default supportTicketSchema;

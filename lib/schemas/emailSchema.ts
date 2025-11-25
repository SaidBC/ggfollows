import z from "zod";

const emailSchema = z.email({ message: "Invalid email" });

export default emailSchema;

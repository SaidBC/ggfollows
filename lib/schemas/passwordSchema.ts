import z from "zod";

const passwordSchema = z.string().min(8);

export default passwordSchema;

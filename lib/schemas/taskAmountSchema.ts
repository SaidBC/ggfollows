import z from "zod";

const taskAmountSchema = z.coerce.number().int().min(1);

export default taskAmountSchema;

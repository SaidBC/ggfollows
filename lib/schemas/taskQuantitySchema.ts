import z from "zod";

const taskQuantitySchema = z.coerce.number().int().min(1);

export default taskQuantitySchema;

import z from "zod";

const allowMultiAccountsSchema = z.coerce.boolean();

export default allowMultiAccountsSchema;

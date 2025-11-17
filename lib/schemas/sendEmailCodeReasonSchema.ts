const reasons = ["EMAIL_VERIFICATION"] as const;

import { z } from "zod";
const sendEmailCodeReasonSchema = z.enum(reasons);

export default sendEmailCodeReasonSchema;

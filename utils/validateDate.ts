import { NextRequest, NextResponse } from "next/server";
import { z, ZodRawShape, ZodObject, flattenError } from "zod";

interface SuccessState<T> {
  isSuccess: true;
  data: T;
}

interface FailureState {
  isSuccess: false;
  response: NextResponse<{
    success: false;
    errors: ReturnType<typeof flattenError>;
  }>;
}
type TValidateData = <T extends ZodRawShape>(
  req: NextRequest,
  schema: ZodObject<T>
) => Promise<SuccessState<z.infer<ZodObject<T>>> | FailureState>;

const validateData: TValidateData = async function (req, schema) {
  const body = await req.json();
  const validatedData = schema.safeParse(body);

  if (!validatedData.success) {
    return {
      isSuccess: false,
      response: NextResponse.json(
        {
          success: false,
          errors: z.flattenError(validatedData.error),
        },
        { status: 400 }
      ),
    };
  }

  const { data } = validatedData;

  return {
    isSuccess: true,
    data,
  };
};

export default validateData;

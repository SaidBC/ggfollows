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
    errors: {
      [P in keyof z.core.$InferObjectOutput<any, {}>]?: {
        message: string;
      };
    };
  }>;
}
type TValidateData = <T extends ZodRawShape>(
  req: NextRequest,
  schema: ZodObject<T>
) => Promise<SuccessState<z.infer<ZodObject<T>>> | FailureState>;
function transform(obj: {
  [P in keyof z.core.$InferObjectOutput<any, {}>]?: string[] | undefined;
}) {
  const result: {
    [P in keyof z.core.$InferObjectOutput<any, {}>]?: {
      message: string;
    };
  } = {};

  for (const key in obj) {
    if (Array.isArray(obj[key]) && obj[key].length > 0) {
      result[key] = { message: obj[key][0] };
    }
  }

  return result;
}

const validateData: TValidateData = async function (req, schema) {
  const body = await req.json();
  const validatedData = schema.safeParse(body);

  if (!validatedData.success) {
    return {
      isSuccess: false,
      response: NextResponse.json(
        {
          success: false,
          errors: transform(z.flattenError(validatedData.error).fieldErrors),
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

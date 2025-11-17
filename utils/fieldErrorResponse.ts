import { NextResponse } from "next/server";

const fieldErrorResponse = function (
  field: string,
  message: string,
  status: number
) {
  return NextResponse.json(
    {
      success: false,
      errors: { [field]: { message } },
    },
    { status: status }
  );
};

export default fieldErrorResponse;

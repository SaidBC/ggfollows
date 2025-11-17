import { getToken, JWT } from "next-auth/jwt";
import { NextRequest, NextResponse } from "next/server";
import serverEnv from "./serverEnv";
import fieldErrorResponse from "./fieldErrorResponse";

interface SuccessState {
  isSuccess: true;
  data: JWT;
}

interface FailureState {
  isSuccess: false;
  response: ReturnType<typeof fieldErrorResponse>;
}

export default async function isAuthenticated(
  req: NextRequest
): Promise<SuccessState | FailureState> {
  const token = await getToken({ req, secret: serverEnv.NEXTAUTH_SECRET });
  if (!token) {
    return {
      isSuccess: false,
      response: fieldErrorResponse(
        "root",
        "Unauthenticated user please login first",
        401
      ),
    };
  }
  return {
    isSuccess: true,
    data: token,
  };
}

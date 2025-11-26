"use server";

import z from "zod";
import { FieldsErrorResponse, VerifyEmailCodeResponse } from "@/types";
import { isAxiosError } from "axios";
import apiAxios from "./apiAxios";
import { cookies } from "next/headers";
import emailVerifySchema from "./schemas/emailVerifySchema";

type FormAction<T extends z.ZodType> = (data: z.output<T>) => Promise<{
  success: boolean;
  field: "root";
  message: string;
}>;

const verifyEmailCodeAction: FormAction<typeof emailVerifySchema> =
  async function (data) {
    try {
      const cookieStore = await cookies();
      const response = await apiAxios.post<VerifyEmailCodeResponse>(
        "/verify-email-code",
        data,
        {
          headers: {
            Cookie: cookieStore.toString(),
          },
        }
      );
      if (!response.data.success)
        return {
          success: false,
          field: "root",
          message:
            response.data.errors.root?.message || "Unexpected error occures",
        };
      return { success: true, field: "root", message: "Done" };
    } catch (error) {
      if (isAxiosError<FieldsErrorResponse>(error)) {
        if (error.response)
          return {
            success: false,
            field: "root",
            message:
              error.response.data.errors.root?.message ||
              "Unexpected error occures",
          };
      }
      return {
        success: false,
        field: "root",
        message: "Unexpected error occurs",
      };
    }
  };

export { verifyEmailCodeAction };

"use server";

import z from "zod";
import createProjectSchema from "./schemas/createProjectSchema";
import {
  CreateProjectResponse,
  FieldsErrorResponse,
  VerifyEmailCodeResponse,
} from "@/types";
import { isAxiosError } from "axios";
import apiAxios from "./apiAxios";
import { cookies } from "next/headers";
import emailVerifySchema from "./schemas/emailVerifySchema";

type FormAction<T extends z.ZodType> = (data: z.output<T>) => Promise<{
  success: boolean;
  field: "root";
  message: string;
}>;

const createProjectAction: FormAction<typeof createProjectSchema> =
  async function (data) {
    try {
      const cookieStore = await cookies();
      const response = await apiAxios.post<CreateProjectResponse>(
        "/projects",
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
          message: response.data.errors.root,
        };
      return { success: true, field: "root", message: "Done" };
    } catch (error) {
      if (isAxiosError<FieldsErrorResponse>(error)) {
        if (error.response)
          return {
            success: false,
            field: "root",
            message: error.response.data.errors.root,
          };
      }
      return {
        success: false,
        field: "root",
        message: "Unexpected error occurs",
      };
    }
  };

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
          message: response.data.errors.root,
        };
      return { success: true, field: "root", message: "Done" };
    } catch (error) {
      if (isAxiosError<FieldsErrorResponse>(error)) {
        if (error.response)
          return {
            success: false,
            field: "root",
            message: error.response.data.errors.root,
          };
      }
      return {
        success: false,
        field: "root",
        message: "Unexpected error occurs",
      };
    }
  };

export { createProjectAction, verifyEmailCodeAction };

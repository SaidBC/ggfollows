import { Prisma, Project } from "@prisma/client";

interface ResponseSuccess<T> {
  success: true;
  data: T;
}

interface ResponseFailure<T> {
  success: false;
  errors: T;
}

export interface IErrors {
  [k: string]: string;
}

export type FieldsErrorResponse = ResponseFailure<IErrors>;

export type Merge<T, U> = Omit<T, keyof U> & U;
export type AuthResponse = ResponseSuccess<null> | FieldsErrorResponse;

export type CreateProjectResponse =
  | ResponseSuccess<Project>
  | FieldsErrorResponse;

export type GetProjectsResponse =
  | ResponseSuccess<Merge<Project, { createdAt: string }>[]>
  | FieldsErrorResponse;

export type GetProjectResponse =
  | ResponseSuccess<Merge<Project, { createdAt: string }>>
  | FieldsErrorResponse;

export type ProjectWhere = Prisma.ProjectWhereInput;

export type SendEmailCodeResponse =
  | ResponseSuccess<string>
  | FieldsErrorResponse;

export type VerifyEmailCodeResponse =
  | ResponseSuccess<string>
  | FieldsErrorResponse;

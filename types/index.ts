import { PointTransaction, Prisma, RewardCampaign, User } from "@prisma/client";

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

export type SendEmailCodeResponse =
  | ResponseSuccess<string>
  | FieldsErrorResponse;

export type VerifyEmailCodeResponse =
  | ResponseSuccess<string>
  | FieldsErrorResponse;

export type GetUserMeResponse = ResponseSuccess<User> | FieldsErrorResponse;
export type GetPointsBalanceResponse =
  | ResponseSuccess<{
      points: boolean;
      changes: {
        month: {
          change: string;
          currentTotal: number;
          previousTotal: number;
        };
      };
    }>
  | FieldsErrorResponse;

export type GetDailyRewardStatusResponse =
  | ResponseSuccess<{
      claimed: boolean;
      streak: number;
    }>
  | FieldsErrorResponse;

export type GetCampaignsResponse =
  | ResponseSuccess<RewardCampaign[]>
  | FieldsErrorResponse;

export type GetTransactionsResponse =
  | ResponseSuccess<PointTransaction[]>
  | FieldsErrorResponse;

export type ClaimDailyRewardResponse =
  | ResponseSuccess<{
      message: string;
      balance: number;
    }>
  | FieldsErrorResponse;

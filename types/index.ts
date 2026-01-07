import {
  Order,
  Payment,
  PlanType,
  PointTransaction,
  Prisma,
  RewardCampaign,
  Service,
  Task,
  TaskCompletion,
  User,
} from "@prisma/client";

interface ResponseSuccess<T> {
  success: true;
  data: T;
}

interface ResponseFailure<T> {
  success: false;
  errors: T;
}

export interface IErrors {
  [k: string]:
    | {
        message: string;
      }
    | undefined;
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
export type GetUsersResponse =
  | ResponseSuccess<{ users: User[]; total: number }>
  | FieldsErrorResponse;
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
      reward: number;
    }>
  | FieldsErrorResponse;

export type GetCampaignsResponse =
  | ResponseSuccess<RewardCampaign[]>
  | FieldsErrorResponse;

export type GetTransactionsResponse =
  | ResponseSuccess<{ transactions: PointTransaction[]; total: number }>
  | FieldsErrorResponse;

export type GetOrdersResponse =
  | ResponseSuccess<{
      orders: (Order & { service: Service } & { payment: Payment })[];
      total: number;
    }>
  | FieldsErrorResponse;

export type TasksWithCompletions = (Task & {
  creator: {
    username: string;
  };
  _count: { completions: number };
})[];

export type GetTasksResponse =
  | ResponseSuccess<{ tasks: TasksWithCompletions; total: number }>
  | FieldsErrorResponse;

export type ClaimDailyRewardResponse =
  | ResponseSuccess<{
      message: string;
      balance: number;
    }>
  | FieldsErrorResponse;

export type CreateTaskResponse =
  | ResponseSuccess<{
      transaction: PointTransaction;
      task: Task;
    }>
  | FieldsErrorResponse;

export type UpdateUserResponse = ResponseSuccess<User> | FieldsErrorResponse;

export type CheckTaskResponse =
  | ResponseSuccess<{
      transaction: PointTransaction;
      taskCompletion: TaskCompletion;
    }>
  | FieldsErrorResponse;

export type DeleteTaskResponse = ResponseSuccess<Task> | FieldsErrorResponse;

export type UpgradePlanResponse =
  | ResponseSuccess<{
      plan: PlanType;
      expiry: Date | null;
    }>
  | FieldsErrorResponse;

export type PaymentResponse =
  | ResponseSuccess<{
      paymentId: string;
      cryptoAddress: string;
    }>
  | FieldsErrorResponse;

export interface CreateOrderSuccessResponseData {
  order: Order;
  payment: Payment;
}

export type CreateOrderResponse =
  | ResponseSuccess<CreateOrderSuccessResponseData>
  | FieldsErrorResponse;

export type AdminPointsAdjustResponse =
  | ResponseSuccess<{
      transaction: PointTransaction;
      balance: number;
    }>
  | FieldsErrorResponse;

export interface NowPaymentsApiPaymentResponse {
  payment_id: string; // 5745459419
  payment_status:
    | "waiting"
    | "confirming"
    | "confirmed"
    | "sending"
    | "finished"
    | "failed"
    | "expired";

  pay_address: string; // crypto wallet address

  price_amount: number; // fiat amount (USD/EUR)
  price_currency: string; // "usd", "eur"

  pay_amount: number; // crypto amount
  pay_currency: string; // "btc", "usdttrc20", etc.

  order_id: string;
  order_description?: string;

  ipn_callback_url?: string | null;

  created_at: string; // ISO date
  updated_at: string; // ISO date

  purchase_id: number;

  amount_received?: number | null;

  payin_extra_id?: string | null;

  smart_contract?: string | null;

  network?: string | null; // "btc", "trx", "eth"
  network_precision?: number | null; // decimals

  time_limit?: number | null;
  burning_percent?: number | null;

  expiration_estimate_date?: string | null;
}

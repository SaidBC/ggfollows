/*
  Warnings:

  - The values [FOLLOW_ACTION,CREATE_CAMPAIGN] on the enum `TransactionSource` will be removed. If these variants are still used in the database, this will fail.

*/
-- AlterEnum
BEGIN;
CREATE TYPE "TransactionSource_new" AS ENUM ('SIGNUP_BONUS', 'DAILY_REWARD', 'TASK_ACTION', 'COMPLETE_TASK', 'PURCHASE', 'ADMIN_ADJUST', 'REFERRAL_BONUS');
ALTER TABLE "PointTransaction" ALTER COLUMN "source" TYPE "TransactionSource_new" USING ("source"::text::"TransactionSource_new");
ALTER TYPE "TransactionSource" RENAME TO "TransactionSource_old";
ALTER TYPE "TransactionSource_new" RENAME TO "TransactionSource";
DROP TYPE "public"."TransactionSource_old";
COMMIT;

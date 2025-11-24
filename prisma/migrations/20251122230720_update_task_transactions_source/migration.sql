/*
  Warnings:

  - The values [TASK_ACTION,COMPLETE_TASK] on the enum `TransactionSource` will be removed. If these variants are still used in the database, this will fail.
  - A unique constraint covering the columns `[taskCompletionId]` on the table `PointTransaction` will be added. If there are existing duplicate values, this will fail.

*/
-- CreateEnum
CREATE TYPE "TaskCompletionStatus" AS ENUM ('PENDING', 'VERIFIED', 'REJECTED');

-- AlterEnum
BEGIN;
CREATE TYPE "TransactionSource_new" AS ENUM ('CAMPAIGN', 'DAILY_REWARD', 'TASK_COMPLETION', 'PURCHASE', 'ADMIN_ADJUST', 'REFERRAL_BONUS');
ALTER TABLE "PointTransaction" ALTER COLUMN "source" TYPE "TransactionSource_new" USING ("source"::text::"TransactionSource_new");
ALTER TYPE "TransactionSource" RENAME TO "TransactionSource_old";
ALTER TYPE "TransactionSource_new" RENAME TO "TransactionSource";
DROP TYPE "public"."TransactionSource_old";
COMMIT;

-- AlterTable
ALTER TABLE "PointTransaction" ADD COLUMN     "taskCompletionId" TEXT;

-- AlterTable
ALTER TABLE "Task" ADD COLUMN     "allowsMultiAccount" BOOLEAN NOT NULL DEFAULT false;

-- CreateTable
CREATE TABLE "TaskCompletion" (
    "id" TEXT NOT NULL,
    "userId" TEXT NOT NULL,
    "taskId" TEXT NOT NULL,
    "completionProof" TEXT NOT NULL,
    "status" "TaskCompletionStatus" NOT NULL DEFAULT 'PENDING',
    "createdAt" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,

    CONSTRAINT "TaskCompletion_pkey" PRIMARY KEY ("id")
);

-- CreateIndex
CREATE UNIQUE INDEX "TaskCompletion_userId_taskId_completionProof_key" ON "TaskCompletion"("userId", "taskId", "completionProof");

-- CreateIndex
CREATE UNIQUE INDEX "PointTransaction_taskCompletionId_key" ON "PointTransaction"("taskCompletionId");

-- AddForeignKey
ALTER TABLE "PointTransaction" ADD CONSTRAINT "PointTransaction_taskCompletionId_fkey" FOREIGN KEY ("taskCompletionId") REFERENCES "TaskCompletion"("id") ON DELETE SET NULL ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "TaskCompletion" ADD CONSTRAINT "TaskCompletion_userId_fkey" FOREIGN KEY ("userId") REFERENCES "User"("id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "TaskCompletion" ADD CONSTRAINT "TaskCompletion_taskId_fkey" FOREIGN KEY ("taskId") REFERENCES "Task"("id") ON DELETE RESTRICT ON UPDATE CASCADE;

/*
  Warnings:

  - The values [SIGNUP_BONUS] on the enum `TransactionSource` will be removed. If these variants are still used in the database, this will fail.

*/
-- CreateEnum
CREATE TYPE "RewardType" AS ENUM ('POINTS');

-- AlterEnum
BEGIN;
CREATE TYPE "TransactionSource_new" AS ENUM ('CAMPAIGN', 'DAILY_REWARD', 'TASK_ACTION', 'COMPLETE_TASK', 'PURCHASE', 'ADMIN_ADJUST', 'REFERRAL_BONUS');
ALTER TABLE "PointTransaction" ALTER COLUMN "source" TYPE "TransactionSource_new" USING ("source"::text::"TransactionSource_new");
ALTER TYPE "TransactionSource" RENAME TO "TransactionSource_old";
ALTER TYPE "TransactionSource_new" RENAME TO "TransactionSource";
DROP TYPE "public"."TransactionSource_old";
COMMIT;

-- AlterTable
ALTER TABLE "PointTransaction" ADD COLUMN     "rewardCampaignId" TEXT;

-- CreateTable
CREATE TABLE "RewardCampaign" (
    "id" TEXT NOT NULL,
    "name" TEXT NOT NULL,
    "isActive" BOOLEAN NOT NULL DEFAULT true,
    "title" TEXT NOT NULL,
    "description" TEXT,
    "claimedCount" INTEGER NOT NULL DEFAULT 0,
    "maxLimit" INTEGER NOT NULL DEFAULT 1000,
    "rewardAmount" INTEGER NOT NULL,
    "rewardType" "RewardType" NOT NULL DEFAULT 'POINTS',
    "requiresNewUser" BOOLEAN NOT NULL DEFAULT false,
    "maxAccountAgeDays" INTEGER,
    "startDate" TIMESTAMP(3),
    "endDate" TIMESTAMP(3),
    "createdAt" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "updatedAt" TIMESTAMP(3) NOT NULL,

    CONSTRAINT "RewardCampaign_pkey" PRIMARY KEY ("id")
);

-- CreateIndex
CREATE UNIQUE INDEX "RewardCampaign_name_key" ON "RewardCampaign"("name");

-- AddForeignKey
ALTER TABLE "PointTransaction" ADD CONSTRAINT "PointTransaction_rewardCampaignId_fkey" FOREIGN KEY ("rewardCampaignId") REFERENCES "RewardCampaign"("id") ON DELETE SET NULL ON UPDATE CASCADE;

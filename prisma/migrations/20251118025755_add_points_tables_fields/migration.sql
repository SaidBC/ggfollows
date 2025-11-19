-- CreateEnum
CREATE TYPE "TransactionType" AS ENUM ('EARN', 'SPEND');

-- CreateEnum
CREATE TYPE "TransactionSource" AS ENUM ('SIGNUP_BONUS', 'DAILY_REWARD', 'FOLLOW_ACTION', 'COMPLETE_TASK', 'CREATE_CAMPAIGN', 'PURCHASE', 'ADMIN_ADJUST', 'REFERRAL_BONUS');

-- AlterTable
ALTER TABLE "User" ADD COLUMN     "points" INTEGER NOT NULL DEFAULT 0;

-- CreateTable
CREATE TABLE "PointTransaction" (
    "id" TEXT NOT NULL,
    "userId" TEXT NOT NULL,
    "amount" INTEGER NOT NULL,
    "type" "TransactionType" NOT NULL,
    "source" "TransactionSource" NOT NULL,
    "createdAt" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,

    CONSTRAINT "PointTransaction_pkey" PRIMARY KEY ("id")
);

-- AddForeignKey
ALTER TABLE "PointTransaction" ADD CONSTRAINT "PointTransaction_userId_fkey" FOREIGN KEY ("userId") REFERENCES "User"("id") ON DELETE CASCADE ON UPDATE CASCADE;

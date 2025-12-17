-- CreateEnum
CREATE TYPE "PlanType" AS ENUM ('FREE', 'PREMIUM', 'PRO');

-- AlterTable
ALTER TABLE "User" ADD COLUMN     "plan" "PlanType" NOT NULL DEFAULT 'FREE';

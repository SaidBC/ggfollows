-- AlterTable
ALTER TABLE "User" ADD COLUMN     "dailyTasksCreatedCount" INTEGER NOT NULL DEFAULT 0,
ADD COLUMN     "lastTaskCreatedAt" TIMESTAMP(3);

-- CreateEnum
CREATE TYPE "TaskPlatform" AS ENUM ('FACEBOOK', 'INSTAGRAM', 'YOUTUBE', 'X');

-- CreateTable
CREATE TABLE "Task" (
    "id" TEXT NOT NULL,
    "title" TEXT,
    "description" TEXT,
    "quantity" INTEGER NOT NULL,
    "amount" INTEGER NOT NULL,
    "platform" "TaskPlatform" NOT NULL,
    "userId" TEXT NOT NULL,
    "createdAt" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "updatedAt" TIMESTAMP(3) NOT NULL,

    CONSTRAINT "Task_pkey" PRIMARY KEY ("id")
);

-- AddForeignKey
ALTER TABLE "Task" ADD CONSTRAINT "Task_userId_fkey" FOREIGN KEY ("userId") REFERENCES "User"("id") ON DELETE RESTRICT ON UPDATE CASCADE;

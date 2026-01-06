/*
  Warnings:

  - A unique constraint covering the columns `[txHash]` on the table `Payment` will be added. If there are existing duplicate values, this will fail.

*/
-- AlterTable
ALTER TABLE "Payment" ADD COLUMN     "expirationEstimateDate" TIMESTAMP(3),
ADD COLUMN     "network" TEXT,
ADD COLUMN     "txHash" TEXT,
ADD COLUMN     "validUntil" TIMESTAMP(3);

-- CreateIndex
CREATE UNIQUE INDEX "Payment_txHash_key" ON "Payment"("txHash");

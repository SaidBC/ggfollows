import { User } from "@prisma/client";
import prisma from "./prisma";

export default async function checkPlanExpiry(
  user: Pick<User, "plan" | "currentPeriodEnd" | "id">
) {
  const now = new Date();
  if (["PRO", "PREMIUM"].includes(user.plan) && user.currentPeriodEnd) {
    const expiryDate = user.currentPeriodEnd;
    const isExpired = now > expiryDate;
    if (isExpired) {
      await prisma.user.update({
        where: {
          id: user.id,
        },
        data: {
          plan: "FREE",
          currentPeriodEnd: null,
        },
      });
    }
    return isExpired;
  }
  return false;
}

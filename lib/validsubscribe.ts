import { auth } from "@clerk/nextjs/server";
import prismadb from "@/lib/prismadb";

const DAY_IN_MILLISECONDS = 24 * 60 * 60 * 1000;

export const validSubscribe = async () => {
  const { userId } = auth();

  if (!userId) {
    return false;
  }

  const checkSubscription = await prismadb.userProSubscribe.findUnique({
    where: {
      userId,
    },
    select: {
      stripeCustomerId: true,
      stripeSubscribeId: true,
      stripeDurationTime: true,
      stripePriceValue: true,
    },
  });

  if (!checkSubscription) {
    return false;
  }

  const isValid =
    checkSubscription.stripePriceValue &&
    checkSubscription.stripeDurationTime?.getTime() + DAY_IN_MILLISECONDS >
      Date.now();

  return !!isValid;
};

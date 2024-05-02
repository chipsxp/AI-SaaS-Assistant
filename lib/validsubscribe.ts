import { auth } from "@clerk/nextjs";
import prismadb from "@/lib/prismadb";

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
    checkSubscription.stripeDurationTime.getTime() > Date.now();

  return !!isValid;
};

import { auth } from "@clerk/nextjs";
import prismadb from "@/lib/prismadb";

const MS_IN_DAY = 1000 * 60 * 60 * 24;

export const validSubscribe = async () => {
  const { userId } = auth();

  if (!userId) {
    return false;
  }

  const checkSubscription = await prismadb.userProSubsribe.findUnique({
    where: {
      buyerId: userId,
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
    checkSubscription.stripeDurationTime?.getTime() + MS_IN_DAY > Date.now();

  return !!isValid;
};

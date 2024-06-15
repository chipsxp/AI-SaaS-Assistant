import { auth } from "@clerk/nextjs/server";
import prismadb from "@/lib/prismadb";
import { MAX_FREE_TRIAL_COUNTS } from "@/constants";

export const addTrialCount = async () => {
  const { userId } = auth();
  if (!userId) {
    return;
  }

  const userTrialLimit = await prismadb.userApiLimit.findUnique({
    where: {
      userId,
    },
  });

  if (userTrialLimit) {
    await prismadb.userApiLimit.update({
      where: { userId: userId },
      data: { count: userTrialLimit.count + 1 },
    });
  } else {
    await prismadb.userApiLimit.create({
      data: { userId: userId, count: 1 },
    });
  }
};

export const checkTrialLimit = async () => {
  const { userId } = auth();
  if (!userId) {
    return false;
  }

  const checkTrialCount = await prismadb.userApiLimit.findUnique({
    where: {
      userId: userId,
    },
  });

  if (!checkTrialCount || checkTrialCount.count < MAX_FREE_TRIAL_COUNTS) {
    return true;
  } else {
    return false;
  }
};

export const getTrailCount = async () => {
  const { userId } = auth();

  if (!userId) {
    return 0;
  }

  const totalTrialCount = await prismadb.userApiLimit.findUnique({
    where: {
      userId,
    },
  });

  if (!totalTrialCount) {
    return 0;
  }
  return totalTrialCount.count;
};

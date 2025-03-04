import { auth } from "@clerk/nextjs/server";
import prismadb from "@/lib/prismadb";
import { MAX_FREE_TRIAL_COUNTS } from "@/constants";

export const addTrialCount = async () => {
  //if no user Identity, return nothing
  try {
    const { userId } = await auth();
    if (!userId) {
      return;
    }

    // userApiLimit model comes the global prisma/schema.prisma file
    // findUnique returns the first record that matches the where clause
    // if no record is found, it returns null

    const userTrialLimit = await prismadb.userApiLimit.findUnique({
      where: {
        userId,
      },
    });

    // if the userApiLimit record exists, update the count field by incrementing it by 1
    // if the userApiLimit record does not exist, create a new record with the userId and count field set to 1
    // 'update' and 'create' are async functions that return a Promise

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
  } catch (error) {
    console.error("Error in addTrialCount:", error);
  }
};

// checkTrialLimit function checks if the user has reached the maximum number of free trial generations
// it returns a boolean value indicating whether the user has reached the maximum number of free trial generations

export const checkTrialLimit = async () => {
  try {
    const { userId } = await auth();
    if (!userId) {
      return false;
    }

    // checkTrialCount function returns the first record that matches the where clause
    // if no record is found, it returns null

    const checkTrialCount = await prismadb.userApiLimit.findUnique({
      where: {
        userId: userId,
      },
    });

    // if the userApiLimit record exists and the count is less than the maximum number of free trial generations,
    // return true

    const hasAvailableTrials = !checkTrialCount || checkTrialCount.count < MAX_FREE_TRIAL_COUNTS;
    return hasAvailableTrials;
  } catch (error) {
    console.error("Error in checkTrialLimit:", error);
    // Default to allowing access if there's an error checking the limit
    return true;
  }
};

// getTrailCount function returns the count field of the userApiLimit record for the given userId
// if the userApiLimit record does not exist, it returns 0

export const getTrailCount = async () => {
  try {
    const { userId } = await auth();

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
  } catch (error) {
    console.error("Error in getTrailCount:", error);
    return 0;
  }
};

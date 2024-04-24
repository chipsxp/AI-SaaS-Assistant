import { auth } from "@clerk/nextjs";
import prismadb from "@/lib/prismadb";

const MS_IN_DAY = 86_400_000;

export const validSubscribe = async () => {
    const { userId } = auth();
    if (!userId) {
        return false;
    }

    const subscription = await prismadb.userProSubsribe.findUnique({
        where: {
            userID: userId
        },
        select: {
            stripeCustomerId: true,
            stripeSubscribeId: true,
            stripeDurationTime: true,
            stripePriceValue: true
        },
    });

    if (!subscription) {
        return false;
    }

    const isValid=subscription.stripePriceValue && subscription.stripeDurationTime?.getTime()!+MS_IN_DAY > Date.now();

    return !!isValid;
}
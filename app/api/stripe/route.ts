import { auth, currentUser } from "@clerk/nextjs";
import { NextResponse } from "next/server";
import prismadb from "@/lib/prismadb";
import { stripe } from "@/lib/stripe";
import { mainappUrl } from "@/lib/utils";

const mainappSettings = mainappUrl('/settings');

export async function GET(){
    try{
    const { userId } = auth();
    const user = await currentUser();

    if (!userId || !user) {
        return new NextResponse('Unauthorized', { status: 401 });
    }

    const subscription = await prismadb.userProSubsribe.findUnique({
        where: {
            userID: userId
        }
    });

    if (subscription && subscription.stripeCustomerId) {
        const customer = await stripe.billingPortal.sessions.create({
            customer: subscription.stripeCustomerId,
            return_url: mainappSettings
        });

        return new NextResponse(JSON.stringify({ url: customer.url }), { status: 200 });
    }

    const stripeSession = await stripe.checkout.sessions.create({
        success_url: mainappSettings,
        cancel_url: mainappSettings,
        payment_method_types: ['card'],
        mode: 'subscription',
        billing_address_collection: 'auto',
        customer_email: user.emailAddresses[0].emailAddress,
        line_items: [
            {
                price_data: {
                    currency: 'USD',
                    product_data: {
                        name: 'AI Assistant Pro Subscription',
                        description: 'AI Assistant Pro Monthly Subscription',
                    },
                    unit_amount: 1000,
                    recurring: {
                        interval: 'month',
                    }
                },
                quantity: 1
            }
        ],
        metadata: {
            userId
        }
    })

}catch (error) {
    console.log('[STRIPE_ERROR]', error);
    return new NextResponse('Internal Server Error', { status: 500 });
    }
}
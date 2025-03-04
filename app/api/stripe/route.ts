import { auth, currentUser } from "@clerk/nextjs/server";
import { NextResponse } from "next/server";
import prismadb from "@/lib/prismadb";
import { stripe } from "@/lib/stripe";
import { mainappUrl } from "@/lib/utils";

const mainappSettings = mainappUrl("/settings");

export async function GET() {
  try {
    const { userId } = await auth();
    const user = await currentUser();

    if (!userId || !user) {
      return new NextResponse("Unauthorized", { status: 401 });
    }

    const subscription = await prismadb.userProSubscribe.findUnique({
      where: {
        userId,
      },
    });

    if (subscription && subscription.stripeCustomerId) {
      const customerSession = await stripe.billingPortal.sessions.create({
        customer: subscription.stripeCustomerId,
        return_url: mainappSettings,
      });

      return new NextResponse(JSON.stringify({ url: customerSession.url }), {
        status: 200,
      });
    }

    const customerSession = await stripe.checkout.sessions.create({
      success_url: mainappSettings,
      cancel_url: mainappSettings,
      payment_method_types: ["card", "paypal", "cashapp"],
      mode: "subscription",
      billing_address_collection: "auto",
      customer_email: user.emailAddresses[0].emailAddress,
      line_items: [
        {
          price_data: {
            currency: "USD",
            product_data: {
              name: "AI Assistant Pro Subscription",
              description: "AI Assistant Pro Monthly Subscription",
            },
            unit_amount: 1000,
            recurring: {
              interval: "month",
            },
          },
          quantity: 1,
        },
      ],
      metadata: {
        userId,
      },
    });

    // return stripe session url to webhook
    return new NextResponse(JSON.stringify({ url: customerSession.url }), {
      status: 200,
    });
  } catch (error) {
    console.log("[STRIPE_ERROR]", error);
    return new NextResponse("Internal Server Error", { status: 500 });
  }
}

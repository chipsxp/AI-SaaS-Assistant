import { headers } from "next/headers";
import Stripe from "stripe";

import prismadb from "@/lib/prismadb";
import { stripe } from "@/lib/stripe";
import { NextResponse } from "next/server";

export async function POST(req: Request) {
  const body = await req.text();
  const signature = headers().get("Stripe-Signature") as string;

  let event: Stripe.Event;

  try {
    event = stripe.webhooks.constructEvent(
      body,
      signature,
      process.env.STRIPE_WEBHOOK_SECRET || ""
    );
  } catch (err: any) {
    return new NextResponse(`Webhook Error: ${err.message}`, {
      status: 400,
    });
  }
  const session = event.data.object as Stripe.Checkout.Session;
  if (event.type === "checkout.session.completed") {
    const subscription = await stripe.subscriptions.retrieve(
      session.subscription as string
    );
    if (!session?.metadata?.userId) {
      return new NextResponse("User ID is required for subscription.", {
        status: 400,
      });
    }
    await prismadb.userProSubscribe.create({
      data: {
        userId: session?.metadata?.userId,
        stripeCustomerId: subscription.customer as string,
        stripeSubscribeId: subscription.id,
        stripePriceValue: subscription.items.data[0].price.id,
        stripeDurationTime: new Date(subscription.current_period_end * 1000),
      },
    });
  }

  if (event.type === "invoice.payment_succeeded") {
    const subscription = await stripe.subscriptions.retrieve(
      session.subscription as string
    );
    await prismadb.userProSubscribe.update({
      where: {
        stripeSubscribeId: subscription.id,
      },
      data: {
        stripeDurationTime: new Date(subscription.current_period_end * 1000),
        stripePriceValue: subscription.items.data[0].price.id,
      },
    });
  }
  return new NextResponse(null, { status: 200 });
}

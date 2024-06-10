import OpenAI from "openai";
import { auth } from "@clerk/nextjs/server";
import { NextResponse } from "next/server";
import { addTrialCount, checkTrialLimit } from "@/lib/trialcounts";
import { validSubscribe } from "@/lib/validsubscribe";

const openai = new OpenAI({
  apiKey: process.env.OPENAI_API_KEY, // This is also the default, can be omitted
});

export async function POST(req: Request) {
  try {
    const { userId } = auth();
    const body = await req.json();
    const { prompt, amount = 1, resolution = "256x256" } = body;

    if (!userId) {
      return new NextResponse("Unauthorized", { status: 401 });
    }

    if (!openai.apiKey) {
      return new NextResponse("OpenAI API key not configured", { status: 500 });
    }

    if (!prompt) {
      return new NextResponse("prompt is required", { status: 400 });
    }

    if (!amount) {
      return new NextResponse("amount is required", { status: 400 });
    }

    if (!prompt) {
      return new NextResponse("resolution is required", { status: 400 });
    }

    const freeTrail = await checkTrialLimit();
    const isPro = await validSubscribe();
    if (!freeTrail && !isPro) {
      return new NextResponse("Trial limit reached", { status: 403 });
    }

    const imageCompletion = await openai.images.generate({
      prompt,
      n: parseInt(amount, 10),
      size: resolution,
    });

    if (!isPro) {
      await addTrialCount();
    }

    return NextResponse.json(imageCompletion.data[0].url);
  } catch (error) {
    console.log(error, ["IMAGE ERROR"]);
    return new NextResponse("Internal Error", { status: 500 });
  }
}

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
    const { userId } = await auth();
    const body = await req.json();
    const { messages } = body;

    if (!userId) {
      return new NextResponse("Unauthorized", { status: 401 });
    }

    if (!openai.apiKey) {
      return new NextResponse("OpenAI API key not configured", { status: 500 });
    }

    if (!messages) {
      return new NextResponse("No messages provided", { status: 400 });
    }

    const freeTrail = await checkTrialLimit();
    const isPro = await validSubscribe();
    
    if (!freeTrail && !isPro) {
      return new NextResponse("Trial limit reached", { status: 403 });
    }

    const chatCompletion = await openai.chat.completions.create({
      model: "gpt-4o",
      messages: messages,
    });

    if (!isPro) {
      await addTrialCount();
    }

    return NextResponse.json(chatCompletion.choices[0].message);
  } catch (error) {
    console.error("CONVERSATION ERROR:", error);
    return new NextResponse("Internal Error", { status: 500 });
  }
}

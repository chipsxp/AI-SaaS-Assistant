import OpenAI from "openai";
import { auth } from "@clerk/nextjs";
import { NextResponse } from "next/server";
import { addTrialCount, checkTrialLimit } from "@/lib/trialcounts";

const openai = new OpenAI({
  apiKey: process.env.OPENAI_API_KEY, // This is also the default, can be omitted
});

export async function POST(req: Request) {
  try {
    const { userId } = auth();
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
    if (!freeTrail) {
      return new NextResponse("Trial limit reached", { status: 403 });
    }

    const chatCompletion = await openai.chat.completions.create({
      model: "gpt-3.5-turbo",
      messages,
    });

    await addTrialCount();

    return NextResponse.json(chatCompletion.choices[0].message);
  } catch (error) {
    console.log(error, ["CONVERSATION ERROR"]);
    return new NextResponse("Internal Error", { status: 500 });
  }
}

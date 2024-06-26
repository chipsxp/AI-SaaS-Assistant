import { auth } from "@clerk/nextjs/server";
import { NextResponse } from "next/server";
import Replicate from "replicate";
import { addTrialCount, checkTrialLimit } from "@/lib/trialcounts";
import { validSubscribe } from "@/lib/validsubscribe";

const replicate = new Replicate({
  auth: process.env.REPLICATE_API_TOKEN,
});
export async function POST(req: Request) {
  try {
    const { userId } = auth();
    const body = await req.json();
    const { prompt } = body;

    if (!userId) {
      return new NextResponse("Unauthorized", { status: 401 });
    }

    if (!prompt) {
      return new NextResponse("Some description is required", { status: 400 });
    }

    const freeTrail = await checkTrialLimit();
    const isPro = await validSubscribe();
    if (!freeTrail && !isPro) {
      return new NextResponse("Trial limit reached", { status: 403 });
    }

    const musicCompletion = await replicate.run(
      "riffusion/riffusion:8cf61ea6c56afd61d8f5b9ffd14d7c216c0a93844ce2d82ac1c9ecc9c7f24e05",
      {
        input: { prompt_a: prompt },
      }
    );

    if (!isPro) {
      await addTrialCount();
    }

    return NextResponse.json(musicCompletion);
  } catch (error) {
    console.log(error, ["MUSIC SOUND ERROR"]);
    return new NextResponse("Internal Error", { status: 500 });
  }
}

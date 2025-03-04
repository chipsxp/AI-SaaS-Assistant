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
    const { userId } = await auth();
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

    const prediction = await replicate.predictions.create({
      version: "8c47da666861d081eeb4d1261853087de23923a268a69b63febdf5dc1dee08e4",
      input: {
        prompt: prompt,
        negative_prompt: "low quality, worst quality, deformed, distorted, watermark",
        aspect_ratio: "16:9"
      },
    });

    console.log("Initial prediction:", prediction);

    let finalPrediction = await replicate.wait(prediction);
    console.log("Final prediction:", finalPrediction);

    if (!finalPrediction.output || !Array.isArray(finalPrediction.output)) {
      console.log("Invalid prediction output:", finalPrediction);
      return new NextResponse("Invalid response from video generation", { status: 500 });
    }

    if (finalPrediction.output.length === 0) {
      console.log("Empty prediction output array");
      return new NextResponse("No video generated", { status: 500 });
    }

    const videoUrl = finalPrediction.output[0];
    console.log("Video URL:", videoUrl);

    if (!isPro) {
      await addTrialCount();
    }

    return NextResponse.json(videoUrl);
  } catch (error) {
    console.log(error, ["MOTION VIDEO ERROR"]);
    return new NextResponse("Internal Error", { status: 500 });
  }
}

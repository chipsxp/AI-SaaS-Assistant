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

    console.log('Creating prediction for prompt:', prompt);
    
    // Create a prediction
    const prediction = await replicate.predictions.create({
      version:
        "8cf61ea6c56afd61d8f5b9ffd14d7c216c0a93844ce2d82ac1c9ecc9c7f24e05",
      input: {
        prompt_a: prompt,
        alpha: 0.5,
        denoising: 0.75,
        seed_image_id: "vibes",
        num_inference_steps: 50,
      },
    });

    console.log('Prediction created:', prediction);

    if (!isPro) {
      await addTrialCount();
    }

    // Poll for the prediction result
    let result = await replicate.predictions.get(prediction.id);
    console.log('Initial status:', result.status);

    let currentStatus = '';
    // Wait for completion
    while (result.status === 'starting' || result.status === 'processing') {
      // Update status message based on current state
      const newStatus = result.status === 'starting' 
        ? 'Initializing audio generation...' 
        : 'Generating your audio (this may take up to 2 minutes)...';
      
      if (newStatus !== currentStatus) {
        console.log(newStatus);
        currentStatus = newStatus;
      }

      await new Promise(resolve => setTimeout(resolve, 1000));
      result = await replicate.predictions.get(prediction.id);
    }

    if (result.status === 'failed') {
      throw new Error('Audio generation failed');
    }

    if (result.status !== 'succeeded') {
      throw new Error(`Unexpected status: ${result.status}`);
    }

    if (!result.output || typeof result.output.audio !== 'string') {
      console.error('Invalid output:', result.output);
      throw new Error('Invalid audio in prediction output');
    }

    return NextResponse.json({
      audio: result.output.audio,
      spectrogram: result.output.spectrogram || ''
    });
  } catch (error) {
    // Enhanced error logging
    console.error("Music generation error:", {
      error: error instanceof Error ? error.message : error,
      stack: error instanceof Error ? error.stack : undefined,
      type: typeof error,
    });
    return new NextResponse("Internal Error", { status: 500 });
  }
}

import { auth } from "@clerk/nextjs";
import { NextResponse } from "next/server";
import Replicate from "replicate";
import { addTrialCount, checkTrialLimit } from "@/lib/trialcounts";

const replicate = new Replicate({
    auth: process.env.REPLICATE_API_TOKEN,
});
export async function POST(
    req: Request 
    ) {
        try { 
            const { userId }= auth();
            const body = await req.json();
            const { prompt } = body;

            if (!userId) {
                return new NextResponse('Unauthorized', { status: 401 });
            }       

            if (!prompt) {
                return new NextResponse('Some description is required', { status: 400 });
            }

            const freeTrail = await checkTrialLimit();
            if (!freeTrail) {
                return new NextResponse('Trial limit reached', { status: 403 });
            }

            const response = await replicate.run(
  "anotherjesse/zeroscope-v2-xl:9f747673945c62801b13b84701c783929c0ee784e4748ec062204894dda1a351",
        {
            input: {
            prompt: prompt,
            num_frames: 60,
            fps: 15,
            }
        }
        );

            await addTrialCount();
            return NextResponse.json(response);

        } catch (error) {
            console.log(error, ['MOTION VIDEO ERROR']);
            return new NextResponse('Internal Error', { status: 500 });
        }
    }
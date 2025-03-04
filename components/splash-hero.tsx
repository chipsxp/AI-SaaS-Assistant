"use client";
import { useAuth } from "@clerk/nextjs";
import { Button } from "@/components/ui/button";
import TypewriterComponent from "typewriter-effect";
import Link from "next/link";

export const SplashHero = () => {
  const { isSignedIn } = useAuth();
  return (
    <div className="text-white font-bold py-10 text-center space-y-8 container mx-auto mb-8">
      <div className="text-3xl sm:text-4xl md:text-5xl font-extrabold space-y-6">
        <div
          className="
        text-transparent 
        py-2
        bg-clip-text 
        bg-gradient-to-r from-pink-500 to-violet-500
        "
        >
          <TypewriterComponent
            options={{
              strings: [
                "Chat with your AI Office Assistant",
                "Generate images from your text",
                "Generate videos from your text",
                "Generate music from your text",
                "Generate code from your text",
                "Tech Support Chat in AI Office PDA",
              ],
              autoStart: true,
              loop: true,
            }}
          />
        </div>
        <h3>Embrace the Best AI Personal Data Assistant</h3>
        <div className="text-xl text-zinc-200">
          Office Video, Image Production, Music Making, Coding Development, and
          Support Chat.
        </div>

        <div className="text-sm md:text-xl font-medium text-zinc-400">
          Create content for the office using AI PDA
        </div>
      </div>
      <div className="mt-8">
        <Link href={isSignedIn ? "/dashboard" : "/sign-in"}>
          <Button
            className="rounded-full bg-gradient-to-r from-indigo-500 via-purple-500 to-pink-500 text-white hover:opacity-90 font-semibold px-8 py-4 text-lg md:text-xl"
          >
            Start Generating For Free
          </Button>
        </Link>
      </div>
      <div className="text-sm md:text-xl font-medium text-zinc-400 mt-4">
        Credit Card Not Required until Purchase Subscription
      </div>
    </div>
  );
};

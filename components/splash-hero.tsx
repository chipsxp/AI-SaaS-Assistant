"use client";
import { useAuth } from "@clerk/nextjs";
import { Button } from "@/components/ui/button";
import TypewriterComponent from "typewriter-effect";
import Link from "next/link";

export const SplashHero = () => {
  const { isSignedIn } = useAuth();
  return (
    <div className="text-white font-bold py-8 text-center space-y-5">
      <div className="text-3xl sm:text-4xl md:text-5xl font-extrabold space-y-5">
        <div
          className="
        text-transparent 
        py-6
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
        <div>
          <Link href={isSignedIn ? "/dashboard" : "/sign-in"}>
            <Button
              variant="premium"
              className="md:text-lg p-4 md:p-6 rounded-full font-semibold"
            >
              Start Generating For Free
            </Button>
          </Link>
        </div>
      </div>
      <div className="text-sm md:text-xl font-medium text-zinc-400">
        Credit Card Not Required until Purchase Subscription
      </div>
    </div>
  );
};

"use client";
import { useAuth } from "@clerk/nextjs";
import { Button } from "@/components/ui/button";
import Link from "next/link";

export const SplashHero = () => {
  const { isSignedIn } = useAuth();
  return (
    <div className="text-white font-bold py-36 text-center space-y-5">
      <div className="text-3xl sm:text-4xl md:text-5xl font-extrabold space-y-5">
        <h3>Embrace the Best AI Personal Data Assistant</h3>
        <div className="text-xl text-zinc-200">
          Office Video and Image Production, Music Making, Coding Development,
          and Support Chat in all on one app.
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
    </div>
  );
};

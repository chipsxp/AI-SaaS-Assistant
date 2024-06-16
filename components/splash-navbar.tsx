"use client";
import { Montserrat } from "next/font/google";
import Link from "next/link";
import Image from "next/image";
import { cn } from "@/lib/utils";
import { Button } from "@/components/ui/button";
import { useAuth } from "@clerk/nextjs";

const montserrat = Montserrat({
  subsets: ["latin"],
  weight: ["400", "500", "600", "700"],
});

export const SplashNavbar = () => {
  const { isSignedIn } = useAuth();
  return (
    <nav className="flex flex-col bg-transparent p-4 items-center justify-between">
      <Link href="/" className="flex items-center">
        <div className="relative m-4 p-4 flex-row w-16 h-16 mr-8">
          <Image
            fill
            src="/logo.png"
            alt="check thumbs up"
            className="w-14 h-14 object-contain"
          />
        </div>
        <h2
          className={cn(
            montserrat.className,
            "font-bold flex-row text-3xl text-zinc-200"
          )}
        >
          Presenting The Personal AI Office Data Assistant
        </h2>
      </Link>
      <div className="flex flex-1 mt-4 pt-4 items-center">
        <Link href={isSignedIn ? "/dashboard" : "/sign-in"}>
          <Button variant="outline" className="rounded-full">
            Get Started
          </Button>
        </Link>
      </div>
    </nav>
  );
};

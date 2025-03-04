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
    <nav className="p-4 bg-transparent">
      <div className="max-w-7xl mx-auto flex items-center justify-between">
          <Link href="/" className="flex items-center gap-2">
            <div className="relative w-8 h-8 sm:w-10 sm:h-10">
              <Image
                src="/logo.png"
                alt="Logo"
                width={32}
                height={32}
                className="object-contain"
              />
            </div>
            <h2
              className={cn(
                montserrat.className,
                "font-semibold text-2xl md:text-blue-300xl text-zinc-200 hidden sm:inline"
              )}
            >
              AI Office Assistant
            </h2>
          </Link>
        </div>
      <div className="flex items-center mt-4 pt-2">
        <Link href={isSignedIn ? "/dashboard" : "/sign-in"}>
          <Button 
            className="rounded-full bg-gradient-to-r from-indigo-500 via-purple-500 to-pink-500 text-white hover:opacity-90 font-semibold px-8 py-4 text-lg md:text-xl"
          >
            Get Started
          </Button>
        </Link>
      </div>
    </nav>
  );
};

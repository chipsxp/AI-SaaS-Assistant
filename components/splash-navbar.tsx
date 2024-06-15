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
      <Link href="/" className="flex items-center pl-3">
        <div className="relative w-10 h-10 mr-4">
          <Image
            fill
            src="/logo.png"
            alt="logo"
            width={50}
            height={50}
            className="w-8 h-8 rounded-full"
          />
        </div>
        <h3
          className={cn(montserrat.className, "font-bold text-2xl text-white")}
        >
          AI Assistant
        </h3>
      </Link>
      <Button
        variant="outline"
        className="w-full"
        onClick={() => {
          if (isSignedIn) {
            return;
          }
          window.location.href = "/sign-in";
        }}
      >
        Sign out
      </Button>
    </nav>
  );
};

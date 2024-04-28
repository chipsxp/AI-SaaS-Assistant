"use client";

import { cn } from "@/lib/utils";
import Image from "next/image";
import Link from "next/link";
import { TrialCounter } from "./trial-counter";
import { Montserrat } from "next/font/google";
import {
  CodeIcon,
  ImageIcon,
  LayoutDashboard,
  MessageSquare,
  Music,
  Settings,
  VideoIcon,
} from "lucide-react";
import { usePathname } from "next/navigation";
const montserrat = Montserrat({
  subsets: ["latin"],
  weight: ["400", "500", "600", "700"],
});

const routes = [
  {
    label: "Dashboard",
    icon: LayoutDashboard,
    href: "/dashboard",
    color: "text-sky-500",
  },
  {
    label: "Conversation",
    icon: MessageSquare,
    href: "/conversation",
    color: "text-violet-500",
  },
  {
    label: "Image Generation",
    icon: ImageIcon,
    href: "/image-generator",
    color: "text-pink-500",
  },
  {
    label: "Video Generation",
    icon: VideoIcon,
    href: "/video-generator",
    color: "text-orange-500",
  },
  {
    label: "Music Generation",
    icon: Music,
    href: "/music-generator",
    color: "text-emerald-500",
  },
  {
    label: "Code Generation",
    icon: CodeIcon,
    href: "/code-generator",
    color: "text-sky-500",
  },
  {
    label: "Settings",
    icon: Settings,
    href: "/settings",
    color: "text-yellow-400",
  },
];

interface SidebarProps {
  apiLimitCount: number;
}

export const SideBar = ({ apiLimitCount = 0 }: { apiLimitCount: number }) => {
  const highLighter = usePathname();

  return (
    <div className="space-y-4 py-4 flex flex-col h-full bg-[#111827] text-white">
      <div className="flex-1 px-3 py-2">
        <Link href="/" className="flex items-center pl-3 mb-14">
          <div className="relative w-10 h-10 mr-4">
            <Image fill alt="logo" src="/logo.png" />
          </div>
          <h3 className={cn(montserrat.className, "font-bold text-2xl")}>
            AI PDA Control
          </h3>
        </Link>
        <div className="space-y-1">
          {routes.map((route) => (
            <Link
              key={route.label}
              href={route.href}
              className={cn(
                "text-sm group flex p-3 w-full justify-start font-medium cursor-pointer  hover:text-sky-500 hover:bg-white/10 rounded-lg transition-colors",
                highLighter === route.href
                  ? "text-white bg-white/10"
                  : "text-zinc-400"
              )}
            >
              <div className="flex items-center flex-1">
                <route.icon className={cn("h-5 w-5 mr-5", route.color)} />
                {route.label}
              </div>
            </Link>
          ))}
        </div>
      </div>
      <TrialCounter apiLimitCount={apiLimitCount} />
    </div>
  );
};

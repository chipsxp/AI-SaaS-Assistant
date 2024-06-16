"use client";

import { Button } from "@/components/ui/button";
import { Menu } from "lucide-react";
import { Sheet, SheetContent, SheetTrigger } from "@/components/ui/sheet";
import { SideBar } from "@/components/sidebar";
import { useEffect, useState } from "react";

interface MobileSideBarProps {
  apiLimitCount: number;
  isPro: boolean;
}

const MobileSideBar = ({
  apiLimitCount = 0,
  isPro = false,
}: MobileSideBarProps) => {
  const [isMounted, setIsMounted] = useState(false);

  useEffect(() => {
    setIsMounted(true);
  }, []);

  if (!isMounted) return null;

  return (
    <Sheet>
      <SheetTrigger asChild>
        <Button variant={"ghost"} size={"icon"} className="md:hidden">
          <Menu className="w-10 h-10 bg-zinc-50" />
        </Button>
      </SheetTrigger>
      <SheetContent side={"left"} className="p-2">
        <SideBar isPro={isPro} apiLimitCount={apiLimitCount} />
      </SheetContent>
    </Sheet>
  );
};

export default MobileSideBar;

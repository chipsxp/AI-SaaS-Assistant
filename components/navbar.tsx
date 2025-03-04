// components/navbar.tsx

import { UserButton } from "@clerk/nextjs";
import MobileSideBar from "@/components/mobile-sidebar";
import { getTrailCount } from "@/lib/trialcounts";
import { validSubscribe } from "@/lib/validsubscribe";

const Navbar = async () => {
  const trialLimitCount = await getTrailCount();
  const isPro = await validSubscribe();
  return (
    <div className="flex items-center">
      <MobileSideBar isPro={isPro} apiLimitCount={trialLimitCount} />
      <div className="flex w-full justify-end mr-2 mt-2">
        <h1 className="text-lg text-black px-2">PDA User</h1>
        <UserButton />
      </div>
    </div>
  );
};

export default Navbar;

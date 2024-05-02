// components/navbar.tsx

import { UserButton } from "@clerk/nextjs";
import MobileSideBar from "@/components/mobile-sidebar";
import { getTrailCount } from "@/lib/trialcounts";

const Navbar = async () => {
  const trialLimitCount = await getTrailCount();
  return (
    <div className="flex items-center">
      <MobileSideBar apiLimitCount={trialLimitCount} />
      <div className="flex w-full justify-end">
        <h1 className="text-lg text-black">AI PDA User</h1>
        <UserButton afterSignOutUrl="/" />
      </div>
    </div>
  );
};

export default Navbar;

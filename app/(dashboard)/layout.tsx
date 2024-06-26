import Navbar from "@/components/navbar";
import { SideBar } from "@/components/sidebar";
import { getTrailCount } from "@/lib/trialcounts";
import { validSubscribe } from "@/lib/validsubscribe";

const DashboardLayout = async ({ children }: { children: React.ReactNode }) => {
  const apiLimitCount = await getTrailCount();
  const isPro = await validSubscribe();
  return (
    <div className="h-full relative">
      <div className="hidden h-full md:w-72 md:flex md:flex-col md:fixed md:inset-y-0 z-[80] bg-gray-900">
        <SideBar isPro={isPro} apiLimitCount={apiLimitCount} />
      </div>
      <main className="md:pl-72 pb-10">
        <Navbar />
        {children}
      </main>
    </div>
  );
};

export default DashboardLayout;

// components/navbar.tsx
import { UserButton } from '@clerk/nextjs';
import MobileSideBar from '@/components/mobile-sidebar';
import { getTrailCount } from '@/lib/trialcounts';

const Navbar = async () => {
  const trialLimitCount =  await getTrailCount();
  return (
    <div className='flex items-center p-4'>
        <MobileSideBar apiLimitCount={trialLimitCount} />
        <div className='flex w-full justify-end'>
            <UserButton afterSignOutUrl='/' />
        </div>
    </div>
  )
};

export default Navbar;
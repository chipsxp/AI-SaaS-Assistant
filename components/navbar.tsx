// components/navbar.tsx
import { UserButton } from '@clerk/nextjs';
import MobileSideBar from '@/components/mobile-sidebar';
import { getTrailCount } from '@/lib/trialcounts';

const Navbar = async () => {
  const trialLimitCount =  await getTrailCount();
  return (
      <div className='flex items-center'>
        <MobileSideBar apiLimitCount={trialLimitCount} />
            <div className='flex w-full justify-end'>
              <h1 className='text-2xl font-bold text-white'>AI SaaS Assistant</h1>
              <UserButton afterSignOutUrl='/' />  
            </div>
      </div>
  )
};

export default Navbar;
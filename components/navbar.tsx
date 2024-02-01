import React from 'react'

import { UserButton } from '@clerk/nextjs';
import MobileSideBar from '@/components/mobile-sidebar';

const Navbar = () => {
  return (
    <div className='flex items-center p-4'>
        <MobileSideBar />
        <div className='flex w-full justify-end'>
            <UserButton afterSignOutUrl='/' />
        </div>
    </div>
  )
};

export default Navbar;
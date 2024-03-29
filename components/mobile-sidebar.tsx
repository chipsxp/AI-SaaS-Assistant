'use client';

import { Button } from '@/components/ui/button';
import { Menu } from 'lucide-react';
import { Sheet, SheetContent, SheetTrigger } from '@/components/ui/sheet';
import { SideBar } from '@/components/sidebar';
import { useEffect, useState } from 'react';

interface MobileSideBarProps {
    apiLimitCount: number
}


const MobileSideBar = ({apiLimitCount}: MobileSideBarProps) => {

    const [isMounted, setIsMounted] = useState(false);

    useEffect(() => {
        setIsMounted(true);
    },[]);
 
    if(!isMounted) return null;

    return (
        <Sheet>
            <SheetTrigger asChild>
                <Button variant={'ghost'} size={'icon'} className='md:hidden'>
                    <Menu />
                </Button>
            </SheetTrigger>
            <SheetContent side={'left'} className='p-0'>
                <SideBar apiLimitCount={apiLimitCount} />
            </SheetContent>
        </Sheet>
    )
}

export default MobileSideBar
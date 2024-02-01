import React from 'react'
import { LucideIcon } from 'lucide-react'
import { cn } from '@/lib/utils'

interface HeadingProps {
    title: string;
    description: string;
    icon: LucideIcon;
    iconColor?: string;
    iconBgColor?: string;
}

export const Heading = (
    { title, 
    description, 
    icon: Icon, 
    iconColor, 
    iconBgColor 
}: HeadingProps) => {
    return (
    
    <div className="px-4 lg:px-8 flex items-center gap-x-3 mb-8">
        <div className={cn ('p-2 w-fit rounded-md', iconBgColor)}>
            <Icon className={cn ('w-10 h-10', iconColor)} />
        <div>
            <h2 className="text-2xl md:text-4xl font-bold">
                {title}
            </h2>
            <p className='text-muted-foreground font-light text-sm md:text-lg'>
                {description}
            </p>
        </div>
        </div>
    </div>
    )
};

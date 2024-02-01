'use client';
import { ArrowRight, MessageSquare, ImageIcon, VideoIcon, Music, CodeIcon } from "lucide-react";
import {
  Card,
  CardContent,
  CardDescription,
  CardFooter,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import { cn } from "@/lib/utils";
import { useRouter } from "next/navigation";


const tools = [
  {
    label: 'Conversation Chat',
    icon: MessageSquare,
    href: '/conversation',
    color: 'text-violet-700',
    bgColor: 'bg-violet-700/10'
    
  },
  {
    label: 'Image Generation',
    icon: ImageIcon,
    href: '/image-generator',
    color: 'text-pink-700',
    bgColor: 'bg-pink-700/10'
  },
  {
    label: 'Video Generation',
    icon: VideoIcon,
    href: '/video-generation',
    color: 'text-orange-700',
    bgColor: 'bg-orange-700/10'
  },
  {
    label: 'Music Generation',
    icon: Music,
    href: '/music-generation',
    color: 'text-emerald-700',
    bgColor: 'bg-emerald-700/10'
  },
  {
    label: 'Code Generation',
    icon: CodeIcon,
    href: '/code-generator',
    color: 'text-sky-700',
    bgColor: 'bg-sky-700/10'
  },
]

const  DashBoard = () => {
  const router = useRouter();

  return (
    <div>
      <div className="mb-8 space-y-4">
        <h2 className="text-2xl md:text-4xl font-bold text-center">
        Make an AI As Your Personal Data Assistance!
        </h2>
        <p className='text-muted-foreground font-light text-sm md:text-lg text-center'>
          Chat with your AI Assistant.
        </p>
      </div>
      <div className="px-4 md:px-20 lg:px-32 space-y-4">
        {tools.map((tool) => (
          <Card key={tool.label} className="p-2 border-black/6 flex items-center justify-between hover:shadow-md transition-opacity cursor-pointer">
            <CardHeader>
              <CardTitle className="font-semibold flex items-center justify-center" onClick={() => router.push(tool.href)}>
                {tool.label}
              </CardTitle>
            </CardHeader>
            <div className="flex items-center gap-x-4">
              <div className={cn('p-2 w-fit rounded-s-md', tool.bgColor)}>
                <tool.icon className={cn('w-8 h-8', tool.color)} />
              </div>
              
            </div>    
            <ArrowRight className="w-5 h-5 " />
          </Card>
          
        ))}
      </div>
      
    </div>
  )
};

export default DashBoard
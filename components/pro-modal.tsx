"use client";
import { useProModalPopup } from '@/hooks/pro-modal-popup';
import { MessageSquare, ImageIcon, VideoIcon, Music, CodeIcon, Check, ZapIcon } from 'lucide-react';
import { Dialog, DialogContent, DialogDescription, DialogFooter, DialogHeader, DialogTitle } from './ui/dialog';
import { Badge } from './ui/badge';
import { Card } from './ui/card';
import { cn } from '@/lib/utils';
import { Button } from './ui/button';


const tools = [
  {
    label: 'Conversation Chat',
    icon: MessageSquare,
    color: 'text-violet-700', 
    bgColor: 'bg-violet-700/10'
    
  },
  {
    label: 'Image Generation',
    icon: ImageIcon,
    color: 'text-pink-700',
    bgColor: 'bg-pink-700/10'
  },
  {
    label: 'Video Generation',
    icon: VideoIcon,
    color: 'text-orange-700',
    bgColor: 'bg-orange-700/10'
  },
  {
    label: 'Music Generation',
    icon: Music,
    color: 'text-emerald-700',
    bgColor: 'bg-emerald-700/10'
  },
  {
    label: 'Code Generation',
    icon: CodeIcon,
    color: 'text-sky-700',
    bgColor: 'bg-sky-700/10'
  },
]
export const ProModal = () => {
    const useModal = useProModalPopup();
        return (
        <Dialog open = {useModal.isOpen} onOpenChange={useModal.onClose}>
            <DialogContent>
                <DialogHeader>
                    <DialogTitle className="flex justify-center items-center flex-col gap-y-4 pb-2 text-center ">
                        <div className='flex items-center gap-x-2 font-bold py-2'>
                            Upgrade to Professional AI Assistant
                            <Badge className='uppercase text-sm font-bold py-1' variant='premium'>
                                Subscribe
                            </Badge>
                        </div>
                    </DialogTitle>
                    <DialogDescription className="text-center pt-2 space-y-2 text-zinc-900 font-medium">
                        {tools.map((tool) => (
                            <Card key={tool.label} className="flex justify-between items-center gap-y-2 border-black/5">
                                <div className='flex items-center gap-x-4'>
                                  <div className={cn('p-2 w-fit rounded-s-md', tool.bgColor)}>
                                    <tool.icon className={cn('w-8 h-8', tool.color)} />
                                  </div>
                                  <div className="font-semibold text-md">
                                    {tool.label}
                                  </div>
                                </div>
                                <Check className="text-primary-500 w-5 h-5 " />
                            </Card>
                        ))}
                      </DialogDescription>
                </DialogHeader>
                <DialogFooter>
                    <Button variant='premium' 
                      size = 'lg'
                      className='w-full bg-primary-500 text-white font-semibold py-3 rounded-lg hover:bg-primary-600 transition-colors'>
                      Upgrade Now
                      <ZapIcon className='w-4 h-4 ml-2 fill-white' />
                    </Button>
                </DialogFooter>
            </DialogContent>
        </Dialog>
    )
}
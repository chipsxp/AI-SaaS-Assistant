"use client";

import * as z from 'zod';
import { useRouter } from 'next/navigation';
import { Heading } from '@/components/heading';
import { Music } from 'lucide-react';
import { useForm } from 'react-hook-form';
import { Form, FormField, FormItem, FormControl, } from '@/components/ui/form';
import { musicFormSchema } from './constants';
import { zodResolver } from '@hookform/resolvers/zod';
import { Input } from '@/components/ui/input';
import { Button } from '@/components/ui/button';
import { useState } from 'react';
import axios from 'axios';
import OpenAI  from 'openai';
import Empty from '@/components/empty';
import Loader from '@/components/loader';
import { cn } from '@/lib/utils';



const MusicSoundPage = () => {
  
  const router = useRouter();

  const [music, setMusic] = useState<string[]>([]);

  const form=useForm<z.infer<typeof musicFormSchema>> ({
    resolver: zodResolver(musicFormSchema),
    defaultValues: {
      prompt: "",
    },
});

const isLoading = form.formState.isSubmitting;
 
const onSubmit = async (formData: z.infer<typeof musicFormSchema>) => {
      try {
      setMusic(undefined);
        
        const response = await axios.post("/api/music-generator", values);
        setMusic(response.data.audio);
        form.reset();
      } catch (error: any) {
        // TODO: handle error Pro Model
        console.error(error);
        form.setError("root", { message: "Error submitting form" });
      } finally {
        router.refresh();
      }
    };

  return (
    <div>
      <Heading title="AI Sound Music Generator" 
      description="AI Office Assistant Music Generation" 
      icon={Music} 
      iconColor="text-emerald-700" 
      iconBgColor="bg-emerald-700/10" 
      />
      <div className='px-4 lg:px-8'>
        <Form {...form}>
          <form onSubmit={form.handleSubmit(onSubmit)} 
          className="rounded-lg border w-full p-4 px-3 md:px-6 
          focus-within:shadow-sm grid grid-cols-12 gap-2">
            <FormField name='prompt' render={({field})=>(
              <FormItem className='col-span-12 lg:col-span-10'>
                <FormControl className='m=0 p-0'>
                  <Input className='border-0 outline-none focus-visible:ring-0
                  focus-visible:ring-transparent' disabled={isLoading} 
                  placeholder='Jazz guitar BB King' {...field} />
                </FormControl>
              </FormItem>
            )} 
            />
            <Button className="col-span-4 lg:col-span-3 w-full" 
            type="submit" disabled={isLoading}>Generate Response</Button>
          </form>
        </Form>        
      </div>
      <div className='space-y-4 mt-4'>
        {isLoading && (
          <div className='flex items-center w-full p-8 rounded-lg border'>
            <Loader />
          </div>
        )}
        {music && !isLoading &&(
          <Empty label='No music or sound generated'/>
        )}
          <div className='flex flex-col-reverse gap-y-4 '>
            Music will be here
          </div>
      </div>
    </div>
  )
}

export default MusicSoundPage
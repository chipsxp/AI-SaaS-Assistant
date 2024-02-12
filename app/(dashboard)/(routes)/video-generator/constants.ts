import * as z from 'zod';

export const videoFormSchema = z.object({
    prompt: z.string().min(1, { 
        message: 'Describe a video, movie or motion object you want to generate',
     }),
})
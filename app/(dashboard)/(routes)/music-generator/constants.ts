import * as z from 'zod';

export const musicFormSchema = z.object({
    prompt: z.string().min(1, { 
        message: 'Describe a song, music or any sound you want to generate',
     }),
})
import * as z from 'zod';

export const conversationFormSchema = z.object({
    prompt: z.string().min(1, { 
        message: 'Please enter a prompt',
     }),
})
import * as z from 'zod';

export const codeGeneratorFormSchema = z.object({
    prompt: z.string().min(1, { 
        message: 'Please describe a code function',
     }),
})
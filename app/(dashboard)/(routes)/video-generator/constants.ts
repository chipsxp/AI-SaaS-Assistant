import * as z from "zod";

export const videoFormSchema = z.object({
    prompt: z.string().min(50, { 
        message: 'Please provide a detailed description (at least 50 characters) including scene details, camera movements, and visual elements for better video generation',
     }),
});

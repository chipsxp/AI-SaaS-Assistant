import * as z from 'zod';

export const imageFormSchema = z.object({
    prompt: z.string().min(1, { 
        message: 'Iamge description prompt is required',
    }),
    amount: z.string().min(1, {
        message: 'Image amount is required',
    }),
    resolution: z.string().min(1, {
        message: 'Image resolution is required',
    })
});

export const amountOptions=[
    { value: "1", label: "1 image" },
    { value: "2", label: "2 images" },
    { value: "3", label: "3 images" },
    { value: "4", label: "4 images" },
    { value: "5", label: "5 images" },
];

export const resolutionOptions=[
    { value: "256x256", label: "256x256" },
    { value: "512x512", label: "512x512" },
    { value: "1024x1024", label: "1024x1024" },
];
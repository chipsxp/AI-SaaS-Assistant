"use client";
import toast from "react-hot-toast";
import * as z from "zod";
import { useRouter } from "next/navigation";
import { Heading } from "@/components/heading";
import { Music } from "lucide-react";
import { useForm } from "react-hook-form";
import { Form, FormField, FormItem, FormControl } from "@/components/ui/form";
import { musicFormSchema } from "./constants";
import { zodResolver } from "@hookform/resolvers/zod";
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";
import { useState, useCallback } from "react";
import axios from "axios";
import Empty from "@/components/empty";
import Loader from "@/components/loader";
import { useProModalPopup } from "@/hooks/pro-modal-popup";

const MusicSoundPage = () => {
  const proModal = useProModalPopup();
  const router = useRouter();

  const [music, setMusic] = useState<string>();
  const [generationMessage, setGenerationMessage] = useState<string>("");

  const form = useForm<z.infer<typeof musicFormSchema>>({
    resolver: zodResolver(musicFormSchema),
    defaultValues: {
      prompt: "",
    },
  });

  const isLoading = form.formState.isSubmitting;

  const onSubmit = async (formData: z.infer<typeof musicFormSchema>) => {
    try {
      setMusic(undefined);
      setGenerationMessage("Starting audio generation...");

      const response = await axios.post("/api/music-generator", formData);
      
      if (!response.data?.audio || typeof response.data.audio !== 'string') {
        throw new Error("Invalid response format from server");
      }
      
      setGenerationMessage("");
      setMusic(response.data.audio);
      form.reset();
    } catch (error: any) {
      if (error?.response?.status === 403) {
        proModal.onOpen();
      } else if (error?.response?.status === 500) {
        toast.error(error?.response?.data || "Failed to generate audio");
      } else if (error.message === "Invalid response format from server") {
        toast.error("Invalid response from server. Please try again.");
      } else {
        toast.error("An error occurred while generating audio");
      }
      form.setError("root", { message: "Generation failed" });
    } finally {
      router.refresh();
    }
  };

  const handleAudioError = (e: React.SyntheticEvent<HTMLAudioElement, Event>) => {
    const audioElement = e.target as HTMLAudioElement;
    const errorMessage = audioElement.error
      ? `Audio playback error: ${audioElement.error.message}`
      : "Unknown audio playback error";
    console.error("Audio playback error:", errorMessage);
    toast.error(errorMessage);
  };

  return (
    <div>
      <Heading
        title="AI Sound Music Generator"
        description="AI Office Assistant Music Generation"
        icon={Music}
        iconColor="text-emerald-700"
        iconBgColor="bg-emerald-700/10"
      />
      <div className="px-4 lg:px-8">
        <Form {...form}>
          <form
            onSubmit={form.handleSubmit(onSubmit)}
            className="rounded-lg border-[3px] w-full p-4 px-3 md:px-6 
          focus-within:shadow-sm grid grid-cols-12 gap-6"
          >
            <FormField
              name="prompt"
              render={({ field }) => (
                <FormItem className="col-span-12 lg:col-span-10">
                  <FormControl className="m=0 p-0">
                    <Input
                      className="border-2 outline-none focus-visible:ring-2
                  focus-visible:ring-emerald-500 shadow-sm"
                      disabled={isLoading}
                      placeholder="Jazz guitar BB King"
                      {...field}
                    />
                  </FormControl>
                </FormItem>
              )}
            />
            <Button
              className="col-span-4 lg:col-span-3 w-full font-semibold shadow-md text-sm md:text-base"
              variant="premium"
              size="lg"
              type="submit"
              disabled={isLoading}
            >
              <span className="hidden lg:inline">Generate Response</span>
              <span className="lg:hidden leading-tight">
                Generate<br />Response
              </span>
            </Button>
          </form>
        </Form>
      </div>
      <div className="space-y-4 mt-4 px-4 lg:px-8">
        {(isLoading || generationMessage) && (
          <div className="flex flex-col items-center w-full p-8 rounded-lg border">
            <Loader />
            {generationMessage && (
              <p className="text-sm text-muted-foreground mt-2">
                {generationMessage}
              </p>
            )}
          </div>
        )}
        {!music && !isLoading && <Empty label="No music or sound generated" />}
        {music && !isLoading && (
          <div className="space-y-4 max-w-4xl mx-auto">
            <audio 
              controls 
              className="w-full mt-8 shadow-md" 
              onError={handleAudioError}
            >
              <source src={music} type="audio/mp3" />
            </audio>
            <div className="flex justify-center">
              <a
                href={music}
                download
                target="_blank"
                rel="noopener noreferrer"
                className="inline-flex items-center px-4 py-2 bg-emerald-700 text-white rounded-md hover:bg-emerald-800 transition-colors"
              >
                <Music className="w-4 h-4 mr-2" />
                Download Audio
              </a>
            </div>
          </div>
        )}
      </div>
    </div>
  );
};

export default MusicSoundPage;

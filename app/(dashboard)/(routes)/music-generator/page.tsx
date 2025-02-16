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
import { useState } from "react";
import axios from "axios";
import Empty from "@/components/empty";
import Loader from "@/components/loader";
import { useProModalPopup } from "@/hooks/pro-modal-popup";

const MusicSoundPage = () => {
  const proModal = useProModalPopup();
  const router = useRouter();

  const [music, setMusic] = useState<string>();

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

      const response = await axios.post("/api/music-generator", formData);
      setMusic(response.data.audio);
      form.reset();
    } catch (error: any) {
      if (error?.response?.status === 403) {
        proModal.onOpen();
      } else {
        toast.error("Error submitting form");
      }
      form.setError("root", { message: "Error submitting form" });
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
            className="rounded-lg border w-full p-4 px-3 md:px-6 
          focus-within:shadow-sm grid grid-cols-12 gap-2"
          >
            <FormField
              name="prompt"
              render={({ field }) => (
                <FormItem className="col-span-12 lg:col-span-10">
                  <FormControl className="m=0 p-0">
                    <Input
                      className="border-0 outline-none focus-visible:ring-0
                  focus-visible:ring-transparent"
                      disabled={isLoading}
                      placeholder="Jazz guitar BB King"
                      {...field}
                    />
                  </FormControl>
                </FormItem>
              )}
            />
            <Button
              className="col-span-4 lg:col-span-3 w-full"
              type="submit"
              disabled={isLoading}
            >
              Generate Response
            </Button>
          </form>
        </Form>
      </div>
      <div className="space-y-4 mt-4">
        {isLoading && (
          <div className="flex items-center w-full p-8 rounded-lg border">
            <Loader />
          </div>
        )}
        {music && !isLoading && <Empty label="No music or sound generated" />}
        {music && (
          <audio controls className="w-full mt-8" onError={handleAudioError}>
            <source src={music} type="audio/mp3" />
          </audio>
        )}
      </div>
    </div>
  );
};

export default MusicSoundPage;

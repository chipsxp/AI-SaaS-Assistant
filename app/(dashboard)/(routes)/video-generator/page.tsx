"use client";
import toast from "react-hot-toast";
import * as z from "zod";
import { useRouter } from "next/navigation";
import { Heading } from "@/components/heading";
import { VideoIcon } from "lucide-react";
import { useForm } from "react-hook-form";
import { Form, FormField, FormItem, FormControl } from "@/components/ui/form";
import { videoFormSchema } from "./constants";
import { zodResolver } from "@hookform/resolvers/zod";
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";
import { useState } from "react";
import axios from "axios";
import Empty from "@/components/empty";
import Loader from "@/components/loader";
import { useProModalPopup } from "@/hooks/pro-modal-popup";

const VideoMotionPage = () => {
  const proModal = useProModalPopup();
  const router = useRouter();

  const [video, setVideo] = useState<string>();

  const form = useForm<z.infer<typeof videoFormSchema>>({
    resolver: zodResolver(videoFormSchema),
    defaultValues: {
      prompt: "",
    },
  });

  const isLoading = form.formState.isSubmitting;

  const onSubmit = async (formData: z.infer<typeof videoFormSchema>) => {
    try {
      setVideo(undefined);

      const response = await axios.post("/api/video-generator", formData);
      console.log("API Response:", response.data); // Debug log
      // LTX-Video returns the video URL in the response
      setVideo(response.data);
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

  return (
    <div>
      <Heading
        title="AI Video Generator (LTX-Video)"
        description="Generate high-quality videos using advanced text-to-video technology"
        icon={VideoIcon}
        iconColor="text-orange-700"
        iconBgColor="bg-orange-700/10"
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
                  focus-visible:ring-orange-500 shadow-sm"
                      disabled={isLoading}
                      placeholder="A woman with long brown hair walks through a sunlit garden, wearing a flowing white dress. The camera follows her movement smoothly, capturing the gentle sway of flowers in the breeze."
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
        {isLoading && (
          <div className="flex items-center w-full p-8 rounded-lg border">
            <Loader />
          </div>
        )}
        {!video && !isLoading && <Empty label="No video generated yet" />}
        {video && (
          <div className="space-y-4 max-w-4xl mx-auto">
            <video
              controls
              className="w-full aspect-video mt-8 rounded-lg border bg-black shadow-md"
              src={video}
            >
              Your browser does not support the video element.
            </video>
            <div className="flex justify-center">
              <a
                href={video}
                download
                target="_blank"
                rel="noopener noreferrer"
                className="inline-flex items-center px-4 py-2 bg-orange-700 text-white rounded-md hover:bg-orange-800 transition-colors"
              >
                <VideoIcon className="w-4 h-4 mr-2" />
                Download Video
              </a>
            </div>
          </div>
        )}
      </div>
    </div>
  );
};

export default VideoMotionPage;

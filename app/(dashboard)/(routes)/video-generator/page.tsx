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
      setVideo(response.data[0]);
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
        title="AI Motion Video Generator"
        description="AI Office Assistant Video Generation"
        icon={VideoIcon}
        iconColor="text-orange-700"
        iconBgColor="bg-orange-700/10"
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
                      placeholder="A horse galloping through the clouds"
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
        {video && !isLoading && <Empty label="No motion video generated" />}
        {video && (
          <video
            controls
            className="w-full aspect-video mt-8 rounded-lg border-1 bg-black"
          >
            <source src={video} />
          </video>
        )}
      </div>
    </div>
  );
};

export default VideoMotionPage;

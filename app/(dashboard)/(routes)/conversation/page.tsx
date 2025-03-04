"use client";
import toast from "react-hot-toast";
import * as z from "zod";
import { useRouter } from "next/navigation";
import { Heading } from "@/components/heading";
import { MessageSquare } from "lucide-react";
import { useForm } from "react-hook-form";
import { Form, FormField, FormItem, FormControl } from "@/components/ui/form";
import { conversationFormSchema } from "./constants";
import { zodResolver } from "@hookform/resolvers/zod";
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";
import { useState, useMemo } from "react";
import { TextbookView } from "@/components/textbook-view";
import axios from "axios";
import OpenAI from "openai";
import Empty from "@/components/empty";
import Loader from "@/components/loader";
import { cn } from "@/lib/utils";
import { UserAvatar } from "@/components/user-avatar";
import { BotAvatar } from "@/components/bot-avatar";
import { useProModalPopup } from "@/hooks/pro-modal-popup";

const ConversationPage = () => {
  const proModal = useProModalPopup();
  const router = useRouter();
  const [messages, setMessages] = useState<OpenAI.ChatCompletionMessage[]>([]);
  const form = useForm<z.infer<typeof conversationFormSchema>>({
    resolver: zodResolver(conversationFormSchema),
    defaultValues: {
      prompt: "",
    },
  });

  const isLoading = form.formState.isSubmitting;

  const onSubmit = async (formData: z.infer<typeof conversationFormSchema>) => {
    try {
      const userMessage: OpenAI.ChatCompletionMessage = {
        role: "assistant",
        refusal: null,
        content: formData.prompt,
      };
      const newMessages = [...messages, userMessage];
      const response = await axios.post("/api/conversation", {
        messages: newMessages,
      });
      setMessages((current) => [...current, userMessage, response.data]);
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
        title="AI Conversation"
        description="AI Office Assistant Conversation"
        icon={MessageSquare}
        iconColor="text-violet-700"
        iconBgColor="bg-violet-700/10"
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
                  focus-visible:ring-violet-500 shadow-sm"
                      disabled={isLoading}
                      placeholder="Type a question or ideas here"
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
      <div className="mt-4">
        {isLoading && (
          <div className="flex items-center justify-center w-full p-8">
            <Loader />
          </div>
        )}
        {messages.length === 0 && !isLoading && (
          <Empty label="Start a conversation" />
        )}
        <TextbookView messages={messages} />
      </div>
    </div>
  );
};

export default ConversationPage;

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
import { useState } from "react";
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
                      placeholder="Type a question or ideas here"
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
      <div className="max-w-[70rem] ml-4 space-y-4 mt-4 px-4">
        {isLoading && (
          <div className="flex items-center justify-center w-full p-8">
            <Loader />
          </div>
        )}
        {messages.length === 0 && !isLoading && (
          <Empty label="Start a conversation" />
        )}
        <div className="flex flex-col-reverse gap-y-4">
          {messages.map((message, index) => (
            <div
              key={index}
              className={cn(
                "flex items-start gap-x-3 py-4 px-4",
                message.role === "assistant" ? "flex-row-reverse" : "flex-row"
              )}
            >
              <div className="flex-shrink-0">
                {message.role === "assistant" ? <UserAvatar /> : <BotAvatar />}
              </div>
              <div
                className={cn(
                  "p-4 rounded-2xl max-w-[80%] break-words shadow-sm",
                  message.role === "assistant"
                    ? "bg-blue-100 text-blue-900 rounded-tr-none"
                    : "bg-gray-100 text-gray-900 rounded-tl-none"
                )}
              >
                <p className="text-sm whitespace-pre-wrap">
                  {message.content?.split(/\*\*(.*?)\*\*/).map((part, i) =>
                    i % 2 === 0 ? (
                      part
                    ) : (
                      <span key={i} className="font-bold">
                        {part}
                      </span>
                    )
                  ) || message.content}
                </p>
              </div>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
};

export default ConversationPage;

"use client";
import toast from "react-hot-toast";
import * as z from "zod";
import { useRouter } from "next/navigation";
import { Heading } from "@/components/heading";
import { CodeIcon } from "lucide-react";
import { useForm } from "react-hook-form";
import { Form, FormField, FormItem, FormControl } from "@/components/ui/form";
import { codeGeneratorFormSchema } from "./constants";
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
import ReactMarkdown from "react-markdown";
import { useProModalPopup } from "@/hooks/pro-modal-popup";

const CodePage = () => {
  const proModal = useProModalPopup();
  const router = useRouter();

  const [messages, setMessages] = useState<OpenAI.ChatCompletionMessage[]>([]);

  const form = useForm<z.infer<typeof codeGeneratorFormSchema>>({
    resolver: zodResolver(codeGeneratorFormSchema),
    defaultValues: {
      prompt: "",
    },
  });

  const isLoading = form.formState.isSubmitting;

  const onSubmit = async (
    formData: z.infer<typeof codeGeneratorFormSchema>
  ) => {
    try {
      const userMessage: OpenAI.ChatCompletionMessage = {
        role: "assistant",
        refusal: null,
        content: formData.prompt,
      };
      const newMessages = [...messages, userMessage];
      const response = await axios.post("/api/code-generator", {
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
        title="AI Code Generator"
        description="AI Workspace Code Generator Assistant"
        icon={CodeIcon}
        iconColor="text-sky-700"
        iconBgColor="bg-sky-700/10"
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
                      placeholder="Simple landing page template using Bootstrap 5"
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
        {messages.length === 0 && !isLoading && (
          <Empty label="Start Code Generator" />
        )}
        <div className="flex flex-col-reverse gap-y-4 ">
          {messages.map((message, index) => (
            <div
              key={index}
              className={cn(
                "w-full p-8 rounded-lg flex items-start gap-x-8",
                message.role === "assistant"
                  ? "bg-white border border-zinc-800/10"
                  : "bg-muted"
              )}
            >
              {message.role === "assistant" ? <UserAvatar /> : <BotAvatar />}
              <p className="text-sm">
                <ReactMarkdown
                  components={{
                    pre: ({ node, ...props }) => (
                      <div className="overflow-x-auto rounded-lg bg-muted/10 p-4">
                        <pre {...props} />
                      </div>
                    ),
                    code: ({ node, ...props }) => (
                      <code className="bg-black/10 p-1 rounded-lg" {...props} />
                    ),
                  }}
                  className="text-sm overflow-hidden leading-7 text-ellipsis whitespace-pre-wrap"
                >
                  {message.content || ""}
                </ReactMarkdown>
              </p>
            </div>
          ))}
          ;
        </div>
      </div>
    </div>
  );
};

export default CodePage;

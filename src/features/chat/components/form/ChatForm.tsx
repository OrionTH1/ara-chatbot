"use client";

import { Button } from "@/components/ui/button";
import { Form, FormControl, FormField, FormItem } from "@/components/ui/form";
import { Input } from "@/components/ui/input";
import { createChat } from "@/lib/actions/chat.actions";
import { createConversation } from "@/lib/ai-model";
import { useChatStore } from "@/lib/store/chat";
import { zodResolver } from "@hookform/resolvers/zod";
import { readStreamableValue } from "ai/rsc";
import { SendHorizonal } from "lucide-react";
import Image from "next/image";
import { redirect } from "next/navigation";
import { useCallback, useEffect, useState } from "react";
import { useForm } from "react-hook-form";
import Cookies from "js-cookie";
import { z } from "zod";
import { createMessage } from "@/lib/actions/message.actions";

const formSchema = z.object({
  message: z.string().min(1, {
    message: "Message is required",
  }),
});

function ChatForm({
  newChat,
  firstQuestion,
  userId,
  chatId,
}: {
  newChat: boolean;
  firstQuestion?: string;
  chatId?: string;
  userId?: string;
}) {
  const { setMessages, messages: history } = useChatStore();
  const [isLoading, setIsLoading] = useState(false);

  const form = useForm<z.infer<typeof formSchema>>({
    resolver: zodResolver(formSchema),
    defaultValues: {
      message: "",
    },
  });

  const onSubmit = useCallback(
    async (data: z.infer<typeof formSchema>) => {
      try {
        if (!chatId) {
          console.error("Chat ID is required");
          return;
        }
        setIsLoading(true);
        form.resetField("message");

        // User Message
        setMessages([
          ...history,
          {
            content: data.message,
            role: "user",
          },
        ]);

        const userMessage = (await createMessage(data.message, "user", chatId))
          .response;
        if (!userMessage) {
          return;
        }

        // Model Message
        const response = await createConversation([...history, userMessage]);

        if (!response) {
          console.error("Error creating conversation");
          return;
        }
        let textContent = "";

        for await (const delta of readStreamableValue(response.newMessage)) {
          textContent = `${textContent}${delta}`;

          setMessages([
            ...response.messages,
            { role: "assistant", content: textContent },
          ]);
        }

        const modelMessage = (
          await createMessage(textContent, "assistant", chatId)
        ).response;
        if (!modelMessage) {
          console.error("Error creating message");
          return;
        }
      } finally {
        setIsLoading(false);
      }
    },
    [chatId, form, history, setMessages]
  );

  const createNewChat = async (data: z.infer<typeof formSchema>) => {
    try {
      setIsLoading(true);
      if (!userId) {
        console.error("User ID is required");
        return;
      }

      form.resetField("message");

      const chat = await createChat(userId, data.message);

      if (!chat) {
        console.error("Error creating chat");
        return;
      }

      redirect(`/chat/${chat.response?.$id}`);
    } finally {
      setIsLoading(false);
    }
  };

  useEffect(() => {
    if (newChat) {
      setMessages([]);
    }

    if (firstQuestion) {
      onSubmit({ message: firstQuestion });
      Cookies.remove("chatFirstQuestion");
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [firstQuestion]);

  return (
    <Form {...form}>
      <form
        onSubmit={form.handleSubmit(newChat ? createNewChat : onSubmit)}
        className="px-4 lg:px-[15%]"
      >
        <FormField
          control={form.control}
          name="message"
          render={({ field }) => (
            <FormItem className="relative flex items-center">
              <FormControl>
                <Input
                  type="text"
                  className="bg-secondary-background shadow-lg rounded-2xl h-16 pr-14"
                  disabled={isLoading}
                  placeholder={isLoading ? "" : "Type your message here..."}
                  {...field}
                />
              </FormControl>

              {isLoading && (
                <Image
                  src="/assets/icons/loader.svg"
                  alt="loader icon"
                  width={20}
                  height={20}
                  className="absolute left-4 ml-2 animate-spin"
                />
              )}
              <Button
                type="submit"
                className="absolute right-4 p-1 flex items-center justify-center"
                variant={"ghost"}
              >
                <SendHorizonal className="size-5" />
              </Button>
            </FormItem>
          )}
        />
      </form>
    </Form>
  );
}

export default ChatForm;

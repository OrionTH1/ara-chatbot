"use client";

import { useChatStore } from "@/lib/store/chat";
import Message from "./Message";
import { useEffect } from "react";
import { getChatMessages } from "@/lib/actions/chat";

function MessagesList({ chatId }: { chatId: string }) {
  const chatStore = useChatStore();
  useEffect(() => {
    const getMessages = async () => {
      const { response } = await getChatMessages(chatId);

      if (!response) {
        return;
      }

      chatStore.setMessages([...response]);
    };

    getMessages();
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  return (
    <ul className="flex gap-4 flex-col overflow-y-auto h-[calc(100vh-200px)] relative px-4 lg:px-[15%]">
      {chatStore.messages.map((message, index) => (
        <Message key={index} text={message.content} author={message.role} />
      ))}
    </ul>
  );
}

export default MessagesList;

"use client";

import { Message as MessageType } from "@/lib/ai-model";
import { useChatStore } from "@/lib/store/chat";
import { useEffect } from "react";
import Message from "./Message";

function MessagesList({ chat }: { chat: MessageType[] }) {
  const chatStore = useChatStore();
  useEffect(() => {
    const getMessages = async () => {
      chatStore.setMessages([...chat]);
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

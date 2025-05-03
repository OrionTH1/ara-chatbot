"use client";

import { useChatStore } from "@/lib/store/chat";
import Message from "./Message";
import { Message as MessageType } from "@/lib/ai-model";
import { useEffect } from "react";

function MessagesList({ messages }: { messages: MessageType[] }) {
  const chatStore = useChatStore();

  useEffect(() => {
    chatStore.setMessages(messages);
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

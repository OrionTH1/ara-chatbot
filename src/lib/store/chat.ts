import { create } from "zustand";
import { Message } from "../ai-model";

interface ChatStore {
  messages: Message[];
  setMessages: (message: Message[]) => void;
  firstMessage: string;
  setFirstMessage: (message: string) => void;
}

export const useChatStore = create<ChatStore>((set) => ({
  messages: [],
  setMessages: (message) => set(() => ({ messages: [...message] })),

  firstMessage: "",
  setFirstMessage: (message) => set(() => ({ firstMessage: message })),
}));

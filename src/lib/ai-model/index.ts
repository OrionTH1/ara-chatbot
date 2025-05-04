"use server";

import { google } from "@ai-sdk/google";
import { streamText, generateText } from "ai";
import { createStreamableValue } from "ai/rsc";
import { generateChatNameInstructions, instructions } from "./instructions";

export interface Message {
  role: "user" | "assistant";
  content: string;
}

export async function generateChatName(firstQuestion: string) {
  const model = google("gemini-2.0-flash", {
    safetySettings: [
      { category: "HARM_CATEGORY_CIVIC_INTEGRITY", threshold: "BLOCK_NONE" },
      { category: "HARM_CATEGORY_DANGEROUS_CONTENT", threshold: "BLOCK_NONE" },
      { category: "HARM_CATEGORY_HARASSMENT", threshold: "BLOCK_NONE" },
      { category: "HARM_CATEGORY_HATE_SPEECH", threshold: "BLOCK_NONE" },
      { category: "HARM_CATEGORY_SEXUALLY_EXPLICIT", threshold: "BLOCK_NONE" },
    ],
  });

  const response = await generateText({
    model: model,
    system: generateChatNameInstructions,
    prompt: firstQuestion,
    temperature: 0.7,
    maxTokens: 10,
  });

  return response.text;
}

export async function createConversation(history: Message[]) {
  const stream = createStreamableValue();
  const model = google("gemini-2.0-flash", {
    safetySettings: [
      { category: "HARM_CATEGORY_CIVIC_INTEGRITY", threshold: "BLOCK_NONE" },
      { category: "HARM_CATEGORY_DANGEROUS_CONTENT", threshold: "BLOCK_NONE" },
      { category: "HARM_CATEGORY_HARASSMENT", threshold: "BLOCK_NONE" },
      { category: "HARM_CATEGORY_HATE_SPEECH", threshold: "BLOCK_NONE" },
      { category: "HARM_CATEGORY_SEXUALLY_EXPLICIT", threshold: "BLOCK_NONE" },
    ],
  });

  try {
    (async () => {
      const { textStream } = await streamText({
        model: model,
        system: instructions,
        messages: history,
      });
      console.log(textStream);

      for await (const text of textStream) {
        stream.update(text);
      }

      stream.done();
    })().then(() => {});

    return {
      messages: history,
      newMessage: stream.value,
    };
  } catch (error) {
    console.error(error);
  }
}

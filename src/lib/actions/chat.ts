"use server";

import { ID, Models, Query } from "node-appwrite";
import { createAdminClient } from "../appwrite";
import { CHATS_COLLECTION_ID, DATABASE_ID } from "../appwrite/config";
import { revalidatePath } from "next/cache";
import { generateChatName, Message } from "../ai-model";
import { cookies } from "next/headers";

export const createChat = async (userId: string, firstQuestion: string) => {
  try {
    const { database } = await createAdminClient();
    (await cookies()).set("chatFirstQuestion", firstQuestion);

    const chatName = await generateChatName(firstQuestion);

    const chat = await database.createDocument(
      DATABASE_ID!,
      CHATS_COLLECTION_ID!,
      ID.unique(),
      {
        name: chatName,
        user: userId,
        messages: [],
      }
    );

    revalidatePath("/chat");

    return { error: null, response: chat };
  } catch (error) {
    console.error(error);
    return { error: "internal_error", response: null };
  }
};

export const deleteChat = async (chatId: string) => {
  try {
    const { database } = await createAdminClient();

    await database.deleteDocument(DATABASE_ID!, CHATS_COLLECTION_ID!, chatId);

    revalidatePath("/chat");

    return { error: null, response: null };
  } catch (error) {
    console.error(error);
    return { error: "internal_error", response: null };
  }
};

export const updateChatName = async (chatId: string, chatName: string) => {
  try {
    const { database } = await createAdminClient();

    const chat = await database.updateDocument(
      DATABASE_ID!,
      CHATS_COLLECTION_ID!,
      chatId,
      { name: chatName }
    );

    revalidatePath("/chat");

    return { error: null, response: chat };
  } catch (error) {
    console.error(error);
    return { error: "internal_error", response: null };
  }
};

export const getChats = async (userId: string) => {
  try {
    const { database } = await createAdminClient();

    const chats = await database.listDocuments(
      DATABASE_ID!,
      CHATS_COLLECTION_ID!,
      [Query.equal("user", [userId])]
    );

    return { error: null, response: chats };
  } catch (error) {
    console.error(error);
    return { error: "internal_error", response: null };
  }
};

export const chatInsertMessage = async (messageId: string, chatId: string) => {
  try {
    const { database } = await createAdminClient();

    const chat = await database.getDocument(
      DATABASE_ID!,
      CHATS_COLLECTION_ID!,
      chatId
    );

    if (!chat) {
      return { error: "chat_not_found", response: null };
    }

    const chatUpdated = database.updateDocument(
      DATABASE_ID!,
      CHATS_COLLECTION_ID!,
      chatId,
      { messages: [...chat.messages, messageId] }
    );

    return { error: null, response: chatUpdated };
  } catch (error) {
    console.error(error);
    return { error: "internal_error", response: null };
  }
};

export const getChatMessages = async (chatId: string) => {
  try {
    const { database } = await createAdminClient();

    const chat = await database.getDocument(
      DATABASE_ID!,
      CHATS_COLLECTION_ID!,
      chatId
    );

    const messages: Message[] = chat.messages.map(
      (message: Models.Document) => ({
        content: message.message,
        role: message.role,
      })
    );

    return { error: null, response: messages };
    // eslint-disable-next-line @typescript-eslint/no-explicit-any
  } catch (error: any) {
    if (error.code === 404) {
      return { error: "chat_not_found", response: null };
    }
    console.error(error);

    return { error: "internal_error", response: null };
  }
};

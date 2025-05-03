"use server";

import { ID } from "node-appwrite";
import { createAdminClient } from "../appwrite";
import { DATABASE_ID, MESSAGES_COLLECTION_ID } from "../appwrite/config";
import { chatInsertMessage } from "./chat";
import { Message } from "../ai-model";

export const createMessage = async (
  messageText: string,
  role: Role,
  chatId: string
) => {
  try {
    const { database } = await createAdminClient();

    const message = await database.createDocument(
      DATABASE_ID!,
      MESSAGES_COLLECTION_ID!,
      ID.unique(),
      {
        message: messageText,
        role,
      }
    );

    await chatInsertMessage(message.$id, chatId);

    return {
      error: null,
      response: { content: message.message, role: message.role } as Message,
    };
  } catch (error) {
    console.error(error);
    return { error: "internal_error", response: null };
  }
};

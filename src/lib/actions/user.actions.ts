"use server";

import { ID, Query } from "node-appwrite";
import { createAdminClient, createSessionClient } from "../appwrite";
import {
  BUCKET_ID,
  DATABASE_ID,
  USERS_COLLECTION_ID,
} from "../appwrite/config";
import { avatarPlacerHolderUrl } from "@/constants";
import { InputFile } from "node-appwrite/file";
import { constructFileUrl } from "../utils";
import { revalidatePath } from "next/cache";

// User Getters Section

export const getCurrentUser = async () => {
  try {
    const { account, database } = await createSessionClient();
    const result = await account.get();

    const user = await database.listDocuments(
      DATABASE_ID!,
      USERS_COLLECTION_ID!,
      [Query.equal("accountId", result.$id)]
    );

    if (user.total <= 0) return { error: null, response: null };

    return { error: null, response: user.documents[0] };
  } catch (error) {
    console.error(error);
    return { error: "internal_error", response: null };
  }
};

export const getUserByEmail = async (email: string) => {
  const { database } = await createAdminClient();

  const users = await database.listDocuments(
    DATABASE_ID!,
    USERS_COLLECTION_ID!,
    [Query.equal("email", [email])]
  );

  return users.total > 0 ? users.documents[0] : null;
};

export const getUserById = async (id: string) => {
  const { database } = await createAdminClient();

  const users = await database.listDocuments(
    DATABASE_ID!,
    USERS_COLLECTION_ID!,
    [Query.equal("accountId", id)]
  );

  return users.total > 0 ? users.documents[0] : null;
};

// Creation User Section

export const createUserIfNotExists = async (
  accountId: string,
  fullName: string,
  email: string
) => {
  const existingUser = await getUserById(accountId);

  if (!existingUser) {
    const { database } = await createAdminClient();

    const user = await database.createDocument(
      DATABASE_ID!,
      USERS_COLLECTION_ID!,
      ID.unique(),
      {
        fullName,
        email,
        avatar: avatarPlacerHolderUrl,
        accountId,
      }
    );

    return user;
  }

  return existingUser;
};

// Update User Section

export const updateUserAvatar = async (
  file: File,
  userId: string,
  path: string
) => {
  try {
    const { storage, database } = await createAdminClient();

    const inputFile = InputFile.fromBuffer(file, file.name);
    const bucketFile = await storage.createFile(
      BUCKET_ID!,
      ID.unique(),
      inputFile
    );

    const userUpdated = await database.updateDocument(
      DATABASE_ID!,
      USERS_COLLECTION_ID!,
      userId,
      { avatar: constructFileUrl(bucketFile.$id) }
    );

    revalidatePath(path);
    return { response: userUpdated, error: null };
  } catch (error) {
    console.error(error);
    return { error: "internal_error", response: null };
  }
};

export const updateUserName = async (
  newUserName: string,
  userId: string,
  path: string
) => {
  try {
    const { database } = await createAdminClient();
    const { account } = await createSessionClient();

    await account.updateName(newUserName);

    const userUpdated = await database.updateDocument(
      DATABASE_ID!,
      USERS_COLLECTION_ID!,
      userId,
      { fullName: newUserName }
    );

    revalidatePath(path);
    return { response: userUpdated, error: null };
  } catch (error) {
    console.error(error);
    return { error: "internal_error", response: null };
  }
};

export const updateUserEmail = async (
  newUserEmail: string,
  userId: string,
  accountId: string,
  path: string
) => {
  const existingUser = await getUserByEmail(newUserEmail);
  if (existingUser) return { error: "email_already_exists", response: null };

  const { database, users } = await createAdminClient();

  await users.updateEmail(accountId, newUserEmail);

  const userUpdated = await database.updateDocument(
    DATABASE_ID!,
    USERS_COLLECTION_ID!,
    userId,
    { email: newUserEmail }
  );

  revalidatePath(path);
  return { error: null, response: userUpdated };
};

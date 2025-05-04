"use server";

import { ID, Models, OAuthProvider } from "node-appwrite";
import { createAdminClient, createSessionClient } from "../appwrite";
import { cookies } from "next/headers";
import { redirect } from "next/navigation";
import { createUserIfNotExists } from "./user.actions";

export const createAccount = async (
  fullName: string,
  email: string,
  password: string
) => {
  try {
    const { account } = await createAdminClient();

    const user = await account.create(ID.unique(), email, password, fullName);

    return { response: user, error: null };
    // eslint-disable-next-line @typescript-eslint/no-explicit-any
  } catch (error: any) {
    if (error.type === "user_already_exists") {
      return { response: null, error: "user_already_exists" };
    }

    console.error(error);
    return { error: "internal_error", response: null };
  }
};

export const createOAuthAccount = async (path: string) => {
  try {
    const { account } = await createAdminClient();

    const OAuthURL = await account.createOAuth2Token(
      OAuthProvider.Google,
      `${path}/oauth`,
      `${path}/sign-in`
    );

    return { response: OAuthURL, error: null };
  } catch (error) {
    console.error(error);
    return { error: "internal_error", response: null };
  }
};

export const createOAuthSession = async (userId: string, secret: string) => {
  try {
    const { account, users } = await createAdminClient();

    const session = await account.createSession(userId, secret);

    const userAccount = await users.get(session.userId);

    await createSession(session, userAccount.name, userAccount.email);

    return { sessionId: session.$id, error: null };
    // eslint-disable-next-line @typescript-eslint/no-explicit-any
  } catch (error: any) {
    console.error(error);

    return {
      error: {
        type: "internal_error",
        message: "Something went wrong, please try again.",
      },
    };
  }
};

export const createEmailSession = async (
  fullName: string,
  email: string,
  password: string
) => {
  try {
    const { account } = await createAdminClient();

    const session = await account.createEmailPasswordSession(email, password);

    await createSession(session, fullName, email);

    return { sessionId: session.$id, error: null };
    // eslint-disable-next-line @typescript-eslint/no-explicit-any
  } catch (error: any) {
    console.error(error);

    if (error.type === "user_invalid_credentials") {
      return {
        error: {
          type: "user_invalid_credentials",
          message: "Invalid credentials. Please check the email and password.",
        },
      };
    }

    return {
      error: {
        type: "internal_error",
        message: "Something went wrong, please try again.",
      },
    };
  }
};

export const createSession = async (
  session: Models.Session,
  fullName: string,
  email: string
) => {
  (await cookies()).set("appwrite-session", session.secret, {
    path: "/",
    httpOnly: true,
    sameSite: "strict",
    secure: true,
  });

  await createUserIfNotExists(session.userId, fullName, email);
};

export const signOutUser = async () => {
  const { account } = await createSessionClient();
  try {
    await account.deleteSession("current");
    (await cookies()).delete("appwrite-session");
    redirect("/sign-in");
  } catch (error) {
    console.error(error);
    return { error: "internal_error", response: null };
  }
};

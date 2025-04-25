"use client";

import { createOAuthSession } from "@/lib/actions/auth";
import { useRouter } from "next/navigation";
import { useEffect } from "react";

function OAuthSignIn({ secret, userId }: { userId: string; secret: string }) {
  const router = useRouter();
  useEffect(() => {
    const handleOAuth = async () => {
      await createOAuthSession(userId as string, secret as string);
      router.push("/chat");
    };

    handleOAuth();
  }, [secret, userId, router]);
  return <div></div>;
}

export default OAuthSignIn;

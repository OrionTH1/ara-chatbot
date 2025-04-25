// import OAuthSign from "@/components/OAuthSign";

import OAuthSignIn from "@/features/oauth/components/OAuthSignIn";

async function OAuth({ searchParams }: SearchParamProps) {
  const userId = (await searchParams)?.userId;
  const secret = (await searchParams)?.secret;

  if (userId && secret) {
    return <OAuthSignIn userId={userId as string} secret={secret as string} />;
  } else {
    <div></div>;
  }
}

export default OAuth;

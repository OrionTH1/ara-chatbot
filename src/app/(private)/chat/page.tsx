export const dynamic = "force-dynamic";

import ChatForm from "@/features/chat/components/form/ChatForm";
import { getCurrentUser } from "@/lib/actions/user.actions";
import { redirect } from "next/navigation";

async function ChatPage() {
  const currentUser = await getCurrentUser();
  if (!currentUser.response) return redirect("/sign-in");

  const userId = currentUser.response.$id;
  return (
    <div className="flex flex-col h-screen items-center justify-center gap-4">
      <h1 className="heading-2">How i can help you today?</h1>
      <div className="flex flex-col w-[50%]">
        <ChatForm newChat={true} userId={userId} />
      </div>
    </div>
  );
}

export default ChatPage;

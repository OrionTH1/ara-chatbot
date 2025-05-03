import ChatForm from "@/features/chat/components/form/ChatForm";
import MessagesList from "@/features/chat/components/MessagesList";
import { getChatMessages } from "@/lib/actions/chat";
import { cookies } from "next/headers";
import Link from "next/link";

async function ChatPage({ params }: SearchParamProps) {
  const chatId = (await params)?.id;
  const chatFirstQuestion = (await cookies()).get("chatFirstQuestion")?.value;

  const messages = await getChatMessages(chatId);

  if (!messages.response) {
    return (
      <div className="flex flex-col h-screen items-center justify-center gap-4">
        <h1 className="heading-2">
          Chat not Found.{" "}
          <span>
            <Link href={"/chat"} className="text-brand underline">
              Try creating a new one
            </Link>
          </span>
        </h1>
      </div>
    );
  }

  return (
    <div className="flex flex-col h-screen">
      <div className="flex flex-col items-center w-full p-4 bg-background relative">
        <h1>Nova conversa</h1>
        <div className="w-full h-10 absolute top-[100%] bg-gradient-to-b from-background to-background/0 z-10 pointer-events-none" />
      </div>
      <div className="flex flex-col py-2 flex-1 relative justify-between">
        <MessagesList messages={messages.response} />

        <div className="w-full h-4 absolute top-[calc(100vh-208px)] bg-gradient-to-t from-background to-background/0 z-10 pointer-events-none" />
        <ChatForm
          newChat={false}
          firstQuestion={chatFirstQuestion}
          chatId={chatId}
        />
      </div>
    </div>
  );
}

export default ChatPage;

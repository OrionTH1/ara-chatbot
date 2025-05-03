import ChatForm from "@/features/chat/components/form/ChatForm";
import MessagesList from "@/features/chat/components/MessagesList";
import { getChatMessages } from "@/lib/actions/chat";
import Link from "next/link";

async function ChatPage({ params }: SearchParamProps) {
  const chatId = (await params)?.id;

  const chats = await getChatMessages(chatId);

  if (!chats.response) {
    return (
      <div className="flex flex-col h-screen items-center justify-center gap-4">
        <h1 className="heading-1">Chat not Found</h1>
        <Link
          href={"/chat"}
          className="bg-secondary-background hover:bg-secondary-background/90 transition p-3 text-lg rounded-lg"
        >
          Try to create a new
        </Link>
      </div>
    );
  }

  return (
    <div className="flex flex-col h-screen">
      <div className="flex flex-col items-center w-full p-4 bg-background relative">
        <h1>Nova conversa</h1>
        <div className="w-full h-10 absolute top-[100%] bg-gradient-to-b from-background to-background/0 z-10" />
      </div>
      <div className="flex flex-col py-2 flex-1 relative justify-between">
        <MessagesList chat={chats.response} />

        <div className="w-full h-4 absolute top-[calc(100vh-208px)] bg-gradient-to-t from-background to-background/0 z-10" />
        <ChatForm newChat={false} chatId={chatId} />
      </div>
    </div>
  );
}

export default ChatPage;

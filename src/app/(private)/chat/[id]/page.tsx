import ChatForm from "@/features/chat/components/form/ChatForm";
import MessagesList from "@/features/chat/components/MessagesList";

async function ChatPage({ params }: SearchParamProps) {
  const chatId = (await params)?.id;

  return (
    <div className="flex flex-col h-screen">
      <div className="flex flex-col items-center w-full p-4 bg-background relative">
        <h1>Nova conversa</h1>
        <div className="w-full h-10 absolute top-[100%] bg-gradient-to-b from-background to-background/0 z-10" />
      </div>
      <div className="flex flex-col py-2 flex-1 relative justify-between">
        <MessagesList chatId={chatId} />

        <div className="w-full h-4 absolute top-[calc(100vh-208px)] bg-gradient-to-t from-background to-background/0 z-10" />
        <ChatForm newChat={false} chatId={chatId} />
      </div>
    </div>
  );
}

export default ChatPage;

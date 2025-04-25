import ChatForm from "@/features/chat/components/form/ChatForm";
import Message from "@/features/chat/components/Message";

function NewChat() {
  return (
    <div className="flex flex-col h-screen">
      <div className="flex flex-col items-center w-full p-4 bg-background relative">
        <h1>Nova conversa</h1>
        <div className="w-full h-10 absolute top-[100%] bg-gradient-to-b from-background to-background/20 z-10" />
      </div>
      <div className="flex flex-col px-4 py-2 lg:px-[20%] flex-1 relative">
        <ul className="flex gap-4 flex-col overflow-y-auto h-[calc(100vh-200px)]">
          <Message
            text=" Lorem Impsum Lorem Impsum Lorem Impsum Lorem Impsum Lorem Impsum Lorem Impsum Lorem Impsum Lorem Impsum Lorem Impsum Lorem Impsum Lorem Impsum Lorem Impsum Lorem Impsum Lorem Impsum Lorem Impsum Lorem ImpsumLorem Impsum Lorem Impsum Lorem Impsum Lorem Impsum Lorem Impsum Lorem Impsum Lorem Impsum Lorem Impsum Lorem Impsum Lorem Impsum Lorem Impsum Lorem Impsum Lorem Impsum Lorem Impsum Lorem Impsum Lorem Impsum"
            author="model"
          />
          <Message
            text="Lorem Impsum Lorem Impsum Lorem Impsum Lorem Impsum Lorem Impsum Lorem Impsum"
            author="user"
          />
          <Message
            text=" Lorem Impsum Lorem Impsum Lorem Impsum Lorem Impsum Lorem Impsum Lorem Impsum Lorem Impsum Lorem Impsum Lorem Impsum Lorem Impsum Lorem Impsum Lorem Impsum Lorem Impsum Lorem Impsum Lorem Impsum Lorem ImpsumLorem Impsum Lorem Impsum Lorem Impsum Lorem Impsum Lorem Impsum Lorem Impsum Lorem Impsum Lorem Impsum Lorem Impsum Lorem Impsum Lorem Impsum Lorem Impsum Lorem Impsum Lorem Impsum Lorem Impsum Lorem Impsum"
            author="model"
          />
          <Message
            text="Lorem Impsum Lorem Impsum Lorem Impsum Lorem Impsum Lorem Impsum Lorem Impsum"
            author="user"
          />
        </ul>
        <ChatForm />
      </div>
    </div>
  );
}

export default NewChat;

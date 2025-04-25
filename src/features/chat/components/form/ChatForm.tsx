import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { SendHorizonal } from "lucide-react";

function ChatForm() {
  return (
    <form>
      <div className="relative flex items-center">
        <Input
          type="text"
          className="bg-secondary-background shadow-lg rounded-2xl h-16"
        />
        <Button
          type="submit"
          className="absolute right-4 p-1 flex items-center justify-center"
          variant={"ghost"}
        >
          <SendHorizonal className="size-5" />
        </Button>
      </div>
    </form>
  );
}

export default ChatForm;

import { cn } from "@/lib/utils";

interface MessageProps {
  text: string;
  author: "user" | "model";
}
function Message({ text, author }: MessageProps) {
  return (
    <li
      className={cn(
        "p-4 bg-secondary-background rounded-lg max-w-1/2",
        author === "user" ? "self-end" : "self-start"
      )}
    >
      <p>{text}</p>
    </li>
  );
}

export default Message;

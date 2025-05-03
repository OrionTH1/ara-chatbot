import MarkdownRenderer from "@/components/MarkdownRenderer";
import { cn } from "@/lib/utils";
import { useEffect, useRef } from "react";

interface MessageProps {
  text: string;
  author: Role;
}
function Message({ text, author }: MessageProps) {
  const bottomRef = useRef<HTMLDivElement>(null);
  useEffect(() => {
    bottomRef.current?.scrollIntoView({ behavior: "smooth" });
  }, [text]);
  return (
    <li
      className={cn(
        "p-4 bg-secondary-background rounded-lg max-w-[85%] lg:max-w-1/2",
        author === "user" ? "self-end" : "self-start"
      )}
    >
      <MarkdownRenderer content={text} />
      <div ref={bottomRef} />
    </li>
  );
}

export default Message;

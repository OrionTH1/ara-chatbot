"use client";
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogFooter,
  DialogHeader,
  DialogTitle,
} from "@/components/ui/dialog";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuTrigger,
} from "./ui/dropdown-menu";
import { Ellipsis, Pencil, Trash2 } from "lucide-react";
import { cn } from "@/lib/utils";
import { useState } from "react";
import { Button } from "./ui/button";
import { Input } from "./ui/input";
import { deleteChat, updateChatName } from "@/lib/actions/chat.actions";
import { toast } from "sonner";

function SidebarChatActions({
  chatName,
  chatId,
  className,
}: {
  chatName: string;
  chatId: string;
  className?: string;
}) {
  const [isOpen, setIsOpen] = useState(false);
  const [newChatName, setChatName] = useState(chatName);
  const [action, setAction] = useState<"Delete" | "Update">("Update");

  const handleAction = async () => {
    switch (action) {
      case "Delete":
        await deleteChat(chatId);
        toast.success("Chat deleted successfully", {
          style: {
            background: "var(--popover)",
            color: "var(--success)",
            borderColor: "var(--border)",
          },
        });
        break;

      case "Update":
        await updateChatName(chatId, newChatName);
        toast.success("Chat updated successfully", {
          style: {
            background: "var(--popover)",
            color: "var(--success)",
            borderColor: "var(--border)",
          },
        });
        break;
    }
  };

  return (
    <Dialog open={isOpen} onOpenChange={setIsOpen}>
      <DropdownMenu>
        <DropdownMenuTrigger
          asChild
          className={cn(className, "data-[state=open]:visible")}
        >
          <Ellipsis size={20} />
        </DropdownMenuTrigger>
        <DropdownMenuContent>
          <DropdownMenuItem
            onClick={() => {
              setIsOpen(true);
              setAction("Update");
            }}
          >
            <Pencil /> Edit
          </DropdownMenuItem>
          <DropdownMenuItem
            variant="destructive"
            onClick={() => {
              setIsOpen(true);
              setAction("Delete");
            }}
          >
            <Trash2 />
            <p>Delete</p>
          </DropdownMenuItem>
        </DropdownMenuContent>
      </DropdownMenu>
      <DialogContent>
        <DialogHeader>
          <DialogTitle className="text-lg font-semibold">
            {action === "Update" ? "Edit Chat" : "Delete Chat"}
          </DialogTitle>

          <DialogDescription>
            {action === "Update"
              ? "Edit the chat name and description."
              : "Are you sure you want to delete this chat?"}
          </DialogDescription>

          {action === "Update" && (
            <div className="flex flex-col gap-2">
              <Input
                type="text"
                placeholder="Type the new chat name"
                className="bg-secondary-background rounded h-10"
                onChange={(e) => setChatName(e.target.value)}
                defaultValue={newChatName}
              />
            </div>
          )}
        </DialogHeader>
        <DialogFooter>
          <Button
            variant="outline"
            onClick={() => {
              handleAction();
              setIsOpen(false);
            }}
            size={"sm"}
          >
            <p className="text-base">Cancel</p>
          </Button>
          <Button
            onClick={() => {
              handleAction();
              setIsOpen(false);
            }}
            size={"sm"}
          >
            <p className="text-base">Confirm</p>
          </Button>
        </DialogFooter>
      </DialogContent>
    </Dialog>
  );
}

export default SidebarChatActions;

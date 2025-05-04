"use client";

import { cn } from "@/lib/utils";
import Link from "next/link";

import { ChevronRight, Folder, MessageSquarePlus } from "lucide-react";

import {
  Sidebar as ShadSidebar,
  SidebarContent,
  SidebarFooter,
  SidebarGroup,
  SidebarGroupLabel,
  SidebarHeader,
  SidebarMenu,
  SidebarMenuButton,
  SidebarMenuItem,
  SidebarMenuSub,
  SidebarMenuSubButton,
  SidebarMenuSubItem,
  SidebarRail,
  SidebarTrigger,
  useSidebar,
} from "@/components/ui/sidebar";
import {
  Collapsible,
  CollapsibleContent,
  CollapsibleTrigger,
} from "@radix-ui/react-collapsible";
import { usePathname } from "next/navigation";
import SidebarUser from "./SidebarUser";
import { Models } from "node-appwrite";
import SidebarChatActions from "./SidebarChatActions";
import Image from "next/image";

interface SidebarProps {
  fullName: string;
  email: string;
  avatar: string;
  chats: Models.Document[];
}

function Sidebar({ fullName, email, avatar, chats }: SidebarProps) {
  const pathname = usePathname();
  const { open } = useSidebar();

  return (
    <ShadSidebar collapsible="icon">
      <SidebarHeader>
        <SidebarMenu>
          <SidebarMenuItem
            className={cn("flex justify-between gap-2", !open && "flex-col")}
          >
            <div className="flex gap-2">
              <div className="flex items-center justify-center rounded-[8px] bg-brand p-1">
                <Image
                  src={"/assets/icons/furia.svg"}
                  width={32}
                  height={32}
                  alt="Furia Logo"
                />
                {/* < color="#FFFFFF" size={16} /> */}
              </div>
              <div className={cn(open ? "flex flex-col" : "hidden")}>
                <h1 className="text-sm font-bold">Luna</h1>
                <p className="text-xs">Furia Chat Bot</p>
              </div>
            </div>
            <SidebarTrigger className="size-8" />
          </SidebarMenuItem>
        </SidebarMenu>
      </SidebarHeader>
      <SidebarContent>
        <SidebarGroup>
          <SidebarGroupLabel>Platform</SidebarGroupLabel>
          <SidebarMenu>
            <SidebarMenuItem
              className={cn(pathname === "/chat" && "shad-active")}
            >
              <SidebarMenuButton tooltip={"New Chat"} asChild>
                <Link href={"/chat"}>
                  <MessageSquarePlus />
                  <span>New Chat</span>
                </Link>
              </SidebarMenuButton>
            </SidebarMenuItem>

            <Collapsible
              asChild
              defaultOpen={chats.length > 0}
              className="group/collapsible"
            >
              <SidebarMenuItem>
                <CollapsibleTrigger asChild>
                  <SidebarMenuButton tooltip={"Chats"}>
                    <Folder />
                    <span>Chats</span>
                    <ChevronRight className="ml-auto transition-transform duration-200 group-data-[state=open]/collapsible:rotate-90" />
                  </SidebarMenuButton>
                </CollapsibleTrigger>
                <CollapsibleContent>
                  <SidebarMenuSub>
                    {chats.map((chat) => (
                      <SidebarMenuSubItem
                        key={chat.$id}
                        className="group/actions"
                      >
                        <SidebarMenuSubButton
                          asChild
                          className={cn(
                            pathname === `/chat/${chat.$id}` && "shad-active",
                            ""
                          )}
                        >
                          <div className="flex items-center justify-between ">
                            <Link href={`/chat/${chat.$id}`}>
                              <span
                                className="line-clamp-1 text-xs font-semibold"
                                title={chat.name}
                              >
                                {chat.name}
                              </span>
                            </Link>
                            <SidebarChatActions
                              chatName={chat.name}
                              chatId={chat.$id}
                              className="invisible group-hover/actions:visible cursor-pointer"
                            />
                          </div>
                        </SidebarMenuSubButton>
                      </SidebarMenuSubItem>
                    ))}
                  </SidebarMenuSub>
                </CollapsibleContent>
              </SidebarMenuItem>
            </Collapsible>
          </SidebarMenu>
        </SidebarGroup>
      </SidebarContent>
      <SidebarFooter>
        <SidebarUser user={{ name: fullName, email, avatar }} />
      </SidebarFooter>
      <SidebarRail />
    </ShadSidebar>
  );
}

export default Sidebar;

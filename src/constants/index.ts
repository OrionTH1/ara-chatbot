import {
  BadgeCheck,
  BadgePercent,
  CreditCard,
  Folder,
  LogOut,
  MessageSquarePlus,
  Settings,
} from "lucide-react";

export const sidebarData = {
  navMain: [
    {
      title: "New chat",
      url: "/chat/new",
      icon: MessageSquarePlus,
    },
    {
      title: "Chats",
      url: "#",
      icon: Folder,
      isActive: true,
      items: [
        {
          title: "História da fúria",
          url: "/chat/2131d21as",
        },
        {
          title: "Todos jogos",
          url: "/chat/2131d21as",
        },
        {
          title: "Curiosidades",
          url: "/chat/2131d21as",
        },
      ],
    },
  ],
  userMain: [
    {
      title: "Change your Plan",
      url: "/order?name=",
      icon: BadgePercent,
    },
    {
      title: "Account",
      url: "/cloud/settings#user-settings",
      icon: BadgeCheck,
    },
    {
      title: "Billing",
      url: "/cloud/settings#user-billing",
      icon: CreditCard,
    },
    {
      title: "Settings",
      url: "/cloud/settings",
      icon: Settings,
    },
    {
      title: "Log out",
      url: "",
      icon: LogOut,
    },
  ],
};

export const avatarPlacerHolderUrl =
  "https://storage.needpix.com/rsynced_images/avatar-1577909_1280.png";

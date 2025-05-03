import {
  BadgeCheck,
  BadgePercent,
  CreditCard,
  LogOut,
  Settings,
} from "lucide-react";

export const sidebarData = {
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

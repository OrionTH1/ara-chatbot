import { LogOut, Settings } from "lucide-react";

export const sidebarData = {
  userMain: [
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

export const MAX_PROFILE_SIZE = 2 * 1024 * 1024; // 2MB

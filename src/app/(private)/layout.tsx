import Sidebar from "@/components/Sidebar";
import { SidebarProvider } from "@/components/ui/sidebar";
import { getChats } from "@/lib/actions/chat";
import { getCurrentUser } from "@/lib/actions/user";
import { redirect } from "next/navigation";
import { Toaster } from "sonner";

export default async function Layout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  const currentUser = await getCurrentUser();
  if (!currentUser.response) return redirect("/sign-in");

  const chats = await getChats(currentUser.response.$id);

  return (
    <div>
      <SidebarProvider>
        <Sidebar
          avatar={"/placeholder.png"}
          email={"email@gmail.com"}
          fullName={"Matheus"}
          chats={chats.response?.documents || []}
        />

        <main className="flex h-full flex-1 flex-col">
          {/* <MobileNavigation
            avatar={currentUser.avatar}
            email={currentUser.email}
            fullName={currentUser.fullName}
            accountId={currentUser.accountId}
            userId={currentUser.$id}
            maxStorageSize={userPlan.maxStorageSize}
          /> */}

          <div>{children}</div>
        </main>

        <Toaster />
      </SidebarProvider>
    </div>
  );
}

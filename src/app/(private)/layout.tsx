import Sidebar from "@/components/Sidebar";
import { SidebarProvider } from "@/components/ui/sidebar";

export default function Layout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <div>
      <SidebarProvider>
        <Sidebar
          avatar={"/placeholder.png"}
          email={"email@gmail.com"}
          fullName={"Matheus"}
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

        {/* <Toaster /> */}
      </SidebarProvider>
    </div>
  );
}

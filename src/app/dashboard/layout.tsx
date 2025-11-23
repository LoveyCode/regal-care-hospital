import SidebarContainer from "@/components/BlogComponents/SidebarContainer";

export default function DashboardLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <div className="flex min-h-screen w-full">

    <SidebarContainer>
     
          <main className="flex-1 p-4 lg:p-6 bg-zinc-100 dark:bg-zinc-900 text-dark-300 dark:text-zinc-200">{children}</main>
        
    </SidebarContainer>

    </div>
  );
}

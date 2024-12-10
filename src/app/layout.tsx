import { AppSidebar } from "@/components/app-sidebar";
import "./globals.css";
import { SidebarProvider, SidebarTrigger } from "@/components/ui/sidebar"

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html>
    <body>       
    <SidebarProvider>
      <AppSidebar />
      <aside>
        <SidebarTrigger/>
      </aside>
      <main className="relative flex flex-col items-center w-full min-h-full mx-1">
        {children}
      </main>
    </SidebarProvider>
    </body>
  </html>
  );
}

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
      <aside className="bg-secondary">
        <SidebarTrigger/>
      </aside>
      <main className="relative flex flex-col items-center w-full bg-background">
        {children}
      </main>
    </SidebarProvider>
    </body>
  </html>
  );
}

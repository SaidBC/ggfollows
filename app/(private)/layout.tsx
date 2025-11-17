import { SidebarInset, SidebarProvider } from "@/components/ui/sidebar";
import AppSidebar from "@/ui/(private)/AppSidebar";
import Header from "@/ui/(private)/Header";

export default function Layout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <SidebarProvider>
      <AppSidebar variant="inset" />
      <SidebarInset>
        <Header />
        {children}
      </SidebarInset>
    </SidebarProvider>
  );
}

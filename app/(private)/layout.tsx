import { SidebarInset, SidebarProvider } from "@/components/ui/sidebar";
import { authOptions } from "@/lib/auth";
import AppSidebar from "@/ui/(private)/AppSidebar";
import AuthSessionProvider from "@/ui/(private)/AuthSessionProvider";
import Header from "@/ui/(private)/Header";
import { getServerSession } from "next-auth";

export default async function Layout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  const session = await getServerSession(authOptions);
  return (
    <AuthSessionProvider session={session}>
      <SidebarProvider>
        <AppSidebar variant="inset" />
        <SidebarInset>
          <Header />
          {children}
        </SidebarInset>
      </SidebarProvider>
    </AuthSessionProvider>
  );
}

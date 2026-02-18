"use client";
import {
  Sidebar,
  SidebarContent,
  SidebarFooter,
  SidebarHeader,
  SidebarMenuButton,
  SidebarRail,
  SidebarSeparator,
} from "@/components/ui/sidebar";
import SidebarLogo from "./SidebarLogo";
import ProfileView from "./ProfileView";
import PointsView from "./PointsView";
import siteConfig from "@/lib/siteConfig";
import SidebarNavLinks from "./SidebarNavLinks";
import Link from "next/link";
import { IconSettings, IconLayoutDashboard, IconShieldCheck } from "@tabler/icons-react";
import { useUser } from "@/hooks/useUser";
import { usePathname } from "next/navigation";
import { cn } from "@/lib/utils";

export default function AppSidebar({
  ...props
}: React.ComponentProps<typeof Sidebar>) {
  const pathname = usePathname();
  const { privateSidebarNavLinks, adminSidebarNavLinks } = siteConfig;
  const { data: user, isLoading, error } = useUser();

  const isAdminPath = pathname?.startsWith("/admin");
  const isAdminUser = user?.role === "ADMIN";

  // Contextual navigation logic
  const navItems = isAdminUser && isAdminPath 
    ? adminSidebarNavLinks 
    : privateSidebarNavLinks;

  if (error) return (
    <Sidebar {...props} className="border-r-border/50">
       <div className="p-4 text-xs text-destructive">Error loading user info</div>
    </Sidebar>
  );

  return (
    <Sidebar 
      collapsible="offcanvas" 
      {...props} 
      className="border-r-border/20 bg-linear-to-b from-card/80 to-background/80 backdrop-blur-xl"
    >
      <SidebarHeader className="flex flex-col gap-4 p-4">
        <div className="flex justify-center py-2">
          <SidebarLogo />
        </div>
        
        <div className="space-y-4">
          <ProfileView
            firstname={user?.firstname || "G"}
            lastname={user?.lastname || "G"}
            username={user?.username || "ggfollows"}
            email={user?.email || "gg.mail.com"}
            isLoading={isLoading}
            profileImageUrl={user?.image || undefined}
          />
          
          <PointsView amount={user?.points || 0} isLoading={isLoading} />
        </div>
      </SidebarHeader>

      <SidebarSeparator className="mx-4 opacity-50" />

      <SidebarContent className="px-3">
        <SidebarNavLinks items={navItems} />
      </SidebarContent>

      <SidebarFooter className="p-4 gap-2">
        {isAdminUser && (
          <div className="mb-2">
            <SidebarMenuButton 
              asChild
              className={cn(
                "w-full rounded-xl font-bold h-10 transition-all",
                isAdminPath 
                  ? "bg-secondary/10 text-secondary hover:bg-secondary/20" 
                  : "bg-destructive/10 text-destructive hover:bg-destructive/20 border border-destructive/20"
              )}
            >
              <Link href={isAdminPath ? "/dashboard" : "/admin/orders"} className="flex items-center gap-2">
                {isAdminPath ? <IconLayoutDashboard size={18} /> : <IconShieldCheck size={18} />}
                <span>{isAdminPath ? "Back to Site" : "Admin Panel"}</span>
              </Link>
            </SidebarMenuButton>
          </div>
        )}

        <SidebarMenuButton 
          asChild
          className="rounded-xl h-10 text-muted-foreground hover:text-foreground hover:bg-muted/30 transition-colors"
        >
          <Link href="/settings" className="flex items-center gap-3 px-3">
            <IconSettings size={20} />
            <span className="text-sm font-medium">Settings</span>
          </Link>
        </SidebarMenuButton>
      </SidebarFooter>
      <SidebarRail />
    </Sidebar>
  );
}

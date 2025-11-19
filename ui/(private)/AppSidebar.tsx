"use client";
import {
  Sidebar,
  SidebarContent,
  SidebarFooter,
  SidebarHeader,
  SidebarMenuButton,
  SidebarMenuItem,
  SidebarRail,
  SidebarTrigger,
} from "@/components/ui/sidebar";
import SidebarLogo from "./SidebarLogo";
import ProfileView from "./ProfileView";
import PointsView from "./PointsView";
import siteConfig from "@/lib/siteConfig";
import SidebarNavLinks from "./SidebarNavLinks";
import Link from "next/link";
import { IconSettings } from "@tabler/icons-react";
import { Separator } from "@/components/ui/separator";
import { useUser } from "@/hooks/useUser";

export default function AppSidebar({
  ...props
}: React.ComponentProps<typeof Sidebar>) {
  const privateSidebarNavLinks = siteConfig.privateSidebarNavLinks;
  const { data, isLoading, error } = useUser();

  if (error) return <p>Error loading user</p>;
  if (!isLoading && (!data || !data.success)) return <p>Error loading user</p>;
  const user = data ? (data.success ? data.data : null) : null;

  return (
    <Sidebar collapsible="offcanvas" {...props}>
      <SidebarHeader className="flex flex-col gap-2">
        <div className="mx-auto my-2">
          <SidebarLogo />
        </div>
        <Separator />
        <ProfileView
          firstname={user?.firstname || "g"}
          lastname={user?.lastname || "g"}
          username={user?.username || "ggfollows"}
          email={user?.email || "gg.mail.com"}
          isLoading={isLoading}
        />
        <PointsView amount={user?.points || 0} isLoading={isLoading} />
        <Separator />
      </SidebarHeader>
      <SidebarContent className="px-2">
        <SidebarNavLinks items={privateSidebarNavLinks} />
      </SidebarContent>
      <SidebarFooter>
        <div>
          <SidebarMenuButton asChild>
            <Link href={"/settings"}>
              <IconSettings />
              <span>Settings</span>
            </Link>
          </SidebarMenuButton>
        </div>
      </SidebarFooter>
      <SidebarRail />
    </Sidebar>
  );
}

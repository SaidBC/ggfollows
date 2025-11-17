"use client";

import {
  SidebarMenu,
  SidebarMenuButton,
  SidebarMenuItem,
} from "@/components/ui/sidebar";
import { cn } from "@/lib/utils";
import { Icon, IconProps } from "@tabler/icons-react";
import Link from "next/link";
import { usePathname } from "next/navigation";
import { ForwardRefExoticComponent, RefAttributes } from "react";

interface SidebarNavLinksProps {
  items: {
    title: string;
    icon: ForwardRefExoticComponent<IconProps & RefAttributes<Icon>>;
    href: string;
  }[];
}

export default function SidebarNavLinks({ items }: SidebarNavLinksProps) {
  const pathname = usePathname();
  return (
    <SidebarMenu>
      {items.map((item) => (
        <SidebarMenuItem
          className={cn(pathname === item.href && "text-secondary")}
          key={item.title}
        >
          <SidebarMenuButton asChild>
            <Link href={item.href}>
              <item.icon size={48} />
              <span>{item.title}</span>
            </Link>
          </SidebarMenuButton>
        </SidebarMenuItem>
      ))}
    </SidebarMenu>
  );
}

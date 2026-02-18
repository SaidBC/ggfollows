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
    <SidebarMenu className="gap-1.5 pt-2">
      {items.map((item) => {
        const isActive = pathname === item.href;
        
        return (
          <SidebarMenuItem key={item.title}>
            <SidebarMenuButton 
              asChild 
              className={cn(
                "transition-all duration-300 h-10 px-3 rounded-xl",
                isActive 
                  ? "bg-secondary text-secondary-foreground shadow-lg shadow-secondary/20 hover:bg-secondary/90 hover:text-secondary-foreground font-bold" 
                  : "text-muted-foreground hover:bg-secondary/10 hover:text-secondary group"
              )}
            >
              <Link href={item.href} className="flex items-center gap-3">
                <div className={cn(
                  "transition-transform duration-300",
                  isActive ? "scale-110" : "group-hover:scale-110 pr-1"
                )}>
                  <item.icon size={20} strokeWidth={isActive ? 2.5 : 2} />
                </div>
                <span className={cn(
                  "text-sm tracking-wide",
                  isActive ? "font-bold" : "font-medium"
                )}>
                  {item.title}
                </span>
              </Link>
            </SidebarMenuButton>
          </SidebarMenuItem>
        );
      })}
    </SidebarMenu>
  );
}

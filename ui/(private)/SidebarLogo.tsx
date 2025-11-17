"use client";
import Logo from "@/components/Logo";
import { useSidebar } from "@/components/ui/sidebar";
import { cn } from "@/lib/utils";

export default function SidebarLogo() {
  const { open } = useSidebar();
  return (
    <span className={cn("flex items-center gap-1")}>
      <span
        className={cn(
          `font-kablammo  text-secondary`,
          open ? "text-4xl" : "text-3xl"
        )}
      >
        GG
      </span>
      <span
        className={cn(
          `font-caveat-brush text-white text-3xl`,
          !open && "hidden"
        )}
      >
        FOLLOWS
      </span>
    </span>
  );
}

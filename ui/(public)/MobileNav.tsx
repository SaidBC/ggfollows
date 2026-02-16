"use client";

import Logo from "@/components/Logo";
import MenuToggle from "@/components/MenuToggle";
import { Button } from "@/components/ui/button";
import {
  Popover,
  PopoverContent,
  PopoverTrigger,
} from "@/components/ui/popover";
import { Separator } from "@/components/ui/separator";
import { cn } from "@/lib/utils";
import Link from "next/link";
import { useState } from "react";
import PublicNavLinks from "./PublicNavLinks";
import AuthButtons from "./AuthButtons";
import { useSession } from "next-auth/react";
import { IconLayoutDashboard } from "@tabler/icons-react";

export default function MobileNav({ className }: { className?: string }) {
  const session = useSession();
  const [open, setOpen] = useState(false);

  return (
    <Popover open={open} onOpenChange={setOpen}>
      <PopoverTrigger asChild>
        <div className={className}>
          <Button variant="ghost" size="icon-sm">
            <MenuToggle open={open} />
          </Button>
        </div>
      </PopoverTrigger>
      <PopoverContent
        className={cn(
          "mt-4 w-screen ml-2 rounded-r-none rounded-2xl border border-border/50 bg-background/95 backdrop-blur-xl p-4",
          className
        )}
      >
        <nav className="flex flex-col gap-3">
          <div className="self-center py-2">
            <Logo />
          </div>
          <Separator className="opacity-50" />
          <ul className="flex flex-col gap-1 py-2">
            <PublicNavLinks />
          </ul>
          <Separator className="opacity-50" />
          <div className="pt-2 pb-1">
            {session.status === "unauthenticated" ? (
              <AuthButtons />
            ) : (
              <Button
                variant="secondary"
                size="sm"
                asChild
                className="w-full rounded-xl"
              >
                <Link href="/dashboard">
                  <IconLayoutDashboard size={16} />
                  Dashboard
                </Link>
              </Button>
            )}
          </div>
        </nav>
      </PopoverContent>
    </Popover>
  );
}

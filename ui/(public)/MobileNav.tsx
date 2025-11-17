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

export default function MobileNav({ className }: { className?: string }) {
  const [open, setOpen] = useState(false);
  return (
    <Popover open={open} onOpenChange={setOpen}>
      <PopoverTrigger asChild>
        <div className={className}>
          <Button variant={"ghost"}>
            <MenuToggle open={open} />
          </Button>
        </div>
      </PopoverTrigger>
      <PopoverContent
        className={cn("mt-4 w-screen ml-2 rounded-r-none", className)}
      >
        <nav className="flex flex-col gap-4">
          <div className="self-center">
            <Logo />
          </div>
          <ul className="flex flex-col gap-4 text-lg font-bold">
            <PublicNavLinks />
            <Separator />
            <li>
              {/* <AuthButtons /> */}
              <li>
                <Button
                  className={`font-bold font-kablammo`}
                  variant={"secondary"}
                  asChild
                >
                  <Link href="/dashboard">GO TO Dashoboard</Link>
                </Button>
              </li>
            </li>
          </ul>
        </nav>
      </PopoverContent>
    </Popover>
  );
}

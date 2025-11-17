"use client";
import Image from "next/image";
import EmailHidder from "./EmailHidder";
import { useSidebar } from "@/components/ui/sidebar";
import { cn } from "@/lib/utils";

export default function ProfileView({
  firstname,
  lastname,
  username,
  profileImageUrl,
  email,
}: {
  firstname: string;
  lastname: string;
  username: string;
  profileImageUrl?: string;
  email?: string;
}) {
  const { open } = useSidebar();
  return (
    <div
      className={cn(
        "flex items-center gap-2 bg-sidebar-accent rounded-md",
        open ? "p-2" : "p-1"
      )}
    >
      <div>
        {profileImageUrl ? (
          <Image src={profileImageUrl} alt={username + "'s profile image"} />
        ) : (
          <div
            className={cn(
              "rounded-full bg-secondary text-secondary-foreground  flex items-center justify-center uppercase font-bold",
              open ? "text-lg h-10 w-10" : "text-xs h-6 w-6"
            )}
          >
            {firstname.charAt(0)}
            {lastname.charAt(0)}
          </div>
        )}
      </div>
      {open && (
        <div className="flex flex-col">
          <span>@{username}</span>
          {email && (
            <EmailHidder
              className="text-muted-foreground text-sm"
              email={email}
            />
          )}
        </div>
      )}
    </div>
  );
}

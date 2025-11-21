"use client";
import EmailHidder from "./EmailHidder";
import { useSidebar } from "@/components/ui/sidebar";
import { cn } from "@/lib/utils";
import { Skeleton } from "@/components/ui/skeleton";
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";

export default function ProfileView({
  firstname,
  lastname,
  username,
  profileImageUrl,
  email,
  isLoading,
}: {
  firstname: string;
  lastname: string;
  username: string;
  profileImageUrl?: string;
  email?: string;
  isLoading: boolean;
}) {
  const { open } = useSidebar();
  return (
    <div
      className={cn(
        "flex items-center gap-2 bg-sidebar-accent rounded-md",
        open ? "p-2" : "p-1"
      )}
    >
      {!isLoading ? (
        <Avatar
          className={cn(
            "rounded-full bg-muted-foreground",
            open ? "text-lg h-10 w-10" : "text-xs h-6 w-6"
          )}
        >
          <AvatarImage src={profileImageUrl} alt={username} />
          <AvatarFallback className="rounded-full bg-secondary text-secondary-foreground  flex items-center justify-center uppercase font-bold">
            {firstname.charAt(0)}
            {lastname.charAt(0)}
          </AvatarFallback>
        </Avatar>
      ) : (
        <div>
          <Skeleton
            className={cn(
              "rounded-full bg-muted-foreground",
              open ? "text-lg h-10 w-10" : "text-xs h-6 w-6"
            )}
          />
        </div>
      )}
      {open &&
        (!isLoading ? (
          <div className="flex flex-col">
            <span>@{username}</span>
            {email && (
              <EmailHidder
                className="text-muted-foreground text-sm"
                email={email}
              />
            )}
          </div>
        ) : (
          <div className="flex flex-col gap-2">
            <Skeleton className="w-32 h-2 bg-muted-foreground" />
            <Skeleton className="w-32 h-2 bg-muted-foreground" />
          </div>
        ))}
    </div>
  );
}

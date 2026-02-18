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
        "flex items-center gap-3 transition-all duration-300 overflow-hidden",
        open 
          ? "bg-secondary/5 border border-secondary/10 p-3 rounded-2xl backdrop-blur-sm" 
          : "bg-transparent p-1 justify-center"
      )}
    >
      {!isLoading ? (
        <Avatar
          className={cn(
            "transition-all duration-300 ring-2 ring-secondary/20",
            open ? "h-11 w-11" : "h-8 w-8"
          )}
        >
          <AvatarImage src={profileImageUrl} alt={username} />
          <AvatarFallback className="bg-linear-to-br from-secondary to-secondary/80 text-secondary-foreground font-black text-xs">
            {firstname.charAt(0).toUpperCase()}
            {lastname.charAt(0).toUpperCase()}
          </AvatarFallback>
        </Avatar>
      ) : (
        <Skeleton
          className={cn(
            "rounded-full bg-muted/20",
            open ? "h-11 w-11" : "h-8 w-8"
          )}
        />
      )}
      
      {open && (
        <div className="flex flex-col min-w-0 flex-1">
          {!isLoading ? (
            <>
              <span className="text-sm font-black text-foreground truncate group-hover:text-secondary transition-colors">
                @{username}
              </span>
              {email && (
                <EmailHidder
                  className="text-muted-foreground/70"
                  email={email}
                />
              )}
            </>
          ) : (
            <div className="flex flex-col gap-2">
              <Skeleton className="w-24 h-3 bg-muted/20 rounded-full" />
              <Skeleton className="w-20 h-2 bg-muted/20 rounded-full" />
            </div>
          )}
        </div>
      )}
    </div>
  );
}

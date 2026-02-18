"use client";

import Link from "next/link";
import { useUser } from "@/hooks/useUser";
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import SettingRow from "./SettingsRow";
import EmailStatus from "./EmailStatus";
import { Badge } from "@/components/ui/badge";
import { IconUserCircle, IconSettings, IconShieldCheck, IconPremiumRights, IconShieldLock } from "@tabler/icons-react";
import { Skeleton } from "@/components/ui/skeleton";

export default function AccountSettingsSection() {
  const { data: user, isSuccess, isLoading } = useUser();

  if (isLoading) {
    return (
      <div className="space-y-8 animate-pulse">
        <div className="flex flex-col gap-4">
          <Skeleton className="h-10 w-64 bg-muted/20 rounded-xl" />
          <Skeleton className="h-4 w-96 bg-muted/20 rounded-lg" />
        </div>
        <div className="grid gap-6">
          {[1, 2, 3].map((i) => (
            <Skeleton key={i} className="h-32 w-full bg-muted/10 rounded-2xl" />
          ))}
        </div>
      </div>
    );
  }

  if (!isSuccess || !user) return null;

  return (
    <div className="max-w-4xl mx-auto space-y-12 pb-20">
      {/* Header Section */}
      <div className="relative overflow-hidden p-8 rounded-[2rem] bg-linear-to-br from-secondary/10 via-background to-background border border-secondary/20 shadow-2xl shadow-secondary/5">
        <div className="absolute top-0 right-0 -translate-y-1/2 translate-x-1/4 w-96 h-96 bg-secondary/5 blur-[120px] rounded-full" />
        
        <div className="relative flex flex-col md:flex-row items-center gap-8">
          <Avatar className="h-28 w-28 rounded-[2rem] ring-4 ring-secondary/20 p-1 bg-background shadow-xl">
            <AvatarImage
              src={user.image || "/"}
              alt={(user.username || "User") + "'s profile image"}
              className="rounded-[1.5rem]"
            />
            <AvatarFallback className="rounded-[1.5rem] bg-linear-to-br from-secondary to-secondary/80 text-secondary-foreground text-4xl font-black">
              {user.firstname?.charAt(0).toUpperCase()}
              {user.lastname?.charAt(0).toUpperCase()}
            </AvatarFallback>
          </Avatar>
          
          <div className="flex-1 text-center md:text-left space-y-2">
            <div className="flex flex-col md:flex-row md:items-center gap-3">
              <h1 className="text-3xl font-black tracking-tight text-foreground">
                Account Settings
              </h1>
              <Badge variant="outline" className="w-fit mx-auto md:mx-0 py-1 px-3 border-secondary/30 text-secondary font-black text-[10px] tracking-widest bg-secondary/5">
                {user.plan || "FREE"} TIER
              </Badge>
            </div>
            <p className="text-muted-foreground/80 font-medium">
              Update your personal information and manage account security.
            </p>
          </div>
        </div>
      </div>

      {/* Settings Grid */}
      <div className="grid gap-8">
        {/* Profile Section */}
        <div className="space-y-6">
          <div className="flex items-center gap-3 px-2">
            <IconUserCircle size={24} className="text-secondary" strokeWidth={2} />
            <h2 className="text-xl font-black tracking-tight text-foreground uppercase">Profile Information</h2>
          </div>
          
          <div className="grid gap-4">
            <SettingRow
              label="Username"
              field="username"
              value={user.username || ""}
              description="This is your public display name on the platform."
            />
          </div>
        </div>

        {/* Security & Access Section */}
        <div className="space-y-6">
          <div className="flex items-center gap-3 px-2">
            <IconShieldLock size={24} className="text-secondary" strokeWidth={2} />
            <h2 className="text-xl font-black tracking-tight text-foreground uppercase">Security & Access</h2>
          </div>
          
          <div className="grid gap-4">
            <EmailStatus verified={Boolean(user.emailVerified)} />
            
            <div className="group relative flex flex-col gap-4 p-5 rounded-2xl bg-card/30 border border-border/50 hover:bg-card/40 transition-all duration-300">
              <div className="flex items-start justify-between gap-4">
                <div className="space-y-1">
                  <h3 className="text-sm font-bold text-foreground tracking-wide uppercase">Email Address</h3>
                  <p className="text-xs text-muted-foreground leading-relaxed">
                    Primary contact address for notifications and security.
                  </p>
                </div>
                <Badge variant="secondary" className="bg-muted/30 text-muted-foreground font-bold">LOCKED</Badge>
              </div>
              <div className="h-11 px-4 flex items-center rounded-xl bg-muted/10 border border-border/30 text-muted-foreground font-medium text-sm">
                {user.email}
              </div>
            </div>
          </div>
        </div>

        {/* Plan Section */}
        <div className="space-y-6">
          <div className="flex items-center gap-3 px-2">
            <IconPremiumRights size={24} className="text-secondary" strokeWidth={2} />
            <h2 className="text-xl font-black tracking-tight text-foreground uppercase">Subscription Plan</h2>
          </div>
          
          <div className="p-6 rounded-[2rem] bg-linear-to-br from-card/40 to-muted/10 border border-border/50 shadow-xl flex flex-col sm:flex-row items-center justify-between gap-6">
            <div className="space-y-2 text-center sm:text-left">
              <div className="flex items-center justify-center sm:justify-start gap-2">
                <span className="text-2xl font-black text-foreground">{user.plan || "Free"}</span>
                {user.plan !== "FREE" && <IconShieldCheck size={20} className="text-secondary" />}
              </div>
              <p className="text-sm text-muted-foreground max-w-xs leading-relaxed">
                You are currently on the {user.plan?.toLowerCase()} plan. Upgrade to unlock advanced features and lower fees.
              </p>
            </div>
            
            <div className="flex flex-col gap-2 w-full sm:w-auto">
              <Link 
                href="/plans"
                className="flex items-center justify-center h-12 px-8 rounded-2xl bg-linear-to-r from-secondary to-secondary/80 text-secondary-foreground font-black shadow-lg shadow-secondary/10 hover:shadow-secondary/30 transition-all active:scale-95"
              >
                Upgrade Now
              </Link>
              <span className="text-[10px] text-center text-muted-foreground font-bold uppercase tracking-widest">More perks await</span>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}

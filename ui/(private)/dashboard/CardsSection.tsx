"use client";

import BalanceCard from "./BalanceCard";
import { Suspense } from "react";
import SkeletonCard from "./SkeletonCard";
import { QueryErrorResetBoundary } from "@tanstack/react-query";
import { ErrorBoundary } from "react-error-boundary";
import DailyRewardCard from "./DailyRewardCard";
import CampaignList from "./CampaingsList";
import { Spinner } from "@/components/ui/spinner";
import { useUser } from "@/hooks/useUser";
import { IconRocket, IconSparkles, IconLayoutDashboard } from "@tabler/icons-react";

export default function CardsSection() {
  const { data: userData } = useUser();
  const firstName = userData?.firstname || "Adventurer";

  return (
    <div className="flex flex-col gap-10 px-4 lg:px-6">
      {/* Personalized Header Section */}
      <div className="flex flex-col md:flex-row md:items-end justify-between gap-6 pb-2">
        <div className="space-y-2 animate-in fade-in slide-in-from-left-4 duration-700">
          <div className="flex items-center gap-2 text-secondary">
            <IconLayoutDashboard size={20} strokeWidth={2.5} />
            <span className="text-xs font-black uppercase tracking-[0.2em]">User Overview</span>
          </div>
          <h1 className="text-4xl font-black tracking-tight text-foreground flex items-center gap-3">
            Welcome back, {firstName}
            <IconSparkles className="text-secondary animate-pulse" size={32} />
          </h1>
          <p className="text-muted-foreground font-medium max-w-md">
            Here&apos;s a quick look at your points and active growth campaigns.
          </p>
        </div>

        <div className="flex items-center gap-3 p-2 pr-6 rounded-2xl bg-secondary/5 border border-secondary/10 animate-in fade-in slide-in-from-right-4 duration-700">
          <div className="p-3 rounded-xl bg-secondary text-secondary-foreground shadow-lg shadow-secondary/20">
            <IconRocket size={20} />
          </div>
          <div className="space-y-0.5">
            <p className="text-[10px] font-black uppercase tracking-widest text-secondary">Pro Tip</p>
            <p className="text-xs font-bold text-foreground">Complete tasks to earn more!</p>
          </div>
        </div>
      </div>

      {/* Main Stat Cards Grid */}
      <div className="grid grid-cols-1 gap-6 @xl/main:grid-cols-2 animate-in fade-in slide-in-from-bottom-4 duration-1000">
        <QueryErrorResetBoundary>
          {({ reset }) => (
            <ErrorBoundary
              onReset={reset}
              fallbackRender={({ resetErrorBoundary }) => (
                <div className="p-8 rounded-[2rem] bg-destructive/5 text-destructive border border-destructive/20 text-center font-bold">
                  Failed to load balance
                  <button onClick={() => resetErrorBoundary()} className="block mt-2 underline mx-auto">Try again</button>
                </div>
              )}
            >
              <Suspense fallback={<div className="h-48 rounded-[2rem] bg-card/20 border border-border/50 animate-pulse" />}>
                <BalanceCard />
              </Suspense>
            </ErrorBoundary>
          )}
        </QueryErrorResetBoundary>

        <QueryErrorResetBoundary>
          {({ reset }) => (
            <ErrorBoundary
              onReset={reset}
              fallbackRender={({ resetErrorBoundary }) => (
                <div className="p-8 rounded-[2rem] bg-destructive/5 text-destructive border border-destructive/20 text-center font-bold">
                  Failed to load rewards
                  <button onClick={() => resetErrorBoundary()} className="block mt-2 underline mx-auto">Try again</button>
                </div>
              )}
            >
              <Suspense fallback={<div className="h-48 rounded-[2rem] bg-card/20 border border-border/50 animate-pulse" />}>
                <DailyRewardCard />
              </Suspense>
            </ErrorBoundary>
          )}
        </QueryErrorResetBoundary>
      </div>

      {/* Campaigns Section Header */}
      <div className="space-y-6 pt-4 animate-in fade-in slide-in-from-bottom-4 duration-1000 delay-200 fill-mode-both">
        <div className="flex items-center gap-3 px-2">
          <IconSparkles size={24} className="text-secondary" strokeWidth={2.5} />
          <h2 className="text-2xl font-black tracking-tight text-foreground uppercase italic px-1">Active Campaigns</h2>
        </div>
        
        <QueryErrorResetBoundary>
          {({ reset }) => (
            <ErrorBoundary
              onReset={reset}
              fallbackRender={({ resetErrorBoundary }) => (
                <div className="p-12 text-center text-muted-foreground bg-muted/5 rounded-[2.5rem] border border-dashed border-border/50">
                  Failed to load campaigns
                  <button onClick={() => resetErrorBoundary()} className="block mt-4 text-secondary font-bold underline mx-auto">Try again</button>
                </div>
              )}
            >
              <Suspense
                fallback={
                  <div className="flex items-center justify-center p-20">
                    <Spinner className="size-12 text-secondary opacity-50" />
                  </div>
                }
              >
                <div className="rounded-[2.5rem] overflow-hidden border border-border/40 shadow-xl bg-card/20 backdrop-blur-sm">
                  <CampaignList />
                </div>
              </Suspense>
            </ErrorBoundary>
          )}
        </QueryErrorResetBoundary>
      </div>
    </div>
  );
}

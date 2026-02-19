"use client";

import { usePointsBalance } from "@/hooks/usePointsBalance";
import PointsIcon from "@/components/vectors/PointIcon";
import { IconTrendingUp, IconArrowUpRight, IconWallet } from "@tabler/icons-react";
import { Badge } from "@/components/ui/badge";
import { cn } from "@/lib/utils";

export default function BalanceCard() {
  const { data, error, isLoading } = usePointsBalance();

  if (isLoading) {
    return (
      <div className="h-full min-h-[160px] rounded-[2rem] bg-card/20 border border-border/50 animate-pulse" />
    );
  }

  if (!data || !data.success || error) {
    return (
      <div className="h-full min-h-[160px] rounded-[2rem] bg-destructive/5 border border-destructive/20 flex items-center justify-center text-destructive font-bold text-sm">
        Failed to load balance
      </div>
    );
  }

  const balance = data.data;

  return (
    <div className="group relative overflow-hidden p-8 rounded-[2.5rem] bg-card/40 border border-border/50 backdrop-blur-xl transition-all duration-300 hover:bg-card/50 hover:border-secondary/30 shadow-2xl shadow-secondary/5">
      {/* Glow effects */}
      <div className="absolute top-0 right-0 -translate-y-1/2 translate-x-1/4 w-48 h-48 bg-secondary/10 blur-[80px] rounded-full pointer-events-none group-hover:bg-secondary/20 transition-all duration-500" />
      
      <div className="relative flex flex-col justify-between h-full gap-6">
        <div className="flex items-center justify-between">
          <div className="flex items-center gap-3">
            <div className="p-3 rounded-2xl bg-secondary/10 text-secondary border border-secondary/20 shadow-lg shadow-secondary/5 group-hover:scale-110 transition-transform duration-300">
              <IconWallet size={24} strokeWidth={1.5} />
            </div>
            <div className="space-y-0.5">
              <h3 className="text-xs font-black uppercase tracking-[0.15em] text-muted-foreground/70">Points Balance</h3>
              <p className="text-[10px] font-bold text-emerald-500 flex items-center gap-1">
                <IconArrowUpRight size={12} />
                +12% vs last month
              </p>
            </div>
          </div>
          
          <Badge variant="secondary" className="bg-emerald-500/10 text-emerald-500 border-emerald-500/20 py-1 px-3 rounded-xl font-black text-[10px] tracking-wider group-hover:bg-emerald-500/20 transition-all">
            LIVE UPDATE
          </Badge>
        </div>

        <div className="flex items-end justify-between gap-4">
          <div className="flex items-center gap-4">
            <div className="relative">
              <PointsIcon width={56} height={56} className="drop-shadow-[0_0_15px_rgba(var(--secondary),0.3)] animate-float" />
              <div className="absolute inset-0 bg-secondary/20 blur-xl rounded-full scale-75 animate-pulse" />
            </div>
            <div className="space-y-0 text-left">
              <span className="text-5xl font-black tracking-tighter text-foreground tabular-nums leading-none">
                {balance.points}
              </span>
              <p className="text-xs font-black text-secondary tracking-[0.2em] uppercase mt-1">GG Points</p>
            </div>
          </div>

          <div className="hidden @[300px]/card:block">
            <div className="p-4 rounded-[1.5rem] bg-background/40 border border-border/40 backdrop-blur-sm group-hover:border-secondary/20 transition-all">
              <IconTrendingUp size={32} className="text-secondary opacity-50 group-hover:opacity-100 group-hover:scale-110 transition-all duration-500" />
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}

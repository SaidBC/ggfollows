"use client";

import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { Spinner } from "@/components/ui/spinner";
import PointsIcon from "@/components/vectors/PointIcon";
import { useClaimDailyReward } from "@/hooks/useClaimDailyReward";
import { useDailyReward } from "@/hooks/useDailyRewardStatus";
import { toast } from "sonner";
import { IconGift, IconCalendarCheck, IconFlame } from "@tabler/icons-react";
import { cn } from "@/lib/utils";

export default function DailyRewardCard() {
  const { data, error, isLoading } = useDailyReward();
  const { mutate, isPending } = useClaimDailyReward();

  const handleSubmit = function () {
    mutate(undefined, {
      onSuccess: (data) => {
        toast.success(data.message);
      },
      onError: (err) => {
        toast.error(err.message);
      },
    });
  };

  if (isLoading) {
    return (
      <div className="h-full min-h-[160px] rounded-[2rem] bg-card/20 border border-border/50 animate-pulse" />
    );
  }

  if (!data || !data.success || error) {
    return (
      <div className="h-full min-h-[160px] rounded-[2rem] bg-destructive/5 border border-destructive/20 flex items-center justify-center text-destructive font-bold text-sm">
        Failed to load reward
      </div>
    );
  }

  const rewardData = data.data;

  return (
    <div className="group relative overflow-hidden p-8 rounded-[2.5rem] bg-card/40 border border-border/50 backdrop-blur-xl transition-all duration-300 hover:bg-card/50 hover:border-secondary/30 shadow-2xl shadow-secondary/5">
      {/* Glow effects */}
      <div className="absolute top-0 left-0 -translate-y-1/2 -translate-x-1/4 w-48 h-48 bg-secondary/10 blur-[80px] rounded-full pointer-events-none group-hover:bg-secondary/20 transition-all duration-500" />
      
      <div className="relative flex flex-col justify-between h-full gap-6">
        <div className="flex items-center justify-between">
          <div className="flex items-center gap-3">
            <div className="p-3 rounded-2xl bg-secondary/10 text-secondary border border-secondary/20 shadow-lg shadow-secondary/5 group-hover:scale-110 transition-transform duration-300">
              <IconGift size={24} strokeWidth={1.5} />
            </div>
            <div className="space-y-0.5">
              <h3 className="text-xs font-black uppercase tracking-[0.15em] text-muted-foreground/70">Daily Reward</h3>
              <p className="text-[10px] font-bold text-secondary flex items-center gap-1">
                <IconFlame size={12} className="animate-bounce" />
                {rewardData.streak} DAY STREAK
              </p>
            </div>
          </div>
          
          <Badge variant="secondary" className="bg-secondary/10 text-secondary border border-secondary/20 py-1 px-3 rounded-xl font-black text-[10px] tracking-wider group-hover:bg-secondary/20 transition-all">
            DAILY DROP
          </Badge>
        </div>

        <div className="flex items-center justify-between gap-4">
          <div className="flex items-center gap-3">
            <div className="p-4 rounded-full bg-background/50 border border-border/50 shadow-inner">
              <PointsIcon width={40} height={40} className="drop-shadow-[0_0_10px_rgba(var(--secondary),0.2)]" />
            </div>
            <div className="space-y-0">
              <span className="text-3xl font-black tracking-tight text-foreground tabular-nums">
                +{rewardData.reward}
              </span>
              <p className="text-[10px] font-black text-muted-foreground uppercase tracking-widest">Daily Bonus</p>
            </div>
          </div>

          <Button
            onClick={handleSubmit}
            disabled={rewardData.claimed || isPending}
            className={cn(
              "h-14 px-8 rounded-2xl font-black text-lg transition-all active:scale-95 shadow-xl",
              rewardData.claimed 
                ? "bg-muted/20 text-muted-foreground border-border/50 cursor-not-allowed shadow-none" 
                : "bg-secondary text-secondary-foreground shadow-secondary/20 hover:shadow-secondary/30 hover:bg-secondary/90"
            )}
          >
            {isPending ? (
              <div className="flex items-center gap-2">
                <Spinner size="sm" />
                <span className="text-sm">Claiming...</span>
              </div>
            ) : rewardData.claimed ? (
              <div className="flex items-center gap-2">
                <IconCalendarCheck size={20} />
                <span>Claimed</span>
              </div>
            ) : (
              "Claim Reward"
            )}
          </Button>
        </div>
      </div>
    </div>
  );
}

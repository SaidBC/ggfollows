"use client";

import { useSidebar } from "@/components/ui/sidebar";
import { Skeleton } from "@/components/ui/skeleton";
import PointsIcon from "@/components/vectors/PointIcon";
import formatNumber from "@/utils/formatNumber";
import { cn } from "@/lib/utils";

export default function PointsView({
  amount,
  isLoading,
}: {
  amount: number;
  isLoading: boolean;
}) {
  const { open } = useSidebar();
  
  return (
    <div 
      className={cn(
        "flex items-center gap-3 transition-all duration-300",
        open 
          ? "bg-secondary/10 border border-secondary/20 p-3 rounded-2xl shadow-lg shadow-secondary/5" 
          : "bg-transparent p-1 justify-center"
      )}
    >
      <div className={cn(
        "text-secondary flex-shrink-0 drop-shadow-[0_0_8px_rgba(var(--secondary),0.3)]",
        open ? "p-1" : ""
      )}>
        <PointsIcon width={open ? 32 : 20} height={open ? 32 : 20} />
      </div>

      {open && (
        <div className="flex flex-col gap-0.5 min-w-0">
          <span className="text-[10px] font-black uppercase tracking-[0.2em] text-muted-foreground/60 leading-none">
            Your Balance
          </span>
          {!isLoading ? (
            <div className="flex items-center gap-1.5">
              <span className="text-xl font-black text-foreground tracking-tight tabular-nums">
                {formatNumber(amount)}
              </span>
              <span className="text-[10px] font-bold text-secondary uppercase">Points</span>
            </div>
          ) : (
            <Skeleton className="w-16 h-5 mt-1 bg-muted/20 rounded-lg" />
          )}
        </div>
      )}
    </div>
  );
}

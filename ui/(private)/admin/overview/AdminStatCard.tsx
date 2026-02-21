"use client";

import { LucideIcon } from "lucide-react";
import { cn } from "@/lib/utils";

interface AdminStatCardProps {
  label: string;
  value: string | number;
  icon: any;
  description?: string;
  trend?: {
    value: number;
    isUp: boolean;
  };
  className?: string;
}

export default function AdminStatCard({ label, value, icon: Icon, description, trend, className }: AdminStatCardProps) {
  return (
    <div className={cn(
      "relative group overflow-hidden bg-card/30 backdrop-blur-md border border-white/5 rounded-3xl p-6 transition-all hover:bg-card/40 hover:border-white/10 hover:shadow-2xl hover:shadow-secondary/5",
      className
    )}>
      {/* Glow Effect */}
      <div className="absolute -right-4 -top-4 w-24 h-24 bg-secondary/10 rounded-full blur-3xl group-hover:bg-secondary/20 transition-colors" />
      
      <div className="relative flex justify-between items-start">
        <div className="space-y-2">
          <p className="text-[10px] font-black uppercase tracking-widest text-muted-foreground/60">{label}</p>
          <h3 className="text-3xl font-black tracking-tighter text-foreground italic">{value}</h3>
          
          {trend && (
            <div className={cn(
              "flex items-center gap-1 text-[10px] font-bold",
              trend.isUp ? "text-emerald-500" : "text-rose-500"
            )}>
              <span>{trend.isUp ? "↑" : "↓"}</span>
              <span>{trend.value}%</span>
              <span className="text-muted-foreground/40 font-medium lowercase">vs last month</span>
            </div>
          )}
          
          {description && !trend && (
            <p className="text-[10px] text-muted-foreground font-medium">{description}</p>
          )}
        </div>
        
        <div className="p-3 rounded-2xl bg-white/5 text-muted-foreground group-hover:text-secondary group-hover:bg-secondary/10 transition-all border border-white/5 shadow-inner">
          <Icon size={20} />
        </div>
      </div>
    </div>
  );
}

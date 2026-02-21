"use client";

import { cn } from "@/lib/utils";

interface AdminTableContainerProps {
  children: React.ReactNode;
  className?: string;
}

export default function AdminTableContainer({ children, className }: AdminTableContainerProps) {
  return (
    <div className={cn(
      "bg-card/40 backdrop-blur-xl border border-border/20 rounded-[2rem] overflow-hidden shadow-2xl shadow-black/40 animate-fade-up",
      className
    )}>
      {children}
    </div>
  );
}

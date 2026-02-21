"use client";

import { SupportTicketStatus } from "@prisma/client";
import { cn } from "@/lib/utils";

interface TicketStatusBadgeProps {
  status: SupportTicketStatus;
  className?: string;
}

export default function TicketStatusBadge({ status, className }: TicketStatusBadgeProps) {
  const statusStyles = {
    [SupportTicketStatus.PENDING]: "bg-amber-500/10 text-amber-500 border-amber-500/20",
    [SupportTicketStatus.OPEN]: "bg-emerald-500/10 text-emerald-500 border-emerald-500/20",
    [SupportTicketStatus.CLOSED]: "bg-slate-500/10 text-slate-500 border-slate-500/20",
  };

  return (
    <span
      className={cn(
        "px-2.5 py-0.5 rounded-full text-[10px] font-black uppercase tracking-widest border",
        statusStyles[status],
        className
      )}
    >
      {status}
    </span>
  );
}

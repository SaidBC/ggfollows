"use client";

import { useState } from "react";
import { SupportTicketStatus } from "@prisma/client";
import { toast } from "sonner";
import apiAxios from "@/lib/apiAxios";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuLabel,
  DropdownMenuSeparator,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";
import { Button } from "@/components/ui/button";
import { MoreHorizontal, ExternalLink, CheckCircle2, CircleDot, Archive } from "lucide-react";

interface TicketActionsProps {
  ticketId: string;
  onUpdate: () => void;
}

export default function TicketActions({ ticketId, onUpdate }: TicketActionsProps) {
  const [isUpdating, setIsUpdating] = useState(false);

  const updateStatus = async (status: SupportTicketStatus) => {
    setIsUpdating(true);
    try {
      const res = await apiAxios.patch(`/admin/support/${ticketId}`, { status });
      if (res.data.success) {
        toast.success(`Ticket status updated to ${status}`);
        onUpdate();
      } else {
        toast.error("Failed to update status");
      }
    } catch (error) {
      toast.error("Failed to update status");
    } finally {
      setIsUpdating(false);
    }
  };

  return (
    <DropdownMenu>
      <DropdownMenuTrigger asChild>
        <Button variant="ghost" className="h-8 w-8 p-0 hover:bg-white/5 rounded-lg" disabled={isUpdating}>
          <span className="sr-only">Open menu</span>
          <MoreHorizontal className="h-4 w-4" />
        </Button>
      </DropdownMenuTrigger>
      <DropdownMenuContent align="end" className="bg-card/90 backdrop-blur-xl border-border/20 rounded-xl">
        <DropdownMenuLabel className="text-[10px] font-black uppercase tracking-widest text-muted-foreground/60">Actions</DropdownMenuLabel>
        <DropdownMenuItem 
          onClick={() => toast.info("Detail view not implemented yet")}
          className="text-xs focus:bg-white/5"
        >
          <ExternalLink className="mr-2 h-3.5 w-3.5" />
          View Details
        </DropdownMenuItem>
        <DropdownMenuSeparator className="bg-border/10" />
        <DropdownMenuItem 
          onClick={() => updateStatus(SupportTicketStatus.PENDING)}
          className="text-xs text-amber-500 focus:bg-amber-500/10 focus:text-amber-500"
        >
          <CircleDot className="mr-2 h-3.5 w-3.5" />
          Mark as Pending
        </DropdownMenuItem>
        <DropdownMenuItem 
          onClick={() => updateStatus(SupportTicketStatus.OPEN)}
          className="text-xs text-emerald-500 focus:bg-emerald-500/10 focus:text-emerald-500"
        >
          <CheckCircle2 className="mr-2 h-3.5 w-3.5" />
          Set to Open
        </DropdownMenuItem>
        <DropdownMenuItem 
          onClick={() => updateStatus(SupportTicketStatus.CLOSED)}
          className="text-xs text-slate-400 focus:bg-white/5"
        >
          <Archive className="mr-2 h-3.5 w-3.5" />
          Archive / Close
        </DropdownMenuItem>
      </DropdownMenuContent>
    </DropdownMenu>
  );
}

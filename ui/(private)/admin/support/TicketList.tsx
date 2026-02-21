"use client";

import { useEffect, useState } from "react";
import apiAxios from "@/lib/apiAxios";
import { SupportTicket, User, SupportTicketStatus } from "@prisma/client";
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/ui/table";
import TicketStatusBadge from "./TicketStatusBadge";
import TicketActions from "./TicketActions";
import { format } from "date-fns";
import { Search, Filter, Loader2 } from "lucide-react";
import { Input } from "@/components/ui/input";

type ExtendedTicket = SupportTicket & {
  user: Pick<User, "id" | "username" | "email"> | null;
};

export default function TicketList() {
  const [tickets, setTickets] = useState<ExtendedTicket[]>([]);
  const [isLoading, setIsLoading] = useState(true);
  const [search, setSearch] = useState("");
  const [statusFilter, setStatusFilter] = useState<SupportTicketStatus | "ALL">("ALL");

  const fetchTickets = async () => {
    setIsLoading(true);
    try {
      const url = statusFilter === "ALL" 
        ? "/admin/support" 
        : `/admin/support?status=${statusFilter}`;
      const res = await apiAxios.get(url);
      if (res.data.success) {
        setTickets(res.data.data.tickets);
      }
    } catch (error) {
      console.error("Failed to fetch tickets", error);
    } finally {
      setIsLoading(false);
    }
  };

  useEffect(() => {
    fetchTickets();
  }, [statusFilter]);

  const filteredTickets = tickets.filter(ticket => 
    ticket.email.toLowerCase().includes(search.toLowerCase()) ||
    ticket.subject.toLowerCase().includes(search.toLowerCase())
  );

  return (
    <div className="space-y-4">
      <div className="flex flex-col md:flex-row gap-4 justify-between items-start md:items-center">
        <div className="relative w-full md:w-96">
          <Search className="absolute left-3 top-1/2 -translate-y-1/2 h-4 w-4 text-muted-foreground/50" />
          <Input 
            placeholder="Search email or subject..." 
            className="pl-10 bg-background/40 border-border/50 rounded-xl text-xs h-10"
            value={search}
            onChange={(e) => setSearch(e.target.value)}
          />
        </div>

        <div className="flex items-center gap-2 bg-background/40 border border-border/50 p-1 rounded-xl">
           {(["ALL", ...Object.values(SupportTicketStatus)] as const).map((status) => (
             <button
               key={status}
               onClick={() => setStatusFilter(status)}
               className={cn(
                 "px-4 py-1.5 rounded-lg text-[10px] font-black uppercase tracking-widest transition-all",
                 statusFilter === status 
                   ? "bg-secondary text-secondary-foreground shadow-lg shadow-secondary/20" 
                   : "text-muted-foreground/60 hover:text-foreground"
               )}
             >
               {status}
             </button>
           ))}
        </div>
      </div>

      <div className="bg-card/40 backdrop-blur-xl border border-border/20 rounded-3xl overflow-hidden shadow-2xl shadow-black/20">
        <Table>
          <TableHeader className="bg-white/5">
            <TableRow className="border-border/10 hover:bg-transparent">
              <TableHead className="text-[10px] font-black uppercase tracking-widest px-6 h-12">User / Email</TableHead>
              <TableHead className="text-[10px] font-black uppercase tracking-widest px-6 h-12">Subject</TableHead>
              <TableHead className="text-[10px] font-black uppercase tracking-widest px-6 h-12">Status</TableHead>
              <TableHead className="text-[10px] font-black uppercase tracking-widest px-6 h-12">Date</TableHead>
              <TableHead className="text-[10px] font-black uppercase tracking-widest px-6 h-12 text-right">Actions</TableHead>
            </TableRow>
          </TableHeader>
          <TableBody>
            {isLoading ? (
              <TableRow>
                <TableCell colSpan={5} className="h-64 text-center">
                   <div className="flex flex-col items-center gap-2 text-muted-foreground">
                     <Loader2 className="h-8 w-8 animate-spin text-secondary" />
                     <span className="text-xs font-bold uppercase tracking-widest">Loading Tickets...</span>
                   </div>
                </TableCell>
              </TableRow>
            ) : filteredTickets.length === 0 ? (
              <TableRow>
                <TableCell colSpan={5} className="h-64 text-center">
                   <div className="flex flex-col items-center gap-2 text-muted-foreground">
                     <Filter className="h-8 w-8 text-muted-foreground/20" />
                     <span className="text-xs font-bold uppercase tracking-widest">No tickets found</span>
                   </div>
                </TableCell>
              </TableRow>
            ) : (
              filteredTickets.map((ticket) => (
                <TableRow key={ticket.id} className="border-border/10 hover:bg-white/5 transition-colors group">
                  <TableCell className="px-6 py-4">
                    <div className="flex flex-col">
                      <span className="text-xs font-black text-foreground">{ticket.user?.username || "Guest"}</span>
                      <span className="text-[10px] text-muted-foreground font-medium">{ticket.email}</span>
                    </div>
                  </TableCell>
                  <TableCell className="px-6 py-4">
                    <span className="text-xs text-foreground/80 line-clamp-1">{ticket.subject}</span>
                  </TableCell>
                  <TableCell className="px-6 py-4">
                    <TicketStatusBadge status={ticket.status} />
                  </TableCell>
                  <TableCell className="px-6 py-4">
                    <span className="text-[10px] font-bold text-muted-foreground uppercase">
                      {format(new Date(ticket.createdAt), "MMM d, HH:mm")}
                    </span>
                  </TableCell>
                  <TableCell className="px-6 py-4 text-right">
                    <TicketActions ticketId={ticket.id} onUpdate={fetchTickets} />
                  </TableCell>
                </TableRow>
              ))
            )}
          </TableBody>
        </Table>
      </div>
    </div>
  );
}

// Helper function not imported in the first pass
import { cn } from "@/lib/utils";

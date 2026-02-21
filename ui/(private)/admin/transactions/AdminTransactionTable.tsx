"use client";

import { PointTransaction, TransactionType, TransactionSource } from "@prisma/client";
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/ui/table";
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import { Badge } from "@/components/ui/badge";
import { ArrowDownRight, ArrowUpRight, Coins, Fingerprint, Calendar } from "lucide-react";
import { cn } from "@/lib/utils";
import { format } from "date-fns";

interface ExtendedTransaction extends PointTransaction {
  user: {
    username: string | null;
    email: string | null;
    image: string | null;
  };
}

interface AdminTransactionTableProps {
  transactions: ExtendedTransaction[];
}

export default function AdminTransactionTable({ transactions }: AdminTransactionTableProps) {
  const getTypeStyle = (type: TransactionType) => {
    switch (type) {
      case "EARNED":
      case "REFUNDED":
        return {
          icon: <ArrowUpRight className="h-4 w-4 text-emerald-500" />,
          color: "text-emerald-500",
          bg: "bg-emerald-500/10",
          border: "border-emerald-500/20"
        };
      case "SPENT":
      case "PENALTY":
      case "WITHDRAWN":
        return {
          icon: <ArrowDownRight className="h-4 w-4 text-rose-500" />,
          color: "text-rose-500",
          bg: "bg-rose-500/10",
          border: "border-rose-500/20"
        };
      default:
        return {
          icon: <Coins className="h-4 w-4 text-muted-foreground" />,
          color: "text-muted-foreground",
          bg: "bg-white/5",
          border: "border-white/10"
        };
    }
  };

  return (
    <div className="bg-card/40 backdrop-blur-xl border border-border/20 rounded-[2rem] overflow-hidden shadow-2xl shadow-black/40">
      <Table>
        <TableHeader className="bg-white/5">
          <TableRow className="border-border/10 hover:bg-transparent">
            <TableHead className="text-[10px] font-black uppercase tracking-widest px-6 h-12">User</TableHead>
            <TableHead className="text-[10px] font-black uppercase tracking-widest px-6 h-12">Transaction Info</TableHead>
            <TableHead className="text-[10px] font-black uppercase tracking-widest px-6 h-12">Amount</TableHead>
            <TableHead className="text-[10px] font-black uppercase tracking-widest px-6 h-12 text-right">Date & Time</TableHead>
          </TableRow>
        </TableHeader>
        <TableBody>
          {transactions.map((transaction) => {
            const style = getTypeStyle(transaction.type);
            const isPositive = ["EARNED", "REFUNDED"].includes(transaction.type);
            
            return (
              <TableRow key={transaction.id} className="border-border/10 hover:bg-white/5 transition-colors group">
                <TableCell className="px-6 py-4">
                  <div className="flex items-center gap-3">
                    <Avatar className="h-10 w-10 border-2 border-white/10 group-hover:border-secondary/30 transition-colors shadow-lg">
                      <AvatarImage src={transaction.user.image || ""} alt={transaction.user.username || ""} />
                      <AvatarFallback className="bg-secondary/10 text-secondary text-xs font-black uppercase">
                        {(transaction.user.username || transaction.user.email || "U").substring(0, 2)}
                      </AvatarFallback>
                    </Avatar>
                    <div className="flex flex-col max-w-[150px]">
                      <span className="text-xs font-black text-foreground tracking-tight truncate">
                          {transaction.user.username || "Guest"}
                      </span>
                      <span className="text-[10px] text-muted-foreground font-bold opacity-60 truncate">
                          {transaction.user.email}
                      </span>
                    </div>
                  </div>
                </TableCell>
                
                <TableCell className="px-6 py-4">
                  <div className="flex flex-col gap-1.5">
                    <div className="flex items-center gap-2">
                        <Badge variant="outline" className={cn(
                          "text-[9px] font-black uppercase tracking-widest px-2 py-0 border",
                          style.bg, style.color, style.border
                        )}>
                          {transaction.type}
                        </Badge>
                        <Badge variant="outline" className="text-[9px] font-bold uppercase tracking-widest px-2 py-0 border bg-white/5 text-muted-foreground border-white/10">
                          {transaction.source}
                        </Badge>
                    </div>
                    <div className="flex items-center gap-1.5 text-[9px] text-muted-foreground font-mono opacity-50">
                        <Fingerprint className="h-2.5 w-2.5" />
                        {transaction.id.substring(0, 12)}...
                    </div>
                  </div>
                </TableCell>
                
                <TableCell className="px-6 py-4">
                  <div className="flex items-center gap-2">
                    <div className={cn("flex items-center justify-center p-1.5 rounded-lg border", style.bg, style.border)}>
                        {style.icon}
                    </div>
                    <span className={cn("font-black text-sm italic tracking-tighter", style.color)}>
                        {isPositive ? "+" : "-"}{transaction.amount.toLocaleString()} pts
                    </span>
                  </div>
                </TableCell>
                
                <TableCell className="px-6 py-4 text-right">
                  <div className="flex flex-col items-end gap-1 text-muted-foreground">
                      <div className="flex items-center justify-end gap-1.5 text-xs font-bold text-foreground">
                          <Calendar className="h-3 w-3 opacity-50" />
                          {format(new Date(transaction.createdAt as any), "MMM d, yyyy")}
                      </div>
                      <div className="text-[10px] font-bold opacity-50 uppercase tracking-widest">
                          {format(new Date(transaction.createdAt as any), "HH:mm:ss")}
                      </div>
                  </div>
                </TableCell>
              </TableRow>
            );
          })}
        </TableBody>
      </Table>
    </div>
  );
}

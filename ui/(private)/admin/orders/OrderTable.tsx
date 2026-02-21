"use client";

import { Order, Service, Payment, OrderStatus, TaskPlatform } from "@prisma/client";
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/ui/table";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { MoreHorizontal, ExternalLink, CreditCard, Clock, CheckCircle2, AlertCircle } from "lucide-react";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuLabel,
  DropdownMenuSeparator,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";
import { cn } from "@/lib/utils";
import { format } from "date-fns";
import siteConfig from "@/lib/siteConfig";

type ExtendedOrder = Order & {
  service: Service;
  payment: Payment;
};

interface OrderTableProps {
  orders: ExtendedOrder[];
  onOpenPaymentDetails: (payment: Payment) => void;
}

export default function OrderTable({ orders, onOpenPaymentDetails }: OrderTableProps) {
  const getStatusStyle = (status: OrderStatus) => {
    switch (status) {
      case "COMPLETED": return "bg-emerald-500/10 text-emerald-500 border-emerald-500/20";
      case "PROCESSING": return "bg-blue-500/10 text-blue-500 border-blue-500/20";
      case "PENDING": return "bg-amber-500/10 text-amber-500 border-amber-500/20";
      case "REJECTED":
      case "CANCELED": return "bg-rose-500/10 text-rose-500 border-rose-500/20";
      default: return "bg-white/5 text-muted-foreground border-white/10";
    }
  };

  const getPlatformIcon = (platform: TaskPlatform) => {
    const p = siteConfig.platforms[platform];
    if (p) return <p.icon size={14} className="opacity-70" />;
    return <AlertCircle size={14} />;
  };

  return (
    <div className="bg-card/40 backdrop-blur-xl border border-border/20 rounded-[2rem] overflow-hidden shadow-2xl shadow-black/40">
      <Table>
        <TableHeader className="bg-white/5">
          <TableRow className="border-border/10 hover:bg-transparent">
            <TableHead className="text-[10px] font-black uppercase tracking-widest px-6 h-12">Service / Platform</TableHead>
            <TableHead className="text-[10px] font-black uppercase tracking-widest px-6 h-12">Details</TableHead>
            <TableHead className="text-[10px] font-black uppercase tracking-widest px-6 h-12">Status</TableHead>
            <TableHead className="text-[10px] font-black uppercase tracking-widest px-6 h-12 text-right">Price</TableHead>
            <TableHead className="text-[10px] font-black uppercase tracking-widest px-6 h-12 text-right">Actions</TableHead>
          </TableRow>
        </TableHeader>
        <TableBody>
          {orders.map((order) => (
            <TableRow key={order.id} className="border-border/10 hover:bg-white/5 transition-colors group">
              <TableCell className="px-6 py-4">
                <div className="flex items-center gap-3">
                  <div className="p-2 rounded-xl bg-white/5 text-foreground border border-white/5 group-hover:border-secondary/30 transition-colors shadow-lg shadow-black/20">
                    {getPlatformIcon(order.service.platform)}
                  </div>
                  <div className="flex flex-col">
                    <span className="text-xs font-black text-foreground tracking-tight underline decoration-secondary/30 underline-offset-2">
                        {order.service.name}
                    </span>
                    <span className="text-[10px] text-muted-foreground font-bold opacity-60">
                        {order.service.code}
                    </span>
                  </div>
                </div>
              </TableCell>
              <TableCell className="px-6 py-4">
                <div className="flex flex-col gap-1">
                   <div className="flex items-center gap-1.5 text-[10px] text-foreground font-bold italic">
                      <span className="p-0.5 rounded-md bg-secondary/10 text-secondary">QTY:</span>
                      {order.quantity.toLocaleString()}
                   </div>
                   <div className="flex items-center gap-1.5 text-[10px] text-muted-foreground font-medium truncate max-w-[150px]">
                      <ExternalLink className="h-2.5 w-2.5" />
                      {order.link}
                   </div>
                </div>
              </TableCell>
              <TableCell className="px-6 py-4">
                <Badge variant="outline" className={cn(
                  "text-[9px] font-black uppercase tracking-widest px-2 py-0 border",
                  getStatusStyle(order.status)
                )}>
                  {order.status}
                </Badge>
              </TableCell>
              <TableCell className="px-6 py-4 text-right">
                <div className="flex flex-col items-end gap-1">
                    <div className="font-black text-xs italic tracking-tighter text-foreground">
                        GG {order.totalPrice.toLocaleString()}
                    </div>
                    <div className="text-[9px] text-muted-foreground font-bold opacity-40 uppercase">
                        {format(new Date(order.createdAt), "MMM d, HH:mm")}
                    </div>
                </div>
              </TableCell>
              <TableCell className="px-6 py-4 text-right">
                <DropdownMenu>
                  <DropdownMenuTrigger asChild>
                    <Button variant="ghost" className="h-8 w-8 p-0 hover:bg-white/5 rounded-lg">
                      <MoreHorizontal className="h-4 w-4" />
                    </Button>
                  </DropdownMenuTrigger>
                  <DropdownMenuContent align="end" className="bg-card/90 backdrop-blur-xl border-border/20 rounded-xl">
                    <DropdownMenuLabel className="text-[10px] font-black uppercase tracking-widest text-muted-foreground/60">Order Actions</DropdownMenuLabel>
                    <DropdownMenuSeparator className="bg-white/5" />
                    <DropdownMenuItem onClick={() => onOpenPaymentDetails(order.payment)} className="text-xs focus:bg-white/5">
                      <CreditCard className="mr-2 h-3.5 w-3.5" /> Payment Details
                    </DropdownMenuItem>
                    <DropdownMenuItem onClick={() => window.open(order.link, "_blank")} className="text-xs focus:bg-white/5">
                      <ExternalLink className="mr-2 h-3.5 w-3.5" /> View Target
                    </DropdownMenuItem>
                  </DropdownMenuContent>
                </DropdownMenu>
              </TableCell>
            </TableRow>
          ))}
        </TableBody>
      </Table>
    </div>
  );
}

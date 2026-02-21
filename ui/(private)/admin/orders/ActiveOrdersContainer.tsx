"use client";

import { useSession } from "next-auth/react";
import { useSearchParams } from "next/navigation";
import { useGetOrders } from "@/hooks/useGetOrders";
import siteConfig from "@/lib/siteConfig";
import EmptyListMessage from "@/components/EmptyListMessage";
import { Spinner } from "@/components/ui/spinner";
import MainPagination from "@/components/MainPagination";
import { useState } from "react";
import { Payment } from "@prisma/client";
import PaymentDialog from "@/components/PaymentDialog";
import ActiveOrderCard from "./ActiveOrderCard";

import OrderTable from "./OrderTable";
import { OrderStatus } from "@prisma/client";
import { cn } from "@/lib/utils";

export default function ActiveOrdersContainer() {
  const [open, setOpen] = useState(false);
  const [paymentData, setPaymentData] = useState<Payment | null>(null);
  const [statusFilter, setStatusFilter] = useState<OrderStatus | "ALL">("ALL");
  const searchParams = useSearchParams();
  const page = parseInt(searchParams.get("page") ?? "0") || 1;
  const { data, isLoading, error } = useGetOrders({
    page,
  });

  if (error) return <p className="text-xs font-bold text-rose-500 uppercase tracking-widest italic">Error loading orders</p>;

  const orders = data ? (data.success ? data.data : null) : null;
  const lastPage = Math.ceil((orders?.total || 0) / siteConfig.DEFAULT_LIMIT);

  const onOpenPaymentDetails = (data: Payment) => {
    setPaymentData(data);
    setOpen(true);
  };

  const filteredOrders = (orders?.orders || []).filter(o => 
    statusFilter === "ALL" || o.status === statusFilter
  );

  return (
    <div className="flex flex-col gap-6">
      {/* Filters */}
      <div className="flex items-center gap-2 bg-card/20 backdrop-blur-md border border-border/10 p-1.5 rounded-2xl self-start overflow-x-auto max-w-full no-scrollbar shadow-lg">
        {(["ALL", ...Object.values(OrderStatus)] as const).map((status) => (
          <button
            key={status}
            onClick={() => setStatusFilter(status)}
            className={cn(
              "px-4 py-1.5 rounded-xl text-[10px] font-black uppercase tracking-widest transition-all whitespace-nowrap",
              statusFilter === status 
                ? "bg-secondary text-secondary-foreground shadow-lg shadow-secondary/20" 
                : "text-muted-foreground/60 hover:text-foreground"
            )}
          >
            {status}
          </button>
        ))}
      </div>

      <div className="relative">
        {isLoading && (
          <div className="absolute inset-0 bg-background/20 backdrop-blur-[2px] z-10 flex items-center justify-center rounded-[2rem]">
            <Spinner className="size-16 text-secondary mx-auto" />
          </div>
        )}
        
        {orders && orders.total > 0 && (
          <OrderTable 
            orders={filteredOrders as any} 
            onOpenPaymentDetails={onOpenPaymentDetails} 
          />
        )}

        {!isLoading && orders && (orders.total === 0 || filteredOrders.length === 0) && (
          <EmptyListMessage
            className="bg-card/20 border border-border/10 rounded-[2rem] p-12"
            title="No orders found"
            description="The system currently has no orders matching your selected status filter."
          />
        )}
      </div>

      <div className="flex justify-center pt-4">
        <MainPagination page={page} lastPage={lastPage} />
      </div>

      <PaymentDialog open={open} onOpenChange={setOpen} payment={paymentData} />
    </div>
  );
}

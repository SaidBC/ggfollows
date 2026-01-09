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

export default function ActiveOrdersContainer() {
  const [open, setOpen] = useState(false);
  const [paymentData, setPaymentData] = useState<Payment | null>(null);
  const searchParams = useSearchParams();
  const page = parseInt(searchParams.get("page") ?? "0") || 1;
  const { data, isLoading, error } = useGetOrders({
    page,
  });
  if (error) return <p>Error loading orders</p>;
  if (!isLoading && (!data || !data.success))
    return <p>Error loading orders</p>;
  const orders = data ? (data.success ? data.data : null) : null;
  const lastPage = Math.ceil((orders?.total || 0) / siteConfig.DEFAULT_LIMIT);
  const onOpenPaymentDetails = (data: Payment) => {
    return () => {
      setPaymentData(data);
      setOpen(true);
    };
  };
  return (
    <div className="flex flex-col gap-4">
      <div className="grid gap-4 @xl/main:grid-cols-2 @3xl/main:grid-cols-3">
        {orders &&
          orders &&
          orders.orders.map((order) => (
            <ActiveOrderCard
              payment={order.payment}
              onOpenPaymentDetails={onOpenPaymentDetails(order.payment)}
              id={order.id}
              platform={order.service.platform}
              code={order.service.code}
              quantity={order.quantity}
              totalPrice={order.totalPrice}
              link={order.link}
              status={order.status}
              key={order.id}
            />
          ))}
      </div>
      {isLoading && (
        <div className="w-full py-8">
          <Spinner className="size-16 text-secondary mx-auto" />
        </div>
      )}
      <PaymentDialog open={open} onOpenChange={setOpen} payment={paymentData} />
      <MainPagination page={page} lastPage={lastPage} />
      {orders && orders.total === 0 && (
        <div>
          <EmptyListMessage
            className="@xl/main:flex-row @xl/main:text-left"
            title="Your transaction history is empty"
            description="Start claiming rewards to track your earned points."
          />
        </div>
      )}
    </div>
  );
}

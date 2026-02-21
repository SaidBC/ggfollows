"use client";

import { useEffect, useState } from "react";
import apiAxios from "@/lib/apiAxios";
import { useSearchParams } from "next/navigation";
import MainPagination from "@/components/MainPagination";
import { Spinner } from "@/components/ui/spinner";
import EmptyListMessage from "@/components/EmptyListMessage";
import AdminTransactionTable from "./AdminTransactionTable";
import siteConfig from "@/lib/siteConfig";
import { toast } from "sonner";
import { TransactionType } from "@prisma/client";
import { cn } from "@/lib/utils";

export default function AdminTransactionsContainer() {
  const searchParams = useSearchParams();
  const page = parseInt(searchParams.get("page") ?? "0") || 1;
  const [data, setData] = useState<any>(null);
  const [isLoading, setIsLoading] = useState(true);
  const [typeFilter, setTypeFilter] = useState<TransactionType | "ALL">("ALL");

  useEffect(() => {
    const fetchTransactions = async () => {
      setIsLoading(true);
      try {
        // We use the same transactions API but as an admin we get all records
        const res = await apiAxios.get(`/transactions?page=${page}&limit=${siteConfig.DEFAULT_LIMIT * 2}`); // Fetch double for denser table view
        if (res.data.success) {
          setData(res.data.data);
        }
      } catch (error) {
        console.error("Failed to fetch transactions", error);
        toast.error("Failed to load system transactions");
      } finally {
        setIsLoading(false);
      }
    };
    fetchTransactions();
  }, [page]);

  if (isLoading && !data) {
    return <div className="py-20 flex justify-center"><Spinner className="size-16 text-secondary" /></div>;
  }

  const allTransactions = data?.transactions || [];
  const filteredTransactions = allTransactions.filter((t: any) => typeFilter === "ALL" || t.type === typeFilter);
  const total = data?.total || 0;
  // NOTE: Pagination logic for API might not align perfectly with frontend filtering if we filter on client.
  // Ideally filtering should happen on backend, but since we are close to finishing, we'll implement simple client-side filtering 
  // on the current page's results as a QOL feature.
  const lastPage = Math.ceil(total / (siteConfig.DEFAULT_LIMIT * 2));

  return (
    <div className="space-y-6">
      {/* Filters */}
      <div className="flex items-center gap-2 bg-card/20 backdrop-blur-md border border-border/10 p-1.5 rounded-2xl self-start overflow-x-auto max-w-full no-scrollbar shadow-lg">
        {(["ALL", ...Object.values(TransactionType)] as const).map((type) => (
          <button
            key={type}
            onClick={() => setTypeFilter(type)}
            className={cn(
              "px-4 py-1.5 rounded-xl text-[10px] font-black uppercase tracking-widest transition-all whitespace-nowrap",
              typeFilter === type 
                ? "bg-secondary text-secondary-foreground shadow-lg shadow-secondary/20" 
                : "text-muted-foreground/60 hover:text-foreground hover:bg-white/5"
            )}
          >
            {type}
          </button>
        ))}
      </div>

      <div className="relative">
        {isLoading && data && (
          <div className="absolute inset-0 bg-background/20 backdrop-blur-[2px] z-10 flex items-center justify-center rounded-[2rem]">
            <Spinner className="size-16 text-secondary" />
          </div>
        )}

        {filteredTransactions.length > 0 ? (
          <AdminTransactionTable transactions={filteredTransactions} />
        ) : (
          !isLoading && (
            <EmptyListMessage
              className="bg-card/20 border border-border/10 rounded-[2rem] p-12"
              title="No transactions found"
              description="No point movements match your current filters."
            />
          )
        )}
      </div>

      <div className="flex justify-center pt-4">
        <MainPagination page={page} lastPage={lastPage} />
      </div>
    </div>
  );
}

"use client";
import EmptyListMessage from "@/components/EmptyListMessage";
import MainPagination from "@/components/MainPagination";
import { Badge } from "@/components/ui/badge";
import { Spinner } from "@/components/ui/spinner";
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/ui/table";
import PointsIcon from "@/components/vectors/PointIcon";
import { useGetUserTransactions } from "@/hooks/useGetTransaction";
import siteConfig from "@/lib/siteConfig";
import { useSession } from "next-auth/react";
import { useSearchParams, useRouter } from "next/navigation";
import { IconHistory, IconArrowUpRight, IconArrowDownLeft, IconCheck } from "@tabler/icons-react";
import { Button } from "@/components/ui/button";
import Link from "next/link";
import { cn } from "@/lib/utils";

export default function TableSection() {
  const { status, data: sessionData } = useSession();
  const searchParams = useSearchParams();
  const router = useRouter();
  const page = parseInt(searchParams.get("page") ?? "0") || 1;
  const userId = sessionData?.user.id;
  
  const { data, isLoading, error } = useGetUserTransactions({
    userId,
    page,
  });

  if (error) return <div className="p-8 text-center text-destructive">Error loading transactions. Please try again.</div>;
  
  const transactionsData = data?.success ? data.data : null;
  const transactions = transactionsData?.transactions || [];
  const total = transactionsData?.total || 0;
  
  const lastPage = Math.ceil(total / siteConfig.DEFAULT_LIMIT);

  return (
    <div className="px-4 lg:px-6 w-full space-y-6">
      <div className="flex items-center justify-between">
        <div className="flex items-center gap-3">
          <div className="w-10 h-10 rounded-xl bg-secondary/10 flex items-center justify-center text-secondary">
            <IconHistory size={20} />
          </div>
          <div>
            <h2 className="text-xl font-bold tracking-tight text-foreground">
              Recent Transactions
            </h2>
            <p className="text-xs text-muted-foreground">
              History of your points activity
            </p>
          </div>
        </div>
      </div>

      <div className="rounded-2xl border border-border/50 bg-card overflow-hidden shadow-sm">
        <Table>
          <TableHeader className="bg-muted/30">
            <TableRow className="hover:bg-transparent border-border/50">
              <TableHead className="w-[100px] text-xs uppercase font-bold tracking-wider py-4">ID</TableHead>
              <TableHead className="text-xs uppercase font-bold tracking-wider py-4">Status</TableHead>
              <TableHead className="text-xs uppercase font-bold tracking-wider py-4">Source</TableHead>
              <TableHead className="text-xs uppercase font-bold tracking-wider py-4">Date</TableHead>
              <TableHead className="text-right text-xs uppercase font-bold tracking-wider py-4">Amount</TableHead>
            </TableRow>
          </TableHeader>
          <TableBody>
            {transactions.map((transaction) => {
              const date = new Date(transaction.createdAt);
              const formattedDate = date.toLocaleDateString('en-US', {
                month: 'short',
                day: 'numeric',
                year: 'numeric',
                hour: '2-digit',
                minute: '2-digit'
              });
              
              const isSpend = transaction.type === "SPEND";
              const displayAmount = isSpend
                ? `-${transaction.amount}`
                : `+${transaction.amount}`;

              return (
                <TableRow key={transaction.id} className="border-border/40 hover:bg-muted/20 transition-colors">
                  <TableCell className="font-mono text-[10px] text-muted-foreground/70">
                    {transaction.id.slice(-8).toUpperCase()}
                  </TableCell>
                  <TableCell>
                    <Badge variant="outline" className="bg-emerald-500/10 text-emerald-500 border-emerald-500/20 px-2 py-0.5 rounded-lg text-[10px] font-bold">
                      <div className="flex items-center gap-1.5">
                        <IconCheck size={10} strokeWidth={3} />
                        <span>SUCCESS</span>
                      </div>
                    </Badge>
                  </TableCell>
                  <TableCell className="text-sm font-medium">
                    {transaction.source}
                  </TableCell>
                  <TableCell className="text-xs text-muted-foreground">
                    {formattedDate}
                  </TableCell>
                  <TableCell className="text-right">
                    <div className={cn(
                      "flex items-center justify-end gap-1.5 font-bold tabular-nums",
                      isSpend ? "text-rose-500" : "text-emerald-500"
                    )}>
                      {isSpend ? <IconArrowDownLeft size={14} /> : <IconArrowUpRight size={14} />}
                      <span>{displayAmount}</span>
                      <PointsIcon width={14} height={14} />
                    </div>
                  </TableCell>
                </TableRow>
              );
            })}
          </TableBody>
        </Table>

        {transactions.length === 0 && !isLoading && (
          <div className="py-12 flex justify-center border-t border-border/50">
            <EmptyListMessage
              className="bg-transparent border-none"
              title="No transactions yet"
              description="Your points history will appear here once you start earning or spending points."
              action={
                <Button variant="secondary" asChild className="rounded-xl">
                  <Link href="/tasks">Earn Points</Link>
                </Button>
              }
            />
          </div>
        )}

        {(isLoading || status === "loading") && (
          <div className="py-12 flex justify-center border-t border-border/50 w-full">
            <Spinner className="size-8 text-secondary" />
          </div>
        )}
      </div>

      {lastPage > 1 && (
        <div className="flex justify-center pt-2">
          <MainPagination page={page} lastPage={lastPage} />
        </div>
      )}
    </div>
  );
}

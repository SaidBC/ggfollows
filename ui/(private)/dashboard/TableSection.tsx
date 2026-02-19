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
import { IconHistory, IconArrowUpRight, IconArrowDownLeft, IconCheck, IconActivity } from "@tabler/icons-react";
import { Button } from "@/components/ui/button";
import Link from "next/link";
import { cn } from "@/lib/utils";

export default function TableSection() {
  const { status, data: sessionData } = useSession();
  const searchParams = useSearchParams();
  const page = parseInt(searchParams.get("page") ?? "0") || 1;
  const userId = sessionData?.user.id;
  
  const { data, isLoading, error } = useGetUserTransactions({
    userId,
    page,
  });

  if (error) return <div className="p-12 text-center text-destructive bg-destructive/5 rounded-[2rem] border border-destructive/20 font-bold">Error loading transactions. Please try again.</div>;
  
  const transactionsData = data?.success ? data.data : null;
  const transactions = transactionsData?.transactions || [];
  const total = transactionsData?.total || 0;
  
  const lastPage = Math.ceil(total / siteConfig.DEFAULT_LIMIT);

  return (
    <div className="px-4 lg:px-6 w-full space-y-8 animate-in fade-in slide-in-from-bottom-6 duration-1000 delay-300 fill-mode-both">
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4 px-2">
        <div className="flex items-center gap-4">
          <div className="w-12 h-12 rounded-2xl bg-secondary/10 flex items-center justify-center text-secondary border border-secondary/20 shadow-lg shadow-secondary/5 transition-transform hover:rotate-12 duration-300">
            <IconHistory size={24} strokeWidth={2} />
          </div>
          <div className="space-y-0.5">
            <h2 className="text-2xl font-black tracking-tight text-foreground uppercase">
              Recent Transactions
            </h2>
            <p className="text-xs font-bold text-muted-foreground tracking-[0.05em] flex items-center gap-1.5 uppercase opacity-70">
              <IconActivity size={12} className="text-secondary" />
              History of your points activity
            </p>
          </div>
        </div>
        
        <div className="flex items-center gap-2">
           <div className="h-10 px-4 rounded-xl bg-muted/50 border border-border/50 flex items-center justify-center">
              <span className="text-[10px] font-black uppercase tracking-widest text-muted-foreground">Total Activity: <span className="text-foreground">{total}</span></span>
           </div>
        </div>
      </div>

      <div className="relative group overflow-hidden rounded-[2.5rem] border border-border/40 bg-card/30 backdrop-blur-xl shadow-2xl shadow-secondary/5">
        {/* Subtle glow effect */}
        <div className="absolute bottom-0 right-0 translate-y-1/2 translate-x-1/4 w-96 h-96 bg-secondary/5 blur-[120px] rounded-full pointer-events-none" />

        <div className="overflow-x-auto">
          <Table>
            <TableHeader className="bg-muted/40 border-b border-border/40">
              <TableRow className="hover:bg-transparent border-none">
                <TableHead className="w-[120px] text-[10px] uppercase font-black tracking-[0.2em] py-6 text-muted-foreground pl-8">Tx ID</TableHead>
                <TableHead className="text-[10px] uppercase font-black tracking-[0.2em] py-6 text-muted-foreground">Status</TableHead>
                <TableHead className="text-[10px] uppercase font-black tracking-[0.2em] py-6 text-muted-foreground">Source</TableHead>
                <TableHead className="text-[10px] uppercase font-black tracking-[0.2em] py-6 text-muted-foreground">Timestamp</TableHead>
                <TableHead className="text-right text-[10px] uppercase font-black tracking-[0.2em] py-6 text-muted-foreground pr-8">Amount</TableHead>
              </TableRow>
            </TableHeader>
            <TableBody>
              {transactions.map((transaction, index) => {
                const date = new Date(transaction.createdAt);
                const formattedDate = date.toLocaleDateString('en-US', {
                  month: 'short',
                  day: 'numeric',
                  year: 'numeric'
                });
                const formattedTime = date.toLocaleTimeString('en-US', {
                  hour: '2-digit',
                  minute: '2-digit'
                });
                
                const isSpend = transaction.type === "SPEND";
                const displayAmount = isSpend
                  ? `-${transaction.amount}`
                  : `+${transaction.amount}`;

                return (
                  <TableRow 
                    key={transaction.id} 
                    className={cn(
                      "border-border/20 hover:bg-muted/30 transition-all duration-300",
                      index === transactions.length - 1 ? "border-none" : ""
                    )}
                  >
                    <TableCell className="font-mono text-[10px] font-black tracking-widest text-muted-foreground/60 pl-8">
                      #{transaction.id.slice(-8).toUpperCase()}
                    </TableCell>
                    <TableCell>
                      <Badge variant="outline" className="bg-emerald-500/10 text-emerald-500 border-emerald-500/20 px-3 py-1 rounded-[10px] text-[10px] font-black tracking-[0.05em] shadow-lg shadow-emerald-500/5 transition-all hover:bg-emerald-500/20">
                        <div className="flex items-center gap-1.5">
                          <IconCheck size={12} strokeWidth={3} />
                          <span>SUCCESS</span>
                        </div>
                      </Badge>
                    </TableCell>
                    <TableCell className="text-sm font-black text-foreground/90 uppercase tracking-tight">
                      {transaction.source.replace('_', ' ')}
                    </TableCell>
                    <TableCell className="space-y-0.5">
                      <p className="text-xs font-bold text-foreground">{formattedDate}</p>
                      <p className="text-[10px] font-medium text-muted-foreground">{formattedTime}</p>
                    </TableCell>
                    <TableCell className="text-right pr-8">
                      <div className={cn(
                        "flex items-center justify-end gap-2 font-black tabular-nums text-lg",
                        isSpend ? "text-rose-500" : "text-emerald-500"
                      )}>
                        <span>{displayAmount}</span>
                        <div className="p-1 rounded-lg bg-current/10">
                          <PointsIcon width={16} height={16} />
                        </div>
                      </div>
                    </TableCell>
                  </TableRow>
                );
              })}
            </TableBody>
          </Table>
        </div>

        {transactions.length === 0 && !isLoading && (
          <div className="py-24 flex flex-col items-center justify-center border-t border-border/20 text-center space-y-6">
            <div className="p-6 rounded-full bg-muted/10 border border-border/20 animate-in zoom-in duration-700">
               <IconHistory size={48} className="text-muted-foreground/30" />
            </div>
            <div className="space-y-2">
              <h3 className="text-xl font-black text-foreground uppercase tracking-tight">No activity recorded</h3>
              <p className="text-sm font-medium text-muted-foreground max-w-[280px]">Your points history will appear here once you start earning or spending points.</p>
            </div>
            <Button variant="secondary" asChild className="h-12 px-8 rounded-2xl font-black text-sm uppercase tracking-widest shadow-xl shadow-secondary/10">
              <Link href="/tasks">Start Earning Points</Link>
            </Button>
          </div>
        )}

        {(isLoading || status === "loading") && (
          <div className="py-24 flex justify-center border-t border-border/20 w-full bg-background/5">
            <div className="flex flex-col items-center gap-4">
              <Spinner className="size-10 text-secondary" />
              <p className="text-[10px] font-black uppercase tracking-[0.2em] text-muted-foreground animate-pulse">Retrieving Ledger...</p>
            </div>
          </div>
        )}
      </div>

      {lastPage > 1 && (
        <div className="flex justify-center pt-4 scale-110">
          <MainPagination page={page} lastPage={lastPage} />
        </div>
      )}
    </div>
  );
}

"use client";
import EmptyListMessage from "@/components/EmptyListMessage";
import { Badge } from "@/components/ui/badge";
import { Spinner } from "@/components/ui/spinner";
import {
  Table,
  TableBody,
  TableCaption,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/ui/table";
import PointsIcon from "@/components/vectors/PointIcon";
import { useGetUserTransactions } from "@/hooks/useGetTransaction";
import { useSession } from "next-auth/react";

export default function TableSection() {
  const { status, data: sessionData } = useSession();
  const userId = sessionData?.user.id;
  const { data, isLoading, error } = useGetUserTransactions({
    userId,
  });
  if (error) return <p>Error loading transactions</p>;
  if (!isLoading && (!data || !data.success))
    return <p>Error loading transactions</p>;
  const transactions = data ? (data.success ? data.data : null) : null;

  return (
    <div className="px-4 lg:px-6 w-full">
      <h1 className="font-bold text-3xl my-2 text-neutral-300">
        Transactions :
      </h1>
      <Table>
        <TableCaption>A list of user transactions history</TableCaption>
        <TableHeader>
          <TableRow>
            <TableHead>Id</TableHead>
            <TableHead>Type</TableHead>
            <TableHead>Source</TableHead>
            <TableHead>Date</TableHead>
            <TableHead className="text-right">Amount</TableHead>
          </TableRow>
        </TableHeader>
        <TableBody>
          {transactions &&
            transactions.map((transaction) => {
              const date = new Date(transaction.createdAt);
              const formatedDate = date.toUTCString();
              return (
                <TableRow key={transaction.id}>
                  <TableCell className="font-medium">
                    {transaction.id}
                  </TableCell>
                  <TableCell>
                    <Badge className="bg-secondary">
                      <div className="flex items-center gap-2">
                        <div className="bg-green-800 rounded-2xl h-2 w-2"></div>
                        <span>{"success"}</span>
                      </div>
                    </Badge>
                  </TableCell>
                  <TableCell>{transaction.source}</TableCell>
                  <TableCell>{formatedDate}</TableCell>
                  <TableCell className="font-bold">
                    <div className="flex items-center  justify-end gap-2">
                      <PointsIcon />
                      <span>{transaction.amount}</span>
                    </div>
                  </TableCell>
                </TableRow>
              );
            })}
        </TableBody>
      </Table>
      {transactions && transactions.length === 0 && (
        <div className=" ">
          <EmptyListMessage
            className="@xl/main:flex-row @xl/main:text-left"
            title="Your transaction history is empty"
            description="Start claiming rewards to track your earned points."
          />
        </div>
      )}
      {isLoading ||
        (status === "loading" && (
          <div className="w-full py-8">
            <Spinner className="size-16 text-secondary mx-auto" />
          </div>
        ))}
    </div>
  );
}

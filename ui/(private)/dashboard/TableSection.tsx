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
import { useGetTransactions } from "@/hooks/useGetTransaction";

const data = [
  {
    id: "dajlqmw123981jda",
    status: "success",
    from: "following",
    amount: 20,
    createdAt: "Sat Nov 15 2025 00:28:29 GMT+0100 (GMT+01:00)",
  },
];

interface TableSectionProps {
  data: {
    id: "dajlqmw123981jda";
    type: "SPEND" | "EARN";
    from: string;
    amount: 20;
    createdAt: string;
  }[];
}

export default function TableSection({}: TableSectionProps) {
  const { data, isLoading, error } = useGetTransactions();
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
            title="Your transaction history is empty"
            description="Start claiming rewards to track your earned points."
          />
        </div>
      )}
      {isLoading && (
        <div className="w-full py-8">
          <Spinner className="size-16 text-secondary mx-auto" />
        </div>
      )}
    </div>
  );
}

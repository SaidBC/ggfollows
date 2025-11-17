import { Badge } from "@/components/ui/badge";
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
    status: "success" | "failed" | "pending" | "canceled";
    from: string;
    amount: 20;
    createdAt: string;
  }[];
}

export default function TableSection({}: TableSectionProps) {
  return (
    <div className="px-4 lg:px-6">
      <h1 className="font-bold text-3xl my-2 text-neutral-300">
        Transactions :
      </h1>
      <Table>
        <TableCaption>A list of user transactions history</TableCaption>
        <TableHeader>
          <TableRow>
            <TableHead>Id</TableHead>
            <TableHead>Status</TableHead>
            <TableHead>From</TableHead>
            <TableHead>Date</TableHead>
            <TableHead className="text-right">Amount</TableHead>
          </TableRow>
        </TableHeader>
        <TableBody>
          {data.map((item) => {
            const date = new Date(item.createdAt);
            const formatedDate = date.toUTCString();
            return (
              <TableRow key={item.id}>
                <TableCell className="font-medium">{item.id}</TableCell>
                <TableCell>
                  <Badge className="bg-secondary">
                    <div className="flex items-center gap-2">
                      <div className="bg-green-800 rounded-2xl h-2 w-2"></div>
                      <span>{item.status}</span>
                    </div>
                  </Badge>
                </TableCell>
                <TableCell>{item.from}</TableCell>
                <TableCell>{formatedDate}</TableCell>
                <TableCell className="font-bold">
                  <div className="flex items-center justify-end gap-2">
                    <PointsIcon />
                    <span>{item.amount}</span>
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

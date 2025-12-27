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
import formatNumber from "@/utils/formatNumber";

interface Order {
  id: string;
  status: string;
  type: string;
  quantity: number;
  createdAt: string;
  price: string;
}

export default function OrdersTable() {
  const orders: Order[] = [];
  return (
    <div>
      <Table>
        <TableCaption>A list of user orders history</TableCaption>
        <TableHeader>
          <TableRow>
            <TableHead>Id</TableHead>
            <TableHead>Status</TableHead>
            <TableHead>Type</TableHead>
            <TableHead>Date</TableHead>
            <TableHead>Quantity</TableHead>
            <TableHead className="text-right">Price</TableHead>
          </TableRow>
        </TableHeader>
        <TableBody>
          {orders &&
            orders.map((order) => {
              const date = new Date(order.createdAt);
              const formatedDate = date.toUTCString();
              return (
                <TableRow key={order.id}>
                  <TableCell className="font-medium">{order.id}</TableCell>
                  <TableCell>
                    <Badge className="bg-secondary">
                      <div className="flex items-center gap-2">
                        <div className="bg-green-800 rounded-2xl h-2 w-2"></div>
                        <span>{"success"}</span>
                      </div>
                    </Badge>
                  </TableCell>
                  <TableCell>{order.type}</TableCell>
                  <TableCell>{formatedDate}</TableCell>
                  <TableCell className="font-bold">
                    {formatNumber(order.quantity)}$
                  </TableCell>
                  <TableCell className="font-bold">{order.price}$</TableCell>
                </TableRow>
              );
            })}
        </TableBody>
      </Table>
    </div>
  );
}

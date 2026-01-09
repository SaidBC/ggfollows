import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import {
  Card,
  CardContent,
  CardDescription,
  CardFooter,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import siteConfig from "@/lib/siteConfig";
import { OrderStatus, Payment, TaskPlatform } from "@prisma/client";

interface OrdersTableProps {
  id: string;
  platform: TaskPlatform;
  code: string;
  quantity: number;
  totalPrice: number;
  link: string;
  status: OrderStatus;
  payment: Payment;
  onOpenPaymentDetails: () => void;
}

export default function ActiveOrderCard({
  id,
  platform,
  code,
  quantity,
  totalPrice,
  link,
  status,
  onOpenPaymentDetails,
}: OrdersTableProps) {
  const PlatformIcon = siteConfig.platforms[platform].icon;
  return (
    <Card>
      <CardHeader>
        <CardTitle className="flex gap-2 items-center">
          <PlatformIcon />
          <span>{platform}</span>
        </CardTitle>
        <CardDescription>{code}</CardDescription>
      </CardHeader>
      <CardContent className="flex flex-row flex-wrap gap-4 ">
        <div>
          <div className="flex gap-2">
            <span className="text-muted-foreground font-bold">Quantity:</span>
            <span className="font-bold text-secondary">{quantity}</span>
          </div>
          <div className="flex gap-2">
            <span className="text-muted-foreground font-bold">
              Total Price:
            </span>
            <span className="font-bold text-secondary">{totalPrice}$</span>
          </div>
        </div>
        <div>
          <div className="flex gap-2">
            <span className="text-muted-foreground font-bold">Link:</span>
            <div>
              <span className="text-sm hover:underline hover:underline-offset-2 hover:cursor-pointer">
                {link.length > 20 ? link.slice(0, 20) + "..." : link}
              </span>
            </div>
          </div>
          <div className="flex gap-2 items-center">
            <span className="text-muted-foreground font-bold">
              Order Status:
            </span>
            <Badge>{status}</Badge>
          </div>
        </div>
      </CardContent>
      <CardFooter className="flex flex-col gap-2 ">
        <div className="flex justify-between items-center w-full">
          <span className="text-muted-foreground text-xs">
            id: {id.length > 16 ? id.slice(0, 16) + "..." : id}
          </span>
          <Button
            onClick={onOpenPaymentDetails}
            size="sm"
            className="text-xs"
            variant="outline"
          >
            Payment Details
          </Button>
        </div>
        <Button className="w-full" variant="secondary">
          Update
        </Button>
      </CardFooter>
    </Card>
  );
}

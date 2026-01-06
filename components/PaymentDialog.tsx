import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import {
  Dialog,
  DialogHeader,
  DialogContent,
  DialogDescription,
  DialogTitle,
  DialogFooter,
} from "@/components/ui/dialog";
import WalletQr from "@/components/WalletQr";
import { cn } from "@/lib/utils";
import { Payment } from "@prisma/client";
import { IconClipboard, IconClipboardCheckFilled } from "@tabler/icons-react";
import Link from "next/link";
import { useState } from "react";

interface PaymentDialogProps {
  open: boolean;
  onOpenChange: (open: boolean) => void;
  payment: Payment | null;
}

export default function PaymentDialog({
  open,
  onOpenChange,
  payment,
}: PaymentDialogProps) {
  const [copied, setCopied] = useState(false);
  if (open && !payment) return <>Unexpected error occures</>;
  if (!payment) return null;

  const address = payment.cryptoAddress!;
  const price_amount = String(payment.amountCrypto!);

  const copyAddress = async () => {
    await navigator.clipboard.writeText(address);
    setCopied(true);
    setTimeout(() => setCopied(false), 1500);
  };
  const paymentDate = new Date(payment.createdAt);
  const formatedPaymentDate = paymentDate.toUTCString();

  const paymentExpiryDate =
    payment.expirationEstimateDate && new Date(payment.expirationEstimateDate);
  const isExpired = paymentExpiryDate ? paymentExpiryDate < new Date() : false;
  return (
    <div>
      <Dialog open={open} onOpenChange={onOpenChange}>
        <DialogContent className="sm:max-w-md">
          <DialogHeader>
            <DialogTitle>Payment</DialogTitle>
            <DialogDescription>
              You are about to pay via <b>USDT (TRC20)</b>
            </DialogDescription>
          </DialogHeader>
          <div className="relative">
            {isExpired && (
              <Badge
                variant="destructive"
                className="absolute top-1/2 left-1/2 translate-[calc(-50%-12px)] z-1 text-3xl py-2 px-4"
              >
                Expired
              </Badge>
            )}
            <div
              className={cn(
                "flex gap-2 items-center p-4 rounded-md bg-sidebar",
                isExpired && "blur-md select-none"
              )}
            >
              <WalletQr address={address} />
              <div className="flex flex-col gap-2">
                <div>
                  <span className="text-sm font-bold text-muted-foreground">
                    Amount
                  </span>
                  <p className="font-bold">{price_amount} USDT</p>
                </div>
                <div>
                  <span className="text-sm font-bold text-muted-foreground">
                    Address
                  </span>
                  <div className="flex gap-2 items-center">
                    <p className="text-wrap  break-all">{address}</p>
                    <Button
                      size="icon-sm"
                      variant="outline"
                      className="mt-2"
                      onClick={copyAddress}
                    >
                      {copied ? (
                        <IconClipboardCheckFilled />
                      ) : (
                        <IconClipboard />
                      )}
                    </Button>
                  </div>
                </div>
              </div>
            </div>
          </div>
          <div>
            <div className="flex gap-2">
              <span className="text-sm font-bold text-muted-foreground">
                Status :
              </span>
              <Badge>{payment.status}</Badge>
            </div>
            <div className="flex gap-2">
              <span className="text-sm font-bold text-muted-foreground">
                Created At :
              </span>
              <p className="text-sm">{formatedPaymentDate}</p>
            </div>
            {paymentExpiryDate && (
              <>
                <div className="flex gap-2">
                  <span className="text-sm font-bold text-muted-foreground">
                    Expiration Estimate Date :
                  </span>
                  <p className="text-sm">{paymentExpiryDate.toUTCString()}</p>
                </div>
                <div className="flex gap-2">
                  <span className="text-sm font-bold text-muted-foreground">
                    Note :
                  </span>
                  <p className="text-sm text-secondary">
                    Payments must be proccessed before expiretion date
                  </p>
                </div>
              </>
            )}
          </div>

          <DialogFooter className="text-sm">
            Checkout your orders :{" "}
            <Link className="text-secondary font-bold" href="/orders">
              here
            </Link>
          </DialogFooter>
        </DialogContent>
      </Dialog>
    </div>
  );
}

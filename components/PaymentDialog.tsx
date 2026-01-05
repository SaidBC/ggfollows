"use client";

import Link from "next/link";
import {
  Dialog,
  DialogHeader,
  DialogContent,
  DialogDescription,
  DialogTitle,
  DialogFooter,
} from "./ui/dialog";
import WalletQr from "./WalletQr";
import { useState } from "react";
import { Button } from "./ui/button";
import { IconClipboard, IconClipboardCheckFilled } from "@tabler/icons-react";

interface PaymentDialogProps {
  open: boolean;
  onOpenChange: (open: boolean) => void;
  price_amount: string | null;
  address: string | null;
}

export default function PaymentDialog({
  open,
  onOpenChange,
  price_amount,
  address,
}: PaymentDialogProps) {
  const [copied, setCopied] = useState(false);
  if (open && (!address || !price_amount)) return <>Unexpected error occures</>;
  if (!address || !price_amount) return null;

  const copyAddress = async () => {
    await navigator.clipboard.writeText(address);
    setCopied(true);
    setTimeout(() => setCopied(false), 1500);
  };
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
          <div className="flex gap-2 items-center p-4 rounded-md bg-sidebar">
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
                    {copied ? <IconClipboardCheckFilled /> : <IconClipboard />}
                  </Button>
                </div>
              </div>
            </div>
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

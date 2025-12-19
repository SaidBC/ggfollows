"use client";

import { Button } from "@/components/ui/button";
import { toast } from "sonner";

export default function PayWithMoneyButton({ price }: { price: string }) {
  return (
    <Button
      className="grow"
      variant="secondary"
      onClick={() => toast.error("Cannot pay with money now")}
    >
      <div className="flex items-center gap-0.5">
        <span className="">$</span>
        <span className="text-2xl font-caveat-brush">{price}</span>
      </div>
    </Button>
  );
}

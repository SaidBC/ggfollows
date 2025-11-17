"use client";

import { Button } from "@/components/ui/button";
import { cn } from "@/lib/utils";
import { Eye, EyeClosedIcon, EyeIcon } from "lucide-react";
import { useState } from "react";

export default function EmailHidder({
  email,
  className,
  ...props
}: Readonly<{
  email: string;
}> &
  React.HTMLAttributes<HTMLSpanElement>) {
  const [hide, setHide] = useState(true);
  const [localPart, domainPart] = email.split("@");
  const hiddenLocalPart =
    localPart.length <= 2
      ? "*".repeat(localPart.length)
      : localPart[0] + "*".repeat(localPart.length - 2) + localPart.slice(-1);
  const hiddenEmail = hiddenLocalPart + "@" + domainPart;
  return (
    <div {...props} className={cn("flex items-center", className)}>
      <span>{!hide ? email : hiddenEmail}</span>
      <Button
        variant={"ghost"}
        size={"icon-sm"}
        className="p-0 h-auto"
        onClick={() => setHide(!hide)}
      >
        {!hide ? <EyeIcon /> : <EyeClosedIcon />}
      </Button>
    </div>
  );
}

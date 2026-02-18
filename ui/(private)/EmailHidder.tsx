"use client";

import { Button } from "@/components/ui/button";
import { cn } from "@/lib/utils";
import { EyeClosedIcon, EyeIcon } from "lucide-react";
import { useState } from "react";

export default function EmailHidder({
  email,
  className,
  ...props
}: Readonly<{
  email: string;
}> &
  React.HTMLAttributes<HTMLDivElement>) {
  const [hide, setHide] = useState(true);
  
  const [localPart, domainPart] = email.split("@");
  const hiddenLocalPart =
    localPart.length <= 2
      ? "*".repeat(localPart.length)
      : localPart[0] + "*".repeat(localPart.length - 2) + localPart.slice(-1);
  const hiddenEmail = hiddenLocalPart + "@" + domainPart;

  return (
    <div {...props} className={cn("flex items-center gap-1.5 min-w-0 w-full group", className)}>
      <span className="truncate min-w-0 flex-1 select-none font-medium">
        {!hide ? email : hiddenEmail}
      </span>
      <Button
        variant="ghost"
        size="icon"
        className="shrink-0 p-0 h-4 w-4 text-muted-foreground/50 hover:text-secondary hover:bg-transparent transition-colors"
        onClick={(e) => {
          e.preventDefault();
          e.stopPropagation();
          setHide(!hide);
        }}
        title={hide ? "Show email" : "Hide email"}
      >
        {!hide ? <EyeIcon className="size-3" /> : <EyeClosedIcon className="size-3" />}
      </Button>
    </div>
  );
}

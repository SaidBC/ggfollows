"use client";

import { cn } from "@/lib/utils";
import Image from "next/image";
import React from "react";

interface EmptyListMessageProps {
  title: string;
  description: string;
  action?: React.ReactNode;
  icon?: React.ReactNode;
  className?: string;
}

export default function EmptyListMessage({
  title,
  description,
  action,
  icon,
  className,
}: EmptyListMessageProps) {
  return (
    <div
      className={cn(
        "flex flex-col gap-6 items-center justify-center text-center p-8 rounded-2xl border border-dashed border-border/60 bg-muted/5",
        className
      )}
    >
      <div className="relative">
        <div className="absolute inset-0 bg-secondary/20 blur-3xl rounded-full" />
        {icon ? (
          <div className="relative z-10 w-24 h-24 flex items-center justify-center text-muted-foreground/40">
            {icon}
          </div>
        ) : (
          <Image
            src="/images/empty-state-illustration.svg"
            alt="Empty state image"
            className="relative z-10 w-40 object-contain opacity-50 grayscale brightness-75 drop-shadow-2xl"
            width={160}
            height={160}
          />
        )}
      </div>
      
      <div className="flex flex-col gap-2 max-w-sm">
        <h2 className="font-bold text-2xl text-foreground/90 tracking-tight">
          {title}
        </h2>
        <p className="text-muted-foreground text-sm leading-relaxed">
          {description}
        </p>
      </div>

      {action && (
        <div className="mt-2">
          {action}
        </div>
      )}
    </div>
  );
}

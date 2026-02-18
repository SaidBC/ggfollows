"use client";

import Link from "next/link";
import { Button } from "@/components/ui/button";
import { IconCircleCheck, IconCircleX, IconArrowRight, IconMail } from "@tabler/icons-react";
import { cn } from "@/lib/utils";

export default function EmailStatus({ verified }: { verified: boolean }) {
  return (
    <div className={cn(
      "group relative flex flex-col gap-5 p-6 rounded-2xl transition-all duration-300 border overflow-hidden",
      verified 
        ? "bg-green-500/5 border-green-500/20 hover:bg-green-500/10" 
        : "bg-destructive/5 border-destructive/20 hover:bg-destructive/10"
    )}>
      <div className="flex items-center justify-between gap-4">
        <div className="flex items-center gap-3">
          <div className={cn(
            "p-2.5 rounded-xl shadow-lg transition-transform duration-300 group-hover:scale-110",
            verified 
              ? "bg-green-500/20 text-green-400 shadow-green-500/10" 
              : "bg-destructive/20 text-destructive shadow-destructive/10"
          )}>
            <IconMail size={22} strokeWidth={1.5} />
          </div>
          <div className="space-y-0.5">
            <h3 className="text-sm font-bold text-foreground tracking-wide uppercase">Email Verification</h3>
            <div className="flex items-center gap-1.5">
              {verified ? (
                <>
                  <IconCircleCheck size={14} className="text-green-400" />
                  <span className="text-xs font-bold text-green-400">Verified</span>
                </>
              ) : (
                <>
                  <IconCircleX size={14} className="text-destructive" />
                  <span className="text-xs font-bold text-destructive">Unverified</span>
                </>
              )}
            </div>
          </div>
        </div>
      </div>

      <div className="flex flex-col sm:flex-row items-start sm:items-center justify-between gap-4">
        <p className="text-sm text-muted-foreground/80 max-w-sm leading-relaxed">
          {verified 
            ? "Your email is confirmed. You can now access all authenticated features and receive important updates."
            : "Your email is not verified yet. Please confirm your email to unlock all features and secure your account."}
        </p>

        {!verified && (
          <Button 
            variant="secondary" 
            asChild 
            className="w-full sm:w-auto h-11 px-6 rounded-xl font-bold bg-secondary text-secondary-foreground shadow-lg shadow-secondary/10 hover:shadow-secondary/20 hover:bg-secondary/90 transition-all active:scale-95 group/btn"
          >
            <Link href="/verify-email" className="flex items-center gap-2">
              Verify Now
              <IconArrowRight size={16} className="transition-transform group-hover/btn:translate-x-1" />
            </Link>
          </Button>
        )}
      </div>
    </div>
  );
}

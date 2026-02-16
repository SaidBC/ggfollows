"use client";

import { cn } from "@/lib/utils";
import { IconChevronDown } from "@tabler/icons-react";
import { useCallback, useState } from "react";

interface FaqComponentProps {
  question: string;
  answer: React.ReactNode;
}

export default function FaqComponent({ question, answer }: FaqComponentProps) {
  const [isFaqOpen, setIsFaqOpen] = useState(false);
  const handleToggle = useCallback(
    function () {
      setIsFaqOpen(!isFaqOpen);
    },
    [isFaqOpen]
  );

  return (
    <div className="w-full">
      <button
        onClick={handleToggle}
        className={cn(
          "cursor-pointer flex items-center justify-between w-full px-6 py-5 text-left gap-4 transition-colors duration-200",
          isFaqOpen
            ? "bg-secondary/5"
            : "hover:bg-muted/50"
        )}
      >
        <h3
          className={cn(
            "text-base font-medium transition-colors duration-200",
            isFaqOpen ? "text-secondary" : "text-foreground"
          )}
        >
          {question}
        </h3>
        <div
          className={cn(
            "flex-shrink-0 w-8 h-8 rounded-lg flex items-center justify-center transition-all duration-300",
            isFaqOpen
              ? "bg-secondary/15 text-secondary rotate-180"
              : "bg-muted text-muted-foreground rotate-0"
          )}
        >
          <IconChevronDown size={16} />
        </div>
      </button>

      <div
        className={cn(
          "grid transition-all duration-300 ease-in-out",
          isFaqOpen ? "grid-rows-[1fr] opacity-100" : "grid-rows-[0fr] opacity-0"
        )}
      >
        <div className="overflow-hidden">
          <p className="px-6 pb-5 pt-1 text-sm text-muted-foreground leading-relaxed">
            {answer}
          </p>
        </div>
      </div>
    </div>
  );
}

"use client";

import { cn } from "@/lib/utils";
import clsx from "clsx";
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
    <div className="w-full border-b border-current py-6 sm:px-2 flex flex-col gap-4">
      <button
        onClick={handleToggle}
        className={cn(
          "cursor-pointer flex justify-between w-full",
          isFaqOpen ? "text-secondary" : "text-white"
        )}
      >
        <h2 className="text-lg sm:text-2xl font-bold text-current">
          {question}
        </h2>
        <div className="relative w-10 h-10 rounded-full border-2 border-current">
          <span
            className={clsx(
              "absolute top-1/2 left-1/2 -translate-1/2 bg-current w-6 h-0.75 rounded-full transition-transform ",
              isFaqOpen ? "rotate-0" : "rotate-90"
            )}
          ></span>
          <span className="absolute top-1/2 left-1/2 -translate-1/2 bg-current  w-6 h-0.75 rounded-full"></span>
        </div>
      </button>
      <div className={clsx(isFaqOpen ? "block" : "hidden")}>
        <p className="text-muted-foreground">{answer}</p>
      </div>
    </div>
  );
}

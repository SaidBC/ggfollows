"use client";

import { Slider } from "@/components/ui/slider";
import { ControllerRenderProps } from "react-hook-form";
import { cn } from "@/lib/utils";
import React from "react";
import formatNumber from "@/utils/formatNumber";

interface SteppedSliderProps {
  min: number;
  max: number;
  steps: number[];
  field: ControllerRenderProps<any, any>;
}

export default function SteppedSlider({
  min,
  max,
  step,
  steps,
  field,
  ...props
}: SteppedSliderProps & React.ComponentProps<typeof Slider>) {
  return (
    <div className="relative w-full space-y-2">
      {/* Slider track */}
      <div className="relative pt-1 pb-1">
        {/* Step tick marks on the track */}
        <div className="absolute inset-x-0 top-1/2 -translate-y-1/2 flex justify-between pointer-events-none px-[7px]">
          {steps.map((s) => {
            const isReached = field.value >= s;
            return (
              <div
                key={s}
                className={cn(
                  "w-1.5 h-1.5 rounded-full transition-colors duration-200",
                  isReached ? "bg-secondary/60" : "bg-muted-foreground/20"
                )}
              />
            );
          })}
        </div>
        <Slider min={min} max={max} step={step} {...props} />
      </div>

      {/* Step labels row */}
      <div className="flex justify-between w-full">
        {steps.map((s) => {
          const isActive = field.value === s;
          const isReached = field.value >= s;
          return (
            <button
              type="button"
              onClick={() => field.onChange(s)}
              key={s}
              className="group flex flex-col items-center gap-0.5 cursor-pointer"
            >
              <span
                className={cn(
                  "text-[11px] font-medium transition-all duration-200",
                  isActive
                    ? "text-secondary font-semibold scale-110"
                    : isReached
                      ? "text-foreground/70"
                      : "text-muted-foreground/50 group-hover:text-muted-foreground"
                )}
              >
                {formatNumber(s)}
              </span>
            </button>
          );
        })}
      </div>
    </div>
  );
}

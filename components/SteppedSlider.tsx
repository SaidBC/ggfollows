"use client";

import { Slider } from "@/components/ui/slider";
import {
  useForm,
  Controller,
  ControllerRenderProps,
  FieldValues,
} from "react-hook-form";
import { cn } from "@/lib/utils";
import React from "react";
import formatNumber from "@/utils/formatNumber";

type FormValues = {
  amount: number;
};

interface SteppedSliderProps {
  min: number;
  max: number;
  steps: number[];
  field: ControllerRenderProps<
    { quantity: number; code: string; link: string },
    "quantity"
  >;
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
    <div className="relative w-full max-w-md space-y-4">
      <Slider min={min} max={max} step={step} {...props} />

      {/* Step dots */}
      <div className="pointer-events-none  w-full flex justify-between">
        {steps.map((step, index) => {
          const isActive = field.value === step;
          return (
            <button
              type="button"
              onClick={() => field.onChange(step)}
              key={step}
            >
              <div className="flex flex-col items-center gap-1">
                <div>
                  <div
                    className={cn(
                      "pointer-events-auto rounded-full transition",
                      isActive
                        ? "h-4 w-4 bg-secondary"
                        : "h-3 w-3 bg-muted-foreground/50 hover:scale-110"
                    )}
                  ></div>
                </div>
                <div>
                  <span
                    className={cn(
                      "text-xs",
                      isActive && "font-bold text-secondary"
                    )}
                  >
                    {formatNumber(step)}
                  </span>
                </div>
              </div>
            </button>
          );
        })}
      </div>
    </div>
  );
}

"use client";
import ErrorText from "@/components/ErrorText";
import SteppedSlider from "@/components/SteppedSlider";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import { Slider } from "@/components/ui/slider";
import { Spinner } from "@/components/ui/spinner";
import serviceOrderSchema from "@/lib/schemas/serviceOrderSchema";
import { zodResolver } from "@hookform/resolvers/zod";
import { IconHeart, IconUserPlus } from "@tabler/icons-react";
import { Controller, useForm } from "react-hook-form";

const MIN = 0;
const MAX = 1000;
const STEP = 100;

const steps = Array.from(
  { length: (MAX - MIN) / STEP + 1 },
  (_, i) => MIN + i * STEP
);

export default function ServiceForm() {
  const {
    watch,
    reset,
    control,
    handleSubmit,
    register,
    formState: { errors, isLoading },
    setError,
  } = useForm({ resolver: zodResolver(serviceOrderSchema) });
  const quantity = watch("quantity");

  return (
    <form>
      <div className="flex flex-col gap-4">
        <div className="grid gap-2">
          <Label htmlFor="platform">Service type</Label>
          <Controller
            control={control}
            name="type"
            render={({ field }) => (
              <Select onValueChange={field.onChange} defaultValue={field.value}>
                <SelectTrigger className="w-full">
                  <SelectValue placeholder="service type" />
                </SelectTrigger>
                <SelectContent>
                  <SelectItem className="grid gap-2" value="follow">
                    <IconUserPlus />
                    <span>Follow</span>
                  </SelectItem>
                  <SelectItem className="grid gap-2" value="like">
                    <IconHeart />
                    <span>Post like</span>
                  </SelectItem>
                </SelectContent>
              </Select>
            )}
          />
        </div>
        <div className="grid gap-2">
          <Label htmlFor="serviceQuantity">Service quantity</Label>
          <Controller
            control={control}
            name="quantity"
            render={({ field }) => (
              <div className="space-y-3">
                <div className="flex justify-between text-sm text-muted-foreground">
                  <span>0</span>
                  <span>1000</span>
                </div>
                <SteppedSlider
                  min={MIN}
                  max={MAX}
                  step={STEP}
                  value={[field.value ?? 0]}
                  onValueChange={(value) => field.onChange(value[0])}
                  onValueCommit={(value) => field.onChange(value[0])}
                  field={field}
                  steps={steps}
                />
              </div>
            )}
          />
        </div>
        <div className="grow grid gap-2">
          <Label htmlFor="link">Link</Label>
          <Input
            className=""
            {...register("link")}
            id="link"
            type="text"
            placeholder="Where user will go"
          />
          {errors.link && <ErrorText message={"Invalid link"} />}
        </div>
        <Button variant={"secondary"} disabled={isLoading}>
          {!isLoading && <div className="font-bold">Price 5$</div>}
          {isLoading && (
            <div className="flex items-center gap-4">
              <Spinner className="size-4" />
              <span>Ordering ...</span>
            </div>
          )}
        </Button>
      </div>
    </form>
  );
}

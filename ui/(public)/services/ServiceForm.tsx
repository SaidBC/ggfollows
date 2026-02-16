"use client";
import ErrorText from "@/components/ErrorText";
import PaymentDialog from "@/components/PaymentDialog";
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
import { Spinner } from "@/components/ui/spinner";
import { useCreateOrder } from "@/hooks/useCreateOrder";
import serviceOrderSchema from "@/lib/schemas/serviceOrderSchema";
import { CreateOrderResponse, CreateOrderSuccessResponseData } from "@/types";
import { zodResolver } from "@hookform/resolvers/zod";
import { TaskPlatform } from "@prisma/client";
import { IconBolt, IconShoppingCart, IconLink } from "@tabler/icons-react";
import { useEffect, useState } from "react";
import { Controller, useForm } from "react-hook-form";
import { toast } from "sonner";
import z from "zod";

const MIN = 0;
const MAX = 10000;
const STEP = 1000;

interface ServiceFormProps {
  services: {
    code: string;
    name: string;
    platform: TaskPlatform;
    pricePerUnit: number;
    minQuantity: number;
    maxQuantity: number;
  }[];
}

export default function ServiceForm({ services }: ServiceFormProps) {
  const [open, setOpen] = useState(false);
  const [responseData, setResponseData] =
    useState<CreateOrderSuccessResponseData | null>(null);
  const { mutate } = useCreateOrder();

  const {
    watch,
    reset,
    control,
    handleSubmit,
    register,
    formState: { errors, isLoading },
    setError,
  } = useForm({
    resolver: zodResolver(serviceOrderSchema),
    defaultValues: {
      code: services[0].code,
      quantity: 1000,
    },
  });
  const code = watch("code");
  const quantity = watch("quantity");

  const selectedService = services.find((service) => service.code === code)!;
  const totalPrice = (quantity * selectedService.pricePerUnit) / 1000;

  const onSubmit = async function (data: z.output<typeof serviceOrderSchema>) {
    try {
      mutate(data, {
        onError: (data) => {
          setError("root", { message: data.message });
        },
        onSuccess: (data) => {
          if (!data.success) {
            const fields = ["quantity", "code", "link", "root"] as const;
            for (const field of fields) {
              if (field in data.errors) {
                setError(field, {
                  message: data.errors[field]!.message,
                });
              }
            }
            return;
          }
          setResponseData(data.data);
          setOpen(true);
          reset();
        },
      });
    } catch (error) {
      setError("root", {
        message: "An error occurred during creating. Please try again.",
      });
    }
  };

  useEffect(() => {
    if (errors.root) {
      toast.error(errors.root.message || "An expected error occured");
    }
  }, [errors.root]);

  return (
    <form onSubmit={handleSubmit(onSubmit)}>
      <div className="flex flex-col gap-5">
        {/* Service type */}
        <div className="grid gap-2">
          <Label
            htmlFor="platform"
            className="text-sm font-medium text-foreground"
          >
            Service Type
          </Label>
          <Controller
            control={control}
            name="code"
            render={({ field }) => (
              <Select onValueChange={field.onChange} defaultValue={field.value}>
                <SelectTrigger className="w-full rounded-xl h-11 bg-muted/30 border-border/50">
                  <SelectValue placeholder="Select a service" />
                </SelectTrigger>
                <SelectContent>
                  {services.map((service) => (
                    <SelectItem
                      key={service.code}
                      className="gap-2"
                      value={service.code}
                    >
                      <IconBolt size={14} />
                      <span>{service.name}</span>
                    </SelectItem>
                  ))}
                </SelectContent>
              </Select>
            )}
          />
        </div>

        {/* Quantity slider */}
        <div className="grid gap-2">
          <Label
            htmlFor="serviceQuantity"
            className="text-sm font-medium text-foreground"
          >
            Quantity
          </Label>
          <Controller
            control={control}
            name="quantity"
            render={({ field }) => {
              const { minQuantity, maxQuantity } = selectedService;

              const steps = Array.from(
                { length: (maxQuantity - minQuantity) / STEP + 1 },
                (_, i) => minQuantity + i * STEP
              );

              return (
                <div className="space-y-3">
                  <div className="flex justify-between text-xs text-muted-foreground">
                    <span>{minQuantity.toLocaleString()}</span>
                    <span className="text-secondary font-semibold text-sm">
                      {(field.value ?? 0).toLocaleString()}
                    </span>
                    <span>{maxQuantity.toLocaleString()}</span>
                  </div>
                  <SteppedSlider
                    min={minQuantity}
                    max={maxQuantity}
                    step={STEP}
                    value={[field.value ?? 0]}
                    onValueChange={(value) => field.onChange(value[0])}
                    onValueCommit={(value) => field.onChange(value[0])}
                    field={field}
                    steps={steps}
                  />
                </div>
              );
            }}
          />
        </div>

        {/* Link input */}
        <div className="grid gap-2">
          <Label
            htmlFor="link"
            className="text-sm font-medium text-foreground"
          >
            Target Link
          </Label>
          <div className="relative">
            <IconLink
              size={16}
              className="absolute left-3 top-1/2 -translate-y-1/2 text-muted-foreground"
            />
            <Input
              className="pl-9 rounded-xl h-11 bg-muted/30 border-border/50"
              {...register("link")}
              id="link"
              type="text"
              placeholder="https://example.com/your-profile"
            />
          </div>
          {errors.link && <ErrorText message={"Invalid link"} />}
        </div>

        {/* Price summary and submit */}
        <div className="flex flex-col gap-3 pt-2">
          <div className="flex items-center justify-between px-4 py-3 rounded-xl bg-muted/30 border border-border/50">
            <span className="text-sm text-muted-foreground">Total Price</span>
            <span className="text-lg font-bold text-foreground">
              ${totalPrice.toFixed(2)}
            </span>
          </div>

          <p className="text-xs text-muted-foreground text-center">
            ${(selectedService.pricePerUnit / 1000).toFixed(3)} per unit
          </p>

          <Button
            variant="secondary"
            size="lg"
            disabled={isLoading}
            className="w-full rounded-xl h-12 text-base font-semibold"
          >
            {!isLoading ? (
              <div className="flex items-center gap-2">
                <IconShoppingCart size={18} />
                <span>Place Order — ${totalPrice.toFixed(2)}</span>
              </div>
            ) : (
              <div className="flex items-center gap-3">
                <Spinner className="size-4" />
                <span>Placing Order...</span>
              </div>
            )}
          </Button>
        </div>
      </div>
      <PaymentDialog
        open={open}
        onOpenChange={setOpen}
        payment={responseData?.payment || null}
      />
    </form>
  );
}

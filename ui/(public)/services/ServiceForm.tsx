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
import { IconBolt } from "@tabler/icons-react";
import { useEffect, useState } from "react";
import { Controller, useForm } from "react-hook-form";
import { toast } from "sonner";
import z from "zod";

const MIN = 0;
const MAX = 10000;
const STEP = 1000;

const steps = Array.from(
  { length: (MAX - MIN) / STEP + 1 },
  (_, i) => MIN + i * STEP
);

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
      <div className="flex flex-col gap-4">
        <div className="grid gap-2">
          <Label htmlFor="platform">Service type</Label>
          <Controller
            control={control}
            name="code"
            render={({ field }) => (
              <Select onValueChange={field.onChange} defaultValue={field.value}>
                <SelectTrigger className="w-full">
                  <SelectValue placeholder="service type" />
                </SelectTrigger>
                <SelectContent>
                  {services.map((service) => (
                    <SelectItem
                      key={service.code}
                      className="grid gap-2"
                      value={service.code}
                    >
                      <IconBolt />
                      <span>{service.name}</span>
                    </SelectItem>
                  ))}
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
            render={({ field }) => {
              const { minQuantity, maxQuantity } = selectedService;

              const steps = Array.from(
                { length: (maxQuantity - minQuantity) / STEP + 1 },
                (_, i) => minQuantity + i * STEP
              );

              return (
                <div className="space-y-3">
                  <div className="flex justify-between text-sm text-muted-foreground">
                    <span>{minQuantity}</span>
                    <span>{maxQuantity}</span>
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
        <p className="text-xs text-muted-foreground">
          Price per unit : {selectedService.pricePerUnit / 1000}$
        </p>
        <Button variant={"secondary"} disabled={isLoading}>
          {!isLoading && (
            <div className="font-bold">
              Price {(quantity * selectedService.pricePerUnit) / 1000}$
            </div>
          )}
          {isLoading && (
            <div className="flex items-center gap-4">
              <Spinner className="size-4" />
              <span>Ordering ...</span>
            </div>
          )}
        </Button>
      </div>
      <PaymentDialog
        open={open}
        onOpenChange={setOpen}
        payment={responseData?.payment || null}
      />
    </form>
  );
}

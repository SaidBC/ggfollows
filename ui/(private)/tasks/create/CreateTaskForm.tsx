"use client";

import ErrorText from "@/components/ErrorText";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { RadioGroup, RadioGroupItem } from "@/components/ui/radio-group";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import { Spinner } from "@/components/ui/spinner";
import { Textarea } from "@/components/ui/textarea";
import PointsIcon from "@/components/vectors/PointIcon";
import { useCreateTask } from "@/hooks/useCreateTask";
import createTaskSchema from "@/lib/schemas/createTaskSchema";
import siteConfig from "@/lib/siteConfig";
import { zodResolver } from "@hookform/resolvers/zod";
import { useEffect } from "react";
import { Controller, useForm } from "react-hook-form";
import { toast } from "sonner";
import z from "zod";
import { cn } from "@/lib/utils";
import { 
  IconLayout2, 
  IconLink, 
  IconAdjustmentsHorizontal, 
  IconCoins, 
  IconUsers, 
  IconPencil,
  IconArrowRight,
  IconRocket
} from "@tabler/icons-react";

export default function CreateTaskForm() {
  const { mutate } = useCreateTask();
  const {
    watch,
    reset,
    control,
    handleSubmit,
    register,
    formState: { errors, isLoading },
    setError,
  } = useForm({
    resolver: zodResolver(createTaskSchema),
    defaultValues: { allowMultiAccounts: "false" },
  });

  const onSubmit = async function (data: z.output<typeof createTaskSchema>) {
    try {
      mutate(data, {
        onSuccess: (data) => {
          if (!data.success) {
            const fields = [
              "platform",
              "allowMultiAccounts",
              "quantity",
              "link",
              "title",
              "description",
              "root",
            ] as const;
            for (const field of fields) {
              if (field in data.errors)
                setError(field, {
                  message: data.errors[field]!.message,
                });
            }
            return;
          }
          toast.success("Task created successfully!");
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
    if (errors.root)
      toast.error(errors.root.message || "An expected error occured");
  }, [errors.root]);

  const amount = watch("amount");
  const quantity = watch("quantity");
  const platform = watch("platform");

  const total = (Number(amount) || 0) * (Number(quantity) || 0);

  return (
    <form onSubmit={handleSubmit(onSubmit)} className="space-y-8 animate-fade-up">
      <div className="flex flex-col gap-8">
        
        {/* Section 1: Task Identity */}
        <div className="space-y-4">
          <div className="flex items-center gap-2 text-sm font-semibold text-foreground/70 uppercase tracking-wider">
            <IconLayout2 size={16} className="text-secondary" />
            <span>Task Information</span>
          </div>
          
          <div className="grid gap-6 p-6 rounded-2xl border border-border/50 bg-card/50 backdrop-blur-sm shadow-sm transition-all hover:bg-card/80">
            <div className="grid gap-2">
              <Label htmlFor="title" className="text-sm font-medium">Task Title</Label>
              <div className="relative">
                <IconPencil size={18} className="absolute left-3 top-1/2 -translate-y-1/2 text-muted-foreground" />
                <Input
                  className="pl-10 h-11 rounded-xl bg-muted/30 border-border/50 focus:ring-secondary/20 focus:border-secondary/50 transition-all"
                  {...register("title")}
                  id="title"
                  type="text"
                  placeholder="e.g. Subscribe to my Youtube channel"
                />
              </div>
              {errors.title && (
                <ErrorText message={errors.title.message || "Invalid title"} />
              )}
            </div>

            <div className="grid gap-2">
              <Label htmlFor="description" className="text-sm font-medium">Description (optional)</Label>
              <Textarea
                className="min-h-[100px] rounded-xl bg-muted/30 border-border/50 focus:ring-secondary/20 focus:border-secondary/50 transition-all resize-none p-4"
                {...register("description")}
                id="description"
                placeholder="Briefly describe what users need to do..."
              />
              {errors.description && (
                <ErrorText
                  message={errors.description.message || "Invalid description"}
                />
              )}
            </div>
          </div>
        </div>

        {/* Section 2: Platform & Target */}
        <div className="space-y-4">
          <div className="flex items-center gap-2 text-sm font-semibold text-foreground/70 uppercase tracking-wider">
            <IconLink size={16} className="text-secondary" />
            <span>Platform & Destination</span>
          </div>

          <div className="grid gap-6 p-6 rounded-2xl border border-border/50 bg-card/50 backdrop-blur-sm shadow-sm transition-all hover:bg-card/80">
            <div className="grid gap-4 sm:grid-cols-[200px,1fr]">
              <div className="grid gap-2">
                <Label htmlFor="platform" className="text-sm font-medium">Platform</Label>
                <Controller
                  control={control}
                  name="platform"
                  render={({ field }) => (
                    <Select
                      onValueChange={field.onChange}
                      defaultValue={field.value}
                    >
                      <SelectTrigger className="h-11 rounded-xl bg-muted/30 border-border/50">
                        <SelectValue placeholder="Social Media" />
                      </SelectTrigger>
                      <SelectContent className="rounded-xl border-border/50 backdrop-blur-md">
                        <SelectItem className="rounded-lg focus:bg-secondary/10 focus:text-secondary" value="FACEBOOK">
                          <div className="flex items-center gap-2">
                            <siteConfig.platforms.FACEBOOK.icon size={16} />
                            <span>Facebook</span>
                          </div>
                        </SelectItem>
                        <SelectItem className="rounded-lg focus:bg-secondary/10 focus:text-secondary" value="YOUTUBE">
                          <div className="flex items-center gap-2">
                            <siteConfig.platforms.YOUTUBE.icon size={16} />
                            <span>Youtube</span>
                          </div>
                        </SelectItem>
                        <SelectItem className="rounded-lg focus:bg-secondary/10 focus:text-secondary" value="INSTAGRAM">
                          <div className="flex items-center gap-2">
                            <siteConfig.platforms.INSTAGRAM.icon size={16} />
                            <span>Instagram</span>
                          </div>
                        </SelectItem>
                        <SelectItem className="rounded-lg focus:bg-secondary/10 focus:text-secondary" value="TIKTOK">
                          <div className="flex items-center gap-2">
                            <siteConfig.platforms.TIKTOK.icon size={16} />
                            <span>Tiktok</span>
                          </div>
                        </SelectItem>
                      </SelectContent>
                    </Select>
                  )}
                />
                {errors.platform && (
                  <ErrorText message={errors.platform.message || "Required field"} />
                )}
              </div>

              <div className="grid gap-2">
                <Label htmlFor="link" className="text-sm font-medium">Target URL</Label>
                <div className="relative">
                  <IconLink size={18} className="absolute left-3 top-1/2 -translate-y-1/2 text-muted-foreground" />
                  <Input
                    className="pl-10 h-11 rounded-xl bg-muted/30 border-border/50 focus:ring-secondary/20 focus:border-secondary/50 transition-all font-mono text-xs"
                    {...register("link")}
                    id="link"
                    type="text"
                    placeholder={platform ? `https://${siteConfig.platforms[platform as keyof typeof siteConfig.platforms].hostnames[0]}/your-post` : "Provide link here"}
                  />
                </div>
                {errors.link && (
                  <ErrorText message={errors.link.message || "Invalid link"} />
                )}
              </div>
            </div>
          </div>
        </div>

        {/* Section 3: Budget & Rules */}
        <div className="space-y-4">
          <div className="flex items-center gap-2 text-sm font-semibold text-foreground/70 uppercase tracking-wider">
            <IconAdjustmentsHorizontal size={16} className="text-secondary" />
            <span>Budget & Distribution</span>
          </div>

          <div className="grid gap-6 p-6 rounded-2xl border border-border/50 bg-card/50 backdrop-blur-sm shadow-sm transition-all hover:bg-card/80">
            <div className="grid gap-6 sm:grid-cols-2">
              <div className="grid gap-2">
                <Label htmlFor="amount" className="text-sm font-medium">Points Reward per User</Label>
                <div className="relative">
                  <IconCoins size={18} className="absolute left-3 top-1/2 -translate-y-1/2 text-muted-foreground" />
                  <Input
                    className="pl-10 h-11 rounded-xl bg-muted/30 border-border/50 focus:ring-secondary/20 focus:border-secondary/50 transition-all font-bold"
                    {...register("amount")}
                    id="amount"
                    type="number"
                    placeholder="20"
                  />
                  <div className="absolute right-3 top-1/2 -translate-y-1/2">
                    <PointsIcon width={16} height={16} />
                  </div>
                </div>
                {errors.amount && (
                  <ErrorText
                    message={errors.amount.message || "Invalid value"}
                  />
                )}
              </div>
              <div className="grid gap-2">
                <Label htmlFor="quantity" className="text-sm font-medium">Required Engagement Count</Label>
                <div className="relative">
                  <IconUsers size={18} className="absolute left-3 top-1/2 -translate-y-1/2 text-muted-foreground" />
                  <Input
                    className="pl-10 h-11 rounded-xl bg-muted/30 border-border/50 focus:ring-secondary/20 focus:border-secondary/50 transition-all font-bold"
                    {...register("quantity")}
                    id="quantity"
                    type="number"
                    placeholder="100"
                  />
                </div>
                {errors.quantity && (
                  <ErrorText
                    message={errors.quantity.message || "Invalid value"}
                  />
                )}
              </div>
            </div>

            <div className="space-y-3 pt-2">
              <Label htmlFor="allowMultiAccounts" className="text-sm font-medium">Prevent Multi-Account Exploitation</Label>
              <Controller
                control={control}
                name="allowMultiAccounts"
                render={({ field }) => (
                  <RadioGroup
                    value={String(field.value)}
                    onValueChange={field.onChange}
                    id="allowMultiAccounts"
                    className="flex gap-4 p-4 rounded-xl bg-muted/20 border border-border/50"
                  >
                    <div className="flex items-center space-x-2 cursor-pointer group">
                      <RadioGroupItem
                        className="data-[state=checked]:text-secondary data-[state=checked]:border-secondary size-5"
                        value="false"
                        id="allowMultiAccounts-no"
                      />
                      <div className="grid gap-1.5 leading-none">
                        <Label htmlFor="allowMultiAccounts-no" className="text-sm font-medium cursor-pointer">Yes, Strict</Label>
                        <p className="text-[10px] text-muted-foreground">Recommend for security</p>
                      </div>
                    </div>
                    <div className="flex items-center space-x-2 cursor-pointer group">
                      <RadioGroupItem
                        className="data-[state=checked]:text-secondary data-[state=checked]:border-secondary size-5"
                        value="true"
                        id="allowMultiAccounts-yes"
                      />
                      <div className="grid gap-1.5 leading-none">
                        <Label htmlFor="allowMultiAccounts-yes" className="text-sm font-medium cursor-pointer">Allow Multi</Label>
                        <p className="text-[10px] text-muted-foreground">Riskier but faster</p>
                      </div>
                    </div>
                  </RadioGroup>
                )}
              />
              {errors.allowMultiAccounts && (
                <ErrorText
                  message={
                    errors.allowMultiAccounts.message ||
                    "Required selection"
                  }
                />
              )}
            </div>
          </div>
        </div>

        {/* Total Cost Summary Card */}
        <div className="p-6 rounded-2xl bg-secondary/5 border border-secondary/20 flex flex-col sm:flex-row items-center justify-between gap-6 overflow-hidden relative group">
          <div className="absolute top-0 right-0 p-8 text-secondary/5 z-0 transition-transform group-hover:scale-110">
            <IconRocket size={120} />
          </div>
          
          <div className="relative z-10 flex flex-col gap-1">
            <span className="text-xs font-bold text-secondary uppercase tracking-widest">Investment Summary</span>
            <div className="flex items-baseline gap-1">
              <span className="text-3xl font-black text-foreground tabular-nums">
                {total.toLocaleString()}
              </span>
              <span className="text-sm font-medium text-muted-foreground">Points Total</span>
            </div>
          </div>

          <Button 
            variant="secondary" 
            size="lg" 
            disabled={isLoading}
            className="relative z-10 w-full sm:w-auto h-14 px-8 rounded-xl font-bold shadow-[0_8px_30px_rgb(var(--secondary)/0.3)] hover:shadow-[0_8px_40px_rgb(var(--secondary)/0.5)] transition-all"
          >
            {!isLoading ? (
              <div className="flex items-center gap-2">
                <span>Launch Task</span>
                <IconArrowRight size={18} className="translate-y-[0.5px]" />
              </div>
            ) : (
              <div className="flex items-center gap-3">
                <Spinner className="size-5" />
                <span>Launching...</span>
              </div>
            )}
          </Button>
        </div>

        {errors.root && (
          <div className="p-4 rounded-xl bg-destructive/10 border border-destructive/20">
            <ErrorText
              message={errors.root.message || "An expected error occured"}
            />
          </div>
        )}
      </div>
    </form>
  );
}

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
import { useEffect, useState } from "react";
import { Controller, useForm } from "react-hook-form";
import { toast } from "sonner";
import z from "zod";

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
  }, [errors]);

  const amount = watch("amount");
  const quantity = watch("quantity");

  const total = (Number(amount) || 0) * (Number(quantity) || 0);

  return (
    <form onSubmit={handleSubmit(onSubmit)}>
      <div className="flex flex-col gap-4">
        <div className="grid gap-2">
          <Label htmlFor="title">Title</Label>
          <Input
            className=""
            {...register("title")}
            id="title"
            type="text"
            placeholder="Like the post"
          />
          {errors.title && (
            <ErrorText message={errors.title.message || "Invalid title"} />
          )}
        </div>
        <div className="grid gap-2">
          <Label htmlFor="description">Description (optional)</Label>
          <Textarea
            className=""
            {...register("description")}
            id="description"
            placeholder="Just like the post"
          />
          {errors.description && (
            <ErrorText
              message={errors.description.message || "Invalid description"}
            />
          )}
        </div>
        <div className="flex gap-4">
          <div className="grid gap-2">
            <Label htmlFor="platform">Platform</Label>
            <Controller
              control={control}
              name="platform"
              render={({ field }) => (
                <Select
                  onValueChange={field.onChange}
                  defaultValue={field.value}
                >
                  <SelectTrigger className="w-[180px]">
                    <SelectValue placeholder="platforms" />
                  </SelectTrigger>
                  <SelectContent>
                    <SelectItem className="flex gap-2" value="FACEBOOK">
                      <siteConfig.platforms.FACEBOOK.icon />
                      <span>Facebook</span>
                    </SelectItem>
                    <SelectItem className="flex gap-2" value="YOUTUBE">
                      <siteConfig.platforms.YOUTUBE.icon />
                      <span>Youtube</span>
                    </SelectItem>
                    <SelectItem className="flex gap-2" value="INSTAGRAM">
                      <siteConfig.platforms.INSTAGRAM.icon />
                      <span>Instagram</span>
                    </SelectItem>
                    <SelectItem className="flex gap-2" value="TIKTOK">
                      <siteConfig.platforms.TIKTOK.icon />
                      <span>Tiktok</span>
                    </SelectItem>
                  </SelectContent>
                </Select>
              )}
            />
            {errors.platform && (
              <ErrorText message={errors.platform.message || "Invalid email"} />
            )}
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
            {errors.link && (
              <ErrorText message={errors.link.message || "Invalid email"} />
            )}
          </div>
        </div>
        <div className="grid grid-cols-2 gap-4">
          <div className="grid gap-2">
            <Label htmlFor="amount">Amount</Label>
            <Input
              className=""
              {...register("amount")}
              id="amount"
              type="number"
              placeholder="Amount that's you give per one"
            />
            {errors.amount && (
              <ErrorText
                message={errors.amount.message || "Invalid amount value"}
              />
            )}
          </div>
          <div className="grid gap-2">
            <Label htmlFor="quantity">Quantity</Label>
            <Input
              className=""
              {...register("quantity")}
              id="quantity"
              type="number"
              placeholder="Quantity that's you need"
            />
            {errors.quantity && (
              <ErrorText
                message={errors.quantity.message || "Invalid quantity value"}
              />
            )}
          </div>
        </div>
        <div className="grid gap-2">
          <Label htmlFor="allowMultiAccounts" asChild>
            <span>Allow multiple accounts</span>
          </Label>
          <Controller
            control={control}
            name="allowMultiAccounts"
            render={({ field }) => (
              <RadioGroup
                value={String(field.value)}
                onValueChange={field.onChange}
                id="allowMultiAccounts"
                className="flex flex-row"
              >
                <div className="flex items-center space-x-2">
                  <RadioGroupItem
                    className="data-[state=checked]:text-secondary"
                    value="true"
                    id="allowMultiAccounts-yes"
                  />
                  <Label htmlFor="allowMultiAccounts-yes">Yes</Label>
                </div>
                <div className="flex items-center space-x-2">
                  <RadioGroupItem
                    className="text-secondary"
                    value="false"
                    id="allowMultiAccounts-no"
                  />
                  <Label htmlFor="allowMultiAccounts-no">No</Label>
                </div>
              </RadioGroup>
            )}
          />
          {errors.allowMultiAccounts && (
            <ErrorText
              message={
                errors.allowMultiAccounts.message ||
                "Invalid allow multiple accounts value"
              }
            />
          )}
        </div>
        <Button variant={"secondary"} disabled={isLoading}>
          {!isLoading && (
            <div className="flex gap-2">
              <span>Post task</span>
              <div className="flex items-center gap-1">
                (<span>{total}</span>
                <PointsIcon />)
              </div>
            </div>
          )}
          {isLoading && (
            <div className="flex items-center gap-4">
              <Spinner className="size-4" />
              <span>Creating ...</span>
            </div>
          )}
        </Button>
        {errors.root && (
          <ErrorText
            message={errors.root.message || "An expected error occured"}
          />
        )}
      </div>
    </form>
  );
}

"use client";
import ErrorText from "@/components/ErrorText";
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
import { Textarea } from "@/components/ui/textarea";
import PointsIcon from "@/components/vectors/PointIcon";
import createTaskSchema from "@/lib/schemas/createTaskSchema";
import { zodResolver } from "@hookform/resolvers/zod";
import { Controller, useForm } from "react-hook-form";
import z from "zod";

export default function CreateTaskForm() {
  const {
    watch,
    control,
    handleSubmit,
    register,
    formState: { errors, isLoading },
    setError,
  } = useForm({ resolver: zodResolver(createTaskSchema) });
  console.log(errors);
  const onSubmit = async function (data: z.output<typeof createTaskSchema>) {
    console.log(data);
  };
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
          {/* {errors.email && (
          <ErrorText message={errors.email.message || "Invalid email"} />
        )} */}
        </div>
        <div className="grid gap-2">
          <Label htmlFor="description">Description</Label>
          <Textarea
            className=""
            {...register("description")}
            id="description"
            placeholder="Just like the post"
          />
          {/* {errors.email && (
          <ErrorText message={errors.email.message || "Invalid email"} />
        )} */}
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
                    <SelectItem value="facebook">Facebook</SelectItem>
                    <SelectItem value="youtube">Youtube</SelectItem>
                    <SelectItem value="instagram">Instagram</SelectItem>
                  </SelectContent>
                </Select>
              )}
            />
            {/* {errors.email && (
          <ErrorText message={errors.email.message || "Invalid email"} />
        )} */}
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
            {/* {errors.email && (
          <ErrorText message={errors.email.message || "Invalid email"} />
        )} */}
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
            {/* {errors.email && (
          <ErrorText message={errors.email.message || "Invalid email"} />
        )} */}
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
            {/* {errors.email && (
          <ErrorText message={errors.email.message || "Invalid email"} />
        )} */}
          </div>
        </div>
        <Button variant={"secondary"}>
          <div className="flex gap-2">
            <span>Post task</span>
            <div className="flex items-center gap-1">
              (<span>{total}</span>
              <PointsIcon />)
            </div>
          </div>
        </Button>
      </div>
    </form>
  );
}

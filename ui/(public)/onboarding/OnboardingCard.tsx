"use client";

import { cn } from "@/lib/utils";
import { Button } from "@/components/ui/button";
import { Card, CardContent } from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import LogoText from "@/components/Logo";
import { SubmitHandler, useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import ErrorText from "@/components/ErrorText";
import z from "zod";
import onboardingSchema from "@/lib/schemas/onboardingSchema";
import { useUpdateUser } from "@/hooks/useUpdateUser";
import { useEffect, useMemo } from "react";
import { useUser } from "@/hooks/useUser";
import { useRouter } from "next/navigation";
import { useSession } from "next-auth/react";
import { Spinner } from "@/components/ui/spinner";

export default function OnboardingCard({
  className,
  ...props
}: React.ComponentProps<"div">) {
  const { update } = useSession();
  const {
    data: user,
    isLoading: userIsLoading,
    isSuccess: userIsSuccess,
  } = useUser();
  const router = useRouter();
  const randUsername = useMemo(
    () =>
      `GG_${user?.name?.split(" ")[0] || "user"}_${Math.floor(
        Math.random() * 1000
      )}`,
    []
  );
  const {
    handleSubmit,
    register,
    formState: { errors, isLoading },
    reset,
    setError,
  } = useForm({
    resolver: zodResolver(onboardingSchema),
    defaultValues: {
      firstname: "",
      lastname: "",
      username: "",
    },
  });
  const { mutate } = useUpdateUser();
  const onSubmit: SubmitHandler<z.output<typeof onboardingSchema>> = function (
    data
  ) {
    mutate(data, {
      onSuccess: async (data) => {
        const fields = ["firstname", "lastname", "username"] as const;
        console.log(data);
        if (!data.success) {
          for (const field of fields) {
            if (field in data.errors)
              setError(field, {
                message: data.errors[field]!.message,
              });
          }
        }
        if (data.success) {
          await update();
          router.push("/dashboard");
        }
      },
    });
  };

  useEffect(() => {
    if (userIsSuccess && user) {
      const defaultData = {
        firstname: user.firstname || user.name?.split(" ")[0] || "",
        lastname: user.lastname || user.name?.split(" ")[1] || "",
        username: user.username || randUsername,
      };
      reset(defaultData);
    }
  }, [userIsSuccess, user, randUsername, reset]);

  if (userIsLoading)
    return (
      <div className="">
        <Spinner className="size-20 text-secondary mx-auto mt-26" />
      </div>
    );
  return (
    <div className={cn("flex flex-col gap-6", className)} {...props}>
      <Card className="overflow-hidden">
        <CardContent className="p-0">
          <form className="p-6 md:p-8" onSubmit={handleSubmit(onSubmit)}>
            <div className="flex flex-col gap-6">
              <div className="flex flex-col items-center text-center">
                <h1 className="text-2xl font-bold my-4">Just one step left</h1>
                <p className="text-muted-foreground flex gap-x-2  items-center flex-wrap justify-center">
                  <span>Welcome to</span> <LogoText size="sm" />{" "}
                  <span>! Let's Complete Your Profile</span>
                </p>
              </div>
              <div className="grid grid-cols-2 gap-6">
                <div className="grid gap-2">
                  <Label htmlFor="firstname">Firstname</Label>
                  <Input
                    {...register("firstname")}
                    id="firstname"
                    type="text"
                    placeholder="Elon"
                    required
                  />
                  {errors.firstname && (
                    <ErrorText
                      message={errors.firstname.message || "Invalid firstname"}
                    />
                  )}
                </div>
                <div className="grid gap-2">
                  <Label htmlFor="lastname">Lastname</Label>
                  <Input
                    {...register("lastname")}
                    id="lastname"
                    type="text"
                    placeholder="Musk"
                    required
                  />
                  {errors.lastname && (
                    <ErrorText
                      message={errors.lastname.message || "Invalid lastname"}
                    />
                  )}
                </div>
              </div>
              <div className="grid gap-2">
                <Label htmlFor="username">Username</Label>
                <Input
                  {...register("username")}
                  id="username"
                  type="text"
                  placeholder="abcd123"
                  required
                />
                {errors.username && (
                  <ErrorText
                    message={errors.username.message || "Invalid username"}
                  />
                )}
              </div>

              <div className="grid gap-2">
                <Label htmlFor="email">Email</Label>
                <Input
                  id="email"
                  type="email"
                  name="email"
                  disabled={true}
                  placeholder="m@example.com"
                  defaultValue={user?.email || ""}
                />
              </div>
              <Button
                variant={"secondary"}
                disabled={isLoading}
                type="submit"
                className="w-full"
              >
                Confirm
              </Button>

              {errors.root && (
                <ErrorText
                  message={errors.root.message || "Unexepected error occurs"}
                />
              )}
            </div>
          </form>
        </CardContent>
      </Card>
    </div>
  );
}

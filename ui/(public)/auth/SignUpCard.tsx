"use client";

import { cn } from "@/lib/utils";
import { Button } from "@/components/ui/button";
import { Card, CardContent } from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import Link from "next/link";
import LogoText from "@/components/Logo";
import ToSAndPP from "@/components/ToSAndPP";
import { SubmitHandler, useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import signUpSchema from "@/lib/schemas/signUpSchema";
import ErrorText from "@/components/ErrorText";
import { Checkbox } from "@/components/ui/checkbox";
import z from "zod";
import { signIn } from "next-auth/react";
import apiAxios from "@/lib/apiAxios";
import { AuthResponse } from "@/types";
import SocialLogin from "./SocialLogin";
import { Controller } from "react-hook-form";

export function SignUpCard({
  className,
  ...props
}: React.ComponentProps<"div">) {
  const {
    handleSubmit,
    register,
    control,
    formState: { errors, isLoading },
    setError,
    watch,
  } = useForm({
    resolver: zodResolver(signUpSchema),
  });
  const onSubmit: SubmitHandler<z.output<typeof signUpSchema>> =
    async function ({ email, password, firstname, lastname, username }) {
      try {
        const response = await apiAxios.post<AuthResponse>("/auth/register", {
          firstname,
          lastname,
          username,
          email,
          password,
        });

        const data = response.data;
        if (data.success) {
          const result = await signIn("credentials", {
            email,
            password,
            redirect: true,
            callbackUrl: "/dashboard",
          });

          if (result?.error) {
            setError("root", { message: result.error });
          }
        } else {
          const fields = [
            "firstname",
            "lastname",
            "username",
            "email",
            "password",
            "root",
          ] as const;
          for (const field of fields) {
            if (field in data.errors)
              setError(field, {
                message: data.errors[field]!.message,
              });
          }
        }
      } catch {
        setError("root", { message: "An error occurred during registration" });
      }
    };
  return (
    <div className={cn("flex flex-col gap-6", className)} {...props}>
      <Card className="overflow-hidden">
        <CardContent className="p-0">
          <form className="p-6 md:p-8" onSubmit={handleSubmit(onSubmit)}>
            <div className="flex flex-col gap-6">
              <div className="flex flex-col items-center text-center">
                <h1 className="text-2xl font-bold">Welcome !!!</h1>
                <p className="text-muted-foreground flex gap-x-2  items-center flex-wrap justify-center">
                  <span>Create a new a new </span> <LogoText size="sm" />{" "}
                  <span>account to start your journey with </span>
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
                  {...register("email")}
                  id="email"
                  type="email"
                  placeholder="m@example.com"
                  required
                />
                {errors.email && (
                  <ErrorText
                    message={errors.email.message || "Invalid email"}
                  />
                )}
              </div>
              <div className="grid gap-2">
                <Label htmlFor="password">Password</Label>
                <Input
                  {...register("password")}
                  id="password"
                  type="password"
                  required
                />
                {errors.password && (
                  <ErrorText
                    message={errors.password.message || "Invalid password"}
                  />
                )}
              </div>
              <div className="grid gap-2">
                <Label htmlFor="confirm_password">Confirm Password</Label>
                <Input
                  {...register("confirm_password")}
                  id="confirm_password"
                  type="password"
                  required
                />
                {errors.confirm_password && (
                  <ErrorText
                    message={
                      errors.confirm_password.message ||
                      "Invalid confirm password"
                    }
                  />
                )}
              </div>

              <div className="flex flex-col gap-2">
                <div className="flex items-center gap-2">
                  <Controller
                    control={control}
                    name="acceptedTerms"
                    render={({ field }) => (
                      <Checkbox
                        id="acceptedTerms"
                        checked={field.value}
                        onCheckedChange={field.onChange}
                      />
                    )}
                  />
                  <Label
                    htmlFor="acceptedTerms"
                    className="text-sm font-medium leading-none cursor-pointer"
                  >
                    I accept the{" "}
                    <Link href="/terms" className="text-primary hover:underline">
                      Terms of Service
                    </Link>{" "}
                    and{" "}
                    <Link
                      href="/privacy-policy"
                      className="text-primary hover:underline"
                    >
                      Privacy Policy
                    </Link>
                  </Label>
                </div>
                {errors.acceptedTerms && (
                  <ErrorText
                    message={
                      errors.acceptedTerms.message ||
                      "You must accept the terms"
                    }
                  />
                )}
              </div>
              <Button
                variant={"secondary"}
                disabled={isLoading}
                type="submit"
                className="w-full"
              >
                Sign Up
              </Button>
              <div className="relative text-center text-sm after:absolute after:inset-0 after:top-1/2 after:z-0 after:flex after:items-center after:border-t after:border-border">
                <span className="relative z-10 bg-card px-2 text-muted-foreground">
                  Or continue with
                </span>
              </div>
              <SocialLogin acceptedTerms={watch("acceptedTerms")} />
              {errors.root && (
                <ErrorText
                  message={errors.root.message || "Unexepected error occurs"}
                />
              )}
            </div>
          </form>
        </CardContent>
      </Card>
      <ToSAndPP />
    </div>
  );
}

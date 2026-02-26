"use client";

import { cn } from "@/lib/utils";
import { Button } from "@/components/ui/button";
import { Card, CardContent } from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import Link from "next/link";
import LogoText from "@/components/Logo";
import ToSAndPP from "@/components/ToSAndPP";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import loginSchema from "@/lib/schemas/loginSchema";
import ErrorText from "@/components/ErrorText";
import { Checkbox } from "@/components/ui/checkbox";
import z from "zod";
import { signIn } from "next-auth/react";
import { useRouter } from "next/navigation";
import SocialLogin from "./SocialLogin";
import { Controller } from "react-hook-form";

export function LoginCard({
  className,
  ...props
}: React.ComponentProps<"div">) {
  const router = useRouter();
  const {
    handleSubmit,
    register,
    control,
    formState: { errors, isLoading },
    setError,
    watch,
  } = useForm({
    resolver: zodResolver(loginSchema),
  });
  const onSubmit = async function ({
    email,
    password,
  }: z.output<typeof loginSchema>) {
    try {
      const result = await signIn("credentials", {
        email,
        password,
        redirect: false,
      });

      if (result?.error) {
        setError("root", { message: "Invalid email or password" });
      } else {
        setTimeout(() => {
          router.replace("/dashboard");
        }, 500);
      }
    } catch {
      setError("root", {
        message: "An error occurred during login. Please try again.",
      });
    }
  };
  return (
    <div className={cn("flex flex-col gap-6", className)} {...props}>
      <Card className="overflow-hidden">
        <CardContent className="p-0">
          <form className="p-6 md:p-8" onSubmit={handleSubmit(onSubmit)}>
            <div className="flex flex-col gap-6">
              <div className="flex flex-col items-center text-center">
                <h1 className="text-2xl font-bold">Welcome back</h1>
                <p className="text-balance text-muted-foreground flex gap-2 items-center">
                  <span>Login to your</span>
                  <LogoText size="sm" />
                  <span>account </span>
                </p>
              </div>
              <div className="grid gap-2">
                <Label htmlFor="email">Email</Label>
                <Input
                  className=""
                  {...register("email")}
                  id="email"
                  type="email"
                  placeholder="m@example.com"
                />
                {errors.email && (
                  <ErrorText
                    message={errors.email.message || "Invalid email"}
                  />
                )}
              </div>
              <div className="grid gap-2">
                <div className="flex items-center">
                  <Label htmlFor="password">Password</Label>
                  <a
                    href="#"
                    className="ml-auto text-sm underline-offset-2 hover:underline"
                  >
                    Forgot your password?
                  </a>
                </div>
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
                Login
              </Button>
              <div className="relative text-center text-sm after:absolute after:inset-0 after:top-1/2 after:z-0 after:flex after:items-center after:border-t after:border-border">
                <span className="relative z-10 bg-card px-2 text-muted-foreground">
                  Or continue with
                </span>
              </div>
              <SocialLogin acceptedTerms={watch("acceptedTerms")} />
              <div className="text-center text-sm">
                Don&apos;t have an account?{" "}
                <Link
                  href="/auth/signup"
                  className="underline underline-offset-4"
                >
                  Sign up
                </Link>
              </div>
              {errors.root && (
                <ErrorText
                  message={errors.root.message || "Unknown error occurred"}
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

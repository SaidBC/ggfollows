"use client";
import Link from "next/link";
import {
  InputOTP,
  InputOTPGroup,
  InputOTPSlot,
} from "@/components/ui/input-otp";
import { REGEXP_ONLY_DIGITS } from "input-otp";
import { Button } from "@/components/ui/button";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import emailVerifySchema from "@/lib/schemas/emailVerifySchema";
import z from "zod";
import { verifyEmailCodeAction } from "@/lib/actions";
import {
  Form,
  FormControl,
  FormDescription,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from "@/components/ui/form";
import ErrorText from "@/components/ErrorText";

export default function VerifyEmailForm() {
  const form = useForm({
    resolver: zodResolver(emailVerifySchema),
  });
  const onSubmit = async function (data: z.output<typeof emailVerifySchema>) {
    try {
      const { success, field, message } = await verifyEmailCodeAction(data);
      if (!success) return form.setError(field, { message: message });
    } catch (error) {
      form.setError("root", { message: "Unexpected error occurs" });
    }
  };
  return (
    <Form {...form}>
      <form onSubmit={form.handleSubmit(onSubmit)} className="w-2/3 space-y-6">
        <FormField
          control={form.control}
          name="code"
          render={({ field }) => (
            <FormItem>
              <FormLabel>Code</FormLabel>
              <FormControl>
                <InputOTP {...field} maxLength={6} pattern={REGEXP_ONLY_DIGITS}>
                  <InputOTPGroup>
                    {Array.from({ length: 6 }, (_, i) => (
                      <InputOTPSlot
                        key={i}
                        index={i}
                        className="h-16 w-16 text-3xl"
                      />
                    ))}
                  </InputOTPGroup>
                </InputOTP>
              </FormControl>
              <FormDescription className="text-sm text-muted-foreground mt-4">
                If you didn&apos;t receive the email,{" "}
                <Link
                  href="/resend-verification"
                  className="text-blue-500 hover:underline"
                >
                  click here to resend the verification email
                </Link>
                .
              </FormDescription>
              <FormMessage />
            </FormItem>
          )}
        />
        <Button type="submit">Verify</Button>
        {form.formState.errors.root && (
          <ErrorText
            message={
              form.formState.errors.root.message || "Unexpected error occurs"
            }
          />
        )}
      </form>
    </Form>
  );
}

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
import { IconCheck, IconLoader2, IconRefresh } from "@tabler/icons-react";
import { cn } from "@/lib/utils";

export default function VerifyEmailForm() {
  const form = useForm({
    resolver: zodResolver(emailVerifySchema),
    defaultValues: {
      code: "",
    },
  });

  const { isSubmitting } = form.formState;

  const onSubmit = async function (data: z.output<typeof emailVerifySchema>) {
    try {
      const { success, field, message } = await verifyEmailCodeAction(data);
      if (!success) return form.setError(field as any, { message: message });
    } catch (error) {
      form.setError("root", { message: "Unexpected error occurred" });
    }
  };

  return (
    <Form {...form}>
      <form onSubmit={form.handleSubmit(onSubmit)} className="w-full flex flex-col items-center gap-10">
        <FormField
          control={form.control}
          name="code"
          render={({ field }) => (
            <FormItem className="flex flex-col items-center gap-6">
              <FormLabel className="text-xs font-black uppercase tracking-[0.2em] text-muted-foreground/60">Verification Code</FormLabel>
              <FormControl>
                <InputOTP 
                  {...field} 
                  maxLength={6} 
                  pattern={REGEXP_ONLY_DIGITS}
                  className="gap-2"
                >
                  <InputOTPGroup className="gap-3">
                    {Array.from({ length: 6 }, (_, i) => (
                      <InputOTPSlot
                        key={i}
                        index={i}
                        className={cn(
                          "h-16 w-12 sm:w-16 sm:h-20 text-3xl font-black rounded-2xl border-border/50 bg-background/50 transition-all duration-300",
                          "focus-within:ring-4 focus-within:ring-secondary/20 focus-within:border-secondary/50",
                          "group-data-[focus=true]:border-secondary group-data-[focus=true]:bg-secondary/5"
                        )}
                      />
                    ))}
                  </InputOTPGroup>
                </InputOTP>
              </FormControl>
              
              <FormDescription className="text-sm font-medium text-muted-foreground/80 flex items-center gap-1.5">
                Didn&apos;t receive it?{" "}
                <Link
                  href="/resend-verification"
                  className="text-secondary hover:text-secondary/80 font-bold transition-colors flex items-center gap-1 group"
                >
                  <IconRefresh size={14} className="group-hover:rotate-180 transition-transform duration-500" />
                  Resend Email
                </Link>
              </FormDescription>
              <FormMessage className="text-center font-bold" />
            </FormItem>
          )}
        />

        <div className="w-full max-w-sm space-y-4">
          <Button 
            type="submit" 
            disabled={isSubmitting}
            className="w-full h-14 rounded-2xl bg-secondary text-secondary-foreground font-black text-lg shadow-xl shadow-secondary/20 hover:shadow-secondary/30 hover:bg-secondary/90 transition-all active:scale-[0.98]"
          >
            {isSubmitting ? (
              <IconLoader2 className="animate-spin" size={24} />
            ) : (
              <div className="flex items-center gap-2">
                <IconCheck size={24} strokeWidth={3} />
                Verify Account
              </div>
            )}
          </Button>

          {form.formState.errors.root && (
            <div className="animate-in fade-in slide-in-from-top-2">
              <ErrorText
                message={
                  form.formState.errors.root.message || "An unexpected error occurred."
                }
              />
            </div>
          )}
        </div>
      </form>
    </Form>
  );
}

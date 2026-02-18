import VerifyEmailCard from "@/ui/(private)/verify-email/VerifyEmailCard";
import apiAxios from "@/lib/apiAxios";
import { SendEmailCodeResponse } from "@/types";
import { cookies } from "next/headers";
import { Metadata } from "next";

export const metadata: Metadata = {
  title: "Verify Your Email — GGfollows",
  description:
    "Verify your email address to secure your GGfollows account and access full platform features.",
  keywords: [
    "email verification",
    "verify email",
    "ggfollows verify",
    "account verification",
  ],
  openGraph: {
    title: "Verify Your Email — GGfollows",
    description:
      "Complete your email verification to unlock your account features.",
    type: "website",
  },
};

export default async function Page() {
  const cookieStore = await cookies();
  const response = await apiAxios.post<SendEmailCodeResponse>(
    "/send-email-code",
    { reason: "EMAIL_VERIFICATION" },
    {
      headers: {
        cookie: cookieStore.toString(),
      },
    }
  );

  return (
    <div className="flex flex-1 flex-col relative overflow-hidden items-center justify-center min-h-[calc(100vh-64px)] pt-8">
      {/* Decorative background elements */}
      <div className="absolute top-0 left-0 w-full h-full pointer-events-none">
        <div className="absolute top-[10%] left-[5%] w-[40%] h-[40%] bg-secondary/5 blur-[120px] rounded-full animate-pulse" />
        <div className="absolute bottom-[10%] right-[5%] w-[30%] h-[30%] bg-secondary/5 blur-[100px] rounded-full animate-pulse [animation-delay:2s]" />
      </div>

      <div className="relative z-10 w-full max-w-lg px-4 flex flex-col items-center gap-8">
        {!response.data.success && (
          <div className="w-full p-4 rounded-2xl bg-destructive/10 border border-destructive/20 text-destructive text-sm font-bold text-center animate-in fade-in slide-in-from-top-4 duration-500">
            {response.data.errors.root?.message || "An unexpected error occurred while sending the code."}
          </div>
        )}
        
        <div className="text-center space-y-2 animate-in fade-in slide-in-from-top-8 duration-700">
          <h1 className="text-4xl font-black tracking-tighter text-foreground uppercase">Verify Your Email</h1>
          <p className="text-muted-foreground font-medium">Protect your account and unlock all features.</p>
        </div>

        <div className="w-full animate-in fade-in zoom-in-95 duration-1000 delay-200 fill-mode-both">
          <VerifyEmailCard />
        </div>
      </div>
    </div>
  );
}

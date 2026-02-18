import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import VerifyEmailForm from "./VerifyEmaliForm";
import { IconMailOpened } from "@tabler/icons-react";

export default function VerifyEmailCard() {
  return (
    <Card className="relative overflow-hidden border-border/50 bg-card/40 backdrop-blur-xl shadow-2xl shadow-secondary/5 rounded-[2.5rem]">
      {/* Subtle glow effect */}
      <div className="absolute top-0 right-0 -translate-y-1/2 translate-x-1/4 w-64 h-64 bg-secondary/10 blur-[80px] rounded-full pointer-events-none" />
      
      <CardHeader className="relative space-y-4 pt-10 pb-2 flex flex-col items-center">
        <div className="p-4 rounded-3xl bg-secondary/10 text-secondary shadow-inner border border-secondary/20 animate-in zoom-in-50 duration-500">
          <IconMailOpened size={40} strokeWidth={1.5} />
        </div>
        <div className="text-center space-y-1.5">
          <CardTitle className="text-2xl font-black tracking-tight uppercase">Check Your Inbox</CardTitle>
          <CardDescription className="text-muted-foreground/80 font-medium">
            We&apos;ve sent a 6-digit verification code to your email address.
          </CardDescription>
        </div>
      </CardHeader>
      <CardContent className="relative pt-6 pb-10 flex justify-center">
        <VerifyEmailForm />
      </CardContent>
    </Card>
  );
}

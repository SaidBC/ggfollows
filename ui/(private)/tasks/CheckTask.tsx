"use client";
import ErrorText from "@/components/ErrorText";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Spinner } from "@/components/ui/spinner";
import { useCheckTask } from "@/hooks/useCheckTask";
import checkTaskSchema from "@/lib/schemas/checkTaskSchema";
import { IconX, IconCheck, IconUser } from "@tabler/icons-react";
import { useEffect, useRef, useState } from "react";
import z from "zod";
import { cn } from "@/lib/utils";

export default function CheckTask({ taskId }: { taskId: string }) {
  const [checking, setChecking] = useState(false);
  const [inputValue, setInputValue] = useState("");
  const [error, setError] = useState({ message: "" });
  const inputRef = useRef<HTMLInputElement>(null);
  const { mutate, isPending } = useCheckTask({ taskId });

  useEffect(() => {
    if (checking) {
      inputRef.current?.focus();
    }
  }, [checking]);

  const onSubmit = () => {
    const validatedData = checkTaskSchema.safeParse({
      platformUsername: inputValue,
    });

    if (!validatedData.success) {
      return setError({
        message:
          z.flattenError(validatedData.error).fieldErrors
            .platformUsername?.[0] || "Invalid platform username",
      });
    }

    setError({ message: "" });
    mutate(validatedData.data, {
      onSuccess: (res) => {
        if (!res.success) {
          setError({
            message:
              res.errors.root?.message ||
              res.errors.platformUsername?.message ||
              "Unexpected error occurred",
          });
        } else {
          setChecking(false);
          setInputValue("");
        }
      },
    });
  };

  return (
    <div className="relative">
      {!checking ? (
        <Button 
          onClick={() => setChecking(true)} 
          variant="secondary"
          className="rounded-xl font-bold h-9 px-5 shadow-lg shadow-secondary/10 hover:shadow-secondary/20 transition-all active:scale-95"
        >
          <IconCheck size={16} className="mr-1.5" strokeWidth={3} />
          Claim
        </Button>
      ) : (
        <div className="flex flex-col gap-2 p-3 rounded-2xl bg-muted/30 border border-secondary/20 backdrop-blur-md animate-in fade-in slide-in-from-right-4 duration-300">
          <div className="flex items-center justify-between gap-3">
             <div className="flex flex-col gap-1.5 flex-grow">
               <Label htmlFor="platformUsername" className="text-[10px] font-black uppercase tracking-widest text-muted-foreground ml-1">
                 Your Platform ID
               </Label>
               <div className="relative">
                 <IconUser size={14} className="absolute left-2.5 top-1/2 -translate-y-1/2 text-muted-foreground/60" />
                 <Input
                   id="platformUsername"
                   ref={inputRef}
                   type="text"
                   placeholder="@username"
                   className="h-9 pl-8 rounded-lg bg-card/50 border-border/50 focus:ring-secondary/30 text-sm font-medium"
                   value={inputValue}
                   onChange={(e) => setInputValue(e.target.value)}
                   onKeyDown={(e) => e.key === 'Enter' && onSubmit()}
                 />
               </div>
             </div>
             
             <div className="flex flex-col gap-1.5">
               <span className="h-4" /> {/* Spacer to align with Label */}
               <div className="flex gap-1.5">
                  <Button
                    disabled={isPending}
                    onClick={onSubmit}
                    variant="secondary"
                    size="sm"
                    className="h-9 px-3 rounded-lg font-bold"
                  >
                    {isPending ? <Spinner className="size-3.5" /> : "Verify"}
                  </Button>
                  <Button
                    disabled={isPending}
                    onClick={() => {
                      setInputValue("");
                      setChecking(false);
                      setError({ message: "" });
                    }}
                    variant="ghost"
                    size="icon"
                    className="h-9 w-9 rounded-lg hover:bg-destructive/10 hover:text-destructive transition-colors"
                  >
                    <IconX size={18} />
                  </Button>
               </div>
             </div>
          </div>
          
          {error.message && (
            <div className="px-1 animate-in shake-1 duration-300">
              <ErrorText message={error.message} />
            </div>
          )}
        </div>
      )}
    </div>
  );
}

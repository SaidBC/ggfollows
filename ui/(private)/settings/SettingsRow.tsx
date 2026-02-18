"use client";

import { useState, useRef, useEffect } from "react";
import { useUpdateUser } from "@/hooks/useUpdateUser";
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";
import ErrorText from "@/components/ErrorText";
import { toast } from "sonner";
import { useSession } from "next-auth/react";
import { cn } from "@/lib/utils";
import { IconEdit, IconCheck, IconX, IconLoader2 } from "@tabler/icons-react";

interface Props {
  label: string;
  field: string;
  value: string | null;
  type?: string;
  description?: string;
}

export default function SettingRow({
  label,
  field,
  value,
  type = "text",
  description,
  ...props
}: Props & React.ComponentProps<"input">) {
  const { update } = useSession();
  const [editing, setEditing] = useState(false);
  const [inputValue, setInputValue] = useState(value || "");
  const inputRef = useRef<HTMLInputElement>(null);
  const { mutate, isPending, isSuccess, data } = useUpdateUser();

  useEffect(() => {
    if (editing) {
      inputRef.current?.focus();
    }
  }, [editing]);

  const onSubmit = () => {
    if (inputValue === value) {
      setEditing(false);
      return;
    }

    mutate(
      { [field]: inputValue },
      {
        onSuccess: async (res) => {
          if (res.success) {
            setEditing(false);
            await update({ user: res.data });
            return toast.success(`${label} updated successfully!`);
          } else {
            toast.error(
              (!res.success && res.errors[field]?.message) ||
                res.errors.root?.message ||
                "Unexpected error occurred"
            );
          }
        },
        onError: () => {
          toast.error(`Failed to update ${label}. Please try again.`);
        },
      }
    );
  };

  return (
    <div className="group relative flex flex-col gap-4 p-5 rounded-2xl bg-card/30 border border-border/50 hover:bg-card/40 transition-all duration-300">
      <div className="flex items-start justify-between gap-4">
        <div className="space-y-1 overflow-hidden">
          <h3 className="text-sm font-bold text-foreground tracking-wide uppercase">{label}</h3>
          {description && (
            <p className="text-xs text-muted-foreground leading-relaxed">
              {description}
            </p>
          )}
        </div>
        
        {!editing && (
          <Button 
            onClick={() => setEditing(true)} 
            variant="ghost" 
            size="sm"
            className="h-8 px-3 rounded-lg text-secondary hover:bg-secondary/10 hover:text-secondary font-bold transition-all active:scale-95"
          >
            <IconEdit size={14} className="mr-1.5" />
            Edit
          </Button>
        )}
      </div>

      <div className="flex flex-col sm:flex-row items-start sm:items-center gap-3">
        <div className="relative w-full overflow-hidden">
          <Input
            ref={inputRef}
            type={type}
            value={inputValue}
            onChange={(e) => setInputValue(e.target.value)}
            disabled={!editing}
            className={cn(
              "h-11 transition-all duration-300 rounded-xl bg-muted/20 border-border/50",
              editing ? "bg-background border-secondary/50 ring-2 ring-secondary/10" : "cursor-default text-muted-foreground"
            )}
            {...props}
          />
        </div>

        {editing && (
          <div className="flex items-center gap-2 w-full sm:w-auto shrink-0 animate-in fade-in slide-in-from-right-2 duration-300">
            <Button
              disabled={isPending}
              onClick={onSubmit}
              className="grow sm:grow-0 h-11 px-5 rounded-xl bg-secondary text-secondary-foreground font-bold shadow-lg shadow-secondary/10 hover:shadow-secondary/20 hover:bg-secondary/90 transition-all"
            >
              {isPending ? (
                <IconLoader2 size={18} className="animate-spin" />
              ) : (
                <>
                  <IconCheck size={18} className="mr-1.5" />
                  Save
                </>
              )}
            </Button>
            <Button
              disabled={isPending}
              onClick={() => {
                setInputValue(value || "");
                setEditing(false);
              }}
              variant="outline"
              className="h-11 w-11 p-0 rounded-xl border-border/50 hover:bg-destructive/10 hover:text-destructive hover:border-destructive/20 transition-all"
            >
              <IconX size={18} />
            </Button>
          </div>
        )}
      </div>

      {isSuccess && !data.success && (
        <div className="px-1 animate-in fade-in slide-in-from-top-1">
          <ErrorText
            message={
              (!data.success && data.errors[field]?.message) ||
              data.errors.root?.message ||
              "Unexpected error occurred"
            }
          />
        </div>
      )}
    </div>
  );
}

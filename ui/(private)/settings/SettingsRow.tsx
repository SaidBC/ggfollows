"use client";

import { useState, useRef, useEffect } from "react";
import { useUpdateUser } from "@/hooks/useUpdateUser";
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";
import ErrorText from "@/components/ErrorText";
import { toast } from "sonner";
import { useSession } from "next-auth/react";

interface Props {
  label: string;
  field: string;
  value: string | null;
  type?: string;
}

export default function SettingRow({
  label,
  field,
  value,
  type = "text",
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
    mutate(
      { [field]: inputValue },
      {
        onSuccess: async (res) => {
          if (res.success) {
            setEditing(false);
            await update(res.data);
            return toast.success(`${label} updated successfully!`);
          } else {
            toast.error(
              (!res.success && res.errors[field]?.message) ||
                res.errors.root?.message ||
                "Unexpected error occured"
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
    <div className="grid grid-cols-[1fr_2fr_1fr] gap-4 border-b pb-4">
      <h3 className="font-bold text-sm">{label}</h3>
      <Input
        ref={inputRef}
        type={type}
        value={inputValue}
        onChange={(e) => setInputValue(e.target.value)}
        disabled={!editing}
        {...props}
      />
      {!editing && (
        <Button onClick={() => setEditing(true)} variant="secondary">
          Update {label}
        </Button>
      )}
      {editing && (
        <div className="flex items-center gap-2">
          <Button
            disabled={isPending}
            onClick={onSubmit}
            variant="secondary"
            className="grow"
          >
            Confirm
          </Button>
          <Button
            disabled={isPending}
            onClick={() => {
              setInputValue(value || "");
              setEditing(false);
            }}
            variant="destructive"
          >
            Cancel
          </Button>
        </div>
      )}
      {isSuccess && !data.success && (
        <ErrorText
          message={
            (!data.success && data.errors[field]?.message) ||
            data.errors.root?.message ||
            "Unexpected error occured"
          }
        />
      )}
    </div>
  );
}

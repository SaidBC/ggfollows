"use client";
import ErrorText from "@/components/ErrorText";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Spinner } from "@/components/ui/spinner";
import { useCheckTask } from "@/hooks/useCheckTask";
import checkTaskSchema from "@/lib/schemas/checkTaskSchema";
import { IconX } from "@tabler/icons-react";
import { useEffect, useRef, useState } from "react";

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
    if (!validatedData.success)
      return setError({ message: validatedData.error.message });
    mutate(validatedData.data, {
      onSuccess: (res) => {
        if (!res.success) {
          setError({
            message:
              res.errors.root?.message ||
              res.errors.platformUsername?.message ||
              "Unexpected error occures",
          });
        }
      },
    });
  };

  return (
    <div>
      {!checking && (
        <Button onClick={() => setChecking(true)} variant={"secondary"}>
          Check
        </Button>
      )}
      {checking && (
        <div className="flex items-center gap-2">
          <div className="flex gap-2">
            <Label htmlFor="platformUsername">Platform username:</Label>
            <Input
              id="platformUsername"
              ref={inputRef}
              type={"text"}
              value={inputValue}
              onChange={(e) => setInputValue(e.target.value)}
            />
          </div>
          <Button
            disabled={isPending}
            onClick={onSubmit}
            variant="secondary"
            className="grow-1"
          >
            {!isPending && <span>Confirm</span>}
            {isPending && (
              <div className="flex items-center gap-4">
                <Spinner className="size-4" />
                <span>Confirming ...</span>
              </div>
            )}
          </Button>
          <Button
            disabled={isPending}
            onClick={() => {
              setInputValue("");
              setChecking(false);
            }}
            variant="destructive"
            size={"icon"}
          >
            <IconX />
          </Button>
        </div>
      )}
      {error.message && <ErrorText message={error.message} />}
    </div>
  );
}

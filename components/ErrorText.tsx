import { cn } from "@/lib/utils";

interface ErrorTextProps {
  id?: string;
  message: string;
  className?: string;
}

export default function ErrorText({
  id,
  message,
  className = "",
}: ErrorTextProps) {
  return (
    <p
      id={id}
      role="alert"
      aria-live="assertive"
      className={cn("text-sm text-red-500", className)}
    >
      {message}
    </p>
  );
}

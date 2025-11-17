import { cn } from "@/lib/utils";

export default function Logo({
  className,
  size,
}: {
  className?: string;
  size?: "xl" | "lg" | "md" | "sm";
}) {
  const sizes = {
    xl: ["text-5xl", "text-4xl"],
    lg: ["text-4xl", "text-3xl"],
    md: ["text-2xl", "text-xl"],
    sm: ["text-xl", "text-lg"],
  };
  return (
    <span className={cn("flex items-center gap-1", className)}>
      <span
        className={cn(
          `font-kablammo  text-secondary `,
          size ? sizes[size][0] : sizes.lg[0]
        )}
      >
        GG
      </span>
      <span
        className={cn(
          `font-caveat-brush text-white`,
          size ? sizes[size][1] : sizes.lg[1]
        )}
      >
        FOLLOWS
      </span>
    </span>
  );
}

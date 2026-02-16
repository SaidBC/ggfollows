import { Button } from "@/components/ui/button";
import Link from "next/link";
import { IconArrowRight } from "@tabler/icons-react";

export default function AuthButtons() {
  return (
    <div className="flex items-center gap-2">
      <Button
        variant="ghost"
        size="sm"
        asChild
        className="rounded-xl text-sm font-medium"
      >
        <Link href="/auth/login">Sign In</Link>
      </Button>
      <Button
        variant="secondary"
        size="sm"
        asChild
        className="rounded-xl text-sm font-medium"
      >
        <Link href="/auth/signup">
          Get Started
          <IconArrowRight size={14} />
        </Link>
      </Button>
    </div>
  );
}

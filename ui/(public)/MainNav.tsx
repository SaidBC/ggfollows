import { Button } from "@/components/ui/button";
import { cn } from "@/lib/utils";
import Link from "next/link";
import PublicNavLinks from "./PublicNavLinks";
import AuthButtons from "./AuthButtons";
import { authOptions } from "@/lib/auth";
import { getServerSession } from "next-auth";
import { IconLayoutDashboard } from "@tabler/icons-react";

export default async function MainNav({ className }: { className?: string }) {
  const session = await getServerSession(authOptions);

  return (
    <nav className={cn("flex items-center gap-1", className)}>
      <ul className="flex items-center gap-1">
        <PublicNavLinks />
      </ul>
      <div className="w-px h-5 bg-border mx-3" />
      {!session ? (
        <AuthButtons />
      ) : (
        <Button variant="secondary" size="sm" asChild className="rounded-xl">
          <Link href="/dashboard">
            <IconLayoutDashboard size={16} />
            Dashboard
          </Link>
        </Button>
      )}
    </nav>
  );
}

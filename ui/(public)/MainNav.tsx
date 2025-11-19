import { Button } from "@/components/ui/button";
import { cn } from "@/lib/utils";
import Link from "next/link";
import PublicNavLinks from "./PublicNavLinks";
import AuthButtons from "./AuthButtons";
import { authOptions } from "@/lib/auth";
import { getServerSession } from "next-auth";

export default async function MainNav({ className }: { className?: string }) {
  const session = await getServerSession(authOptions);

  return (
    <nav className={cn("flex flex-col gap-4", className)}>
      <ul className="flex items-center gap-8 text-lg font-bold">
        <PublicNavLinks />
        <li>
          {!session ? (
            <AuthButtons />
          ) : (
            <Button
              className={`font-bold font-kablammo`}
              variant={"secondary"}
              asChild
            >
              <Link href="/dashboard">GO TO Dashoboard</Link>
            </Button>
          )}
        </li>
      </ul>
    </nav>
  );
}

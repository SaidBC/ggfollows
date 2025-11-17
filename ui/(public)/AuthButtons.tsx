import { Button } from "@/components/ui/button";
import Link from "next/link";

export default function AuthButtons() {
  return (
    <ul className="flex gap-2">
      <li>
        <Button
          className={`font-bold font-kablammo`}
          variant={"secondary"}
          asChild
        >
          <Link href="/auth/login">Sign In</Link>
        </Button>
      </li>
      <li>
        <span className="text-sm">or</span>
      </li>
      <li>
        <Button
          className={`font-bold font-kablammo`}
          variant={"secondary"}
          asChild
        >
          <Link href="/auth/signup">Create Account</Link>
        </Button>
      </li>
    </ul>
  );
}

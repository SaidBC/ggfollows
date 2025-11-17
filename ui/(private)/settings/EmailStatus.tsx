import Link from "next/link";
import { Button } from "@/components/ui/button";

export default function EmailStatus({ verified }: { verified: boolean }) {
  return (
    <div className="grid grid-cols-[1fr_2fr_1fr] gap-4 border-b pb-4">
      <h3 className="font-bold text-sm">Email Status </h3>

      {verified && (
        <div>
          <div>
            <div className="flex items-center gap-2 text-green-700 bg-green-400 py-2 px-4 rounded-full">
              <div className="w-3 h-3 rounded-full bg-green-700 "></div>
              <span className="text-sm font-bold">Email Verified</span>
            </div>
          </div>
          <p className="text-sm text-muted-foreground">
            Your email is verified. You can change it anytime.
          </p>
        </div>
      )}
      {!verified && (
        <>
          <div>
            <div>
              <div className="flex items-center gap-2 text-red-800 bg-red-400 py-2 px-4 rounded-full">
                <div className="w-3 h-3 rounded-full bg-red-800 "></div>
                <span className="text-sm font-bold">Email Not Verified</span>
              </div>
            </div>
            <p className="text-sm text-muted-foreground">
              Please verify it by click the following
            </p>
          </div>
          <Button variant="secondary" asChild>
            <Link href="/verify-email" className="w-full">
              Verify Email
            </Link>
          </Button>
        </>
      )}
    </div>
  );
}

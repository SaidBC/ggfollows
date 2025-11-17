import Link from "next/link";

export default function ToSAndPP() {
  return (
    <div className="text-balance text-center text-xs text-muted-foreground [&_a]:underline [&_a]:underline-offset-4 hover:[&_a]:text-primary">
      By clicking continue, you agree to our{" "}
      <Link href="#">Terms of Service</Link> and{" "}
      <Link href="#">Privacy Policy</Link>.
    </div>
  );
}

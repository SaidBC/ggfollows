import Logo from "@/components/Logo";

export default function Footer() {
  return (
    <footer className="w-screen bg-card text-card-foreground border-t text-sm text-center">
      <div className="container h-(--footer-height) mx-auto flex items-center justify-center gap-2">
        <span>&copy; {new Date().getFullYear()}</span>
        <Logo size="sm" />
        <span>. All rights reserved.</span>
      </div>
    </footer>
  );
}

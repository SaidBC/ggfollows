import Logo from "@/components/Logo";
import MobileNav from "./MobileNav";
import MainNav from "./MainNav";

export default function Header() {
  return (
    <header className="fixed top-0 z-50 w-full">
      <div className="mx-auto px-4 sm:px-6 lg:px-8 py-3">
        <div className="container mx-auto flex h-14 items-center justify-between rounded-2xl border border-border/50 bg-background/80 backdrop-blur-xl px-5 shadow-lg shadow-black/5">
          <Logo />
          <MobileNav className="lg:hidden" />
          <MainNav className="hidden lg:flex" />
        </div>
      </div>
    </header>
  );
}

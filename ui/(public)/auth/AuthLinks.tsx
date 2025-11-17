import Link from "next/link";

export default function AuthLinks() {
  return (
    <ul
      data-slot="navigation-menu-list"
      className="group flex flex-1 list-none items-center justify-center gap-1"
    >
      <li data-slot="navigation-menu-item" className="relative">
        <Link
          data-slot="navigation-menu-link"
          className="data-[active=true]:focus:bg-accent data-[active=true]:hover:bg-accent data-[active=true]:bg-accent/50 data-[active=true]:text-accent-foreground hover:bg-accent hover:text-accent-foreground focus:bg-accent focus:text-accent-foreground focus-visible:ring-ring/50 [&amp;_svg:not([class*='text-'])]:text-muted-foreground flex flex-col gap-1 rounded-sm p-2 text-sm transition-all outline-none focus-visible:ring-[3px] focus-visible:outline-1 [&amp;_svg:not([class*='size-'])]:size-4"
          data-radix-collection-item=""
          href="/auth/login"
        >
          Login
        </Link>
      </li>
      <li data-slot="navigation-menu-item" className="relative">
        <Link
          data-slot="navigation-menu-link"
          className="data-[active=true]:focus:bg-accent data-[active=true]:hover:bg-accent data-[active=true]:bg-accent/50 data-[active=true]:text-accent-foreground hover:bg-accent hover:text-accent-foreground focus:bg-accent focus:text-accent-foreground focus-visible:ring-ring/50 [&amp;_svg:not([class*='text-'])]:text-muted-foreground flex flex-col gap-1 rounded-sm p-2 text-sm transition-all outline-none focus-visible:ring-[3px] focus-visible:outline-1 [&amp;_svg:not([class*='size-'])]:size-4"
          data-radix-collection-item=""
          href="/auth/signup"
        >
          Signup
        </Link>
      </li>
    </ul>
  );
}

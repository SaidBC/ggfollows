"use client";

import siteConfig from "@/lib/siteConfig";
import { cn } from "@/lib/utils";
import Link from "next/link";
import { usePathname } from "next/navigation";

export default function PublicNavLinks() {
  const publicNavLinks = siteConfig.publicNavLinks;
  const pathname = usePathname();
  return (
    <>
      {publicNavLinks.map((link) => (
        <li key={link.href}>
          <Link
            className={cn(
              "relative px-3 py-2 text-sm font-medium rounded-lg transition-colors duration-200",
              pathname === link.href
                ? "text-secondary"
                : "text-muted-foreground hover:text-foreground hover:bg-muted/50"
            )}
            href={link.href}
          >
            {link.title}
          </Link>
        </li>
      ))}
    </>
  );
}

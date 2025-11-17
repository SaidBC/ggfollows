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
              "hover:text-secondary",
              pathname === link.href && "text-secondary"
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

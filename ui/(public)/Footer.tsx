import Logo from "@/components/Logo";
import Link from "next/link";
import {
  IconBrandFacebook,
  IconBrandYoutube,
  IconBrandTiktok,
} from "@tabler/icons-react";

const socialLinks = [
  {
    href: "https://www.facebook.com/ggfollows/",
    icon: IconBrandFacebook,
    label: "Facebook",
  },
  {
    href: "https://www.youtube.com/channel/UCJPPYcvewBgFJwIzo0dtP-A",
    icon: IconBrandYoutube,
    label: "YouTube",
  },
  {
    href: "https://www.tiktok.com/@ggfollows",
    icon: IconBrandTiktok,
    label: "TikTok",
  },
];

const quickLinks = [
  { title: "Home", href: "/" },
  { title: "Services", href: "/services" },
  { title: "Plans", href: "/plans" },
  { title: "FAQ", href: "/#faq" },
];

const platformLinks = [
  { title: "Instagram Growth", href: "/services" },
  { title: "YouTube Subscribers", href: "/services" },
  { title: "TikTok Followers", href: "/services" },
  { title: "Facebook Followers", href: "/services" },
];

export default function Footer() {
  return (
    <footer className="w-screen bg-card text-card-foreground border-t">
      {/* Main footer content */}
      <div className="container mx-auto px-4 py-12">
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-10">
          {/* Brand column */}
          <div className="flex flex-col gap-4 lg:col-span-1">
            <Logo size="md" />
            <p className="text-sm text-muted-foreground leading-relaxed max-w-xs">
              Grow your social media presence organically. Earn points, complete
              tasks, and boost your reach with real engagement.
            </p>
            <div className="flex items-center gap-3 mt-1">
              {socialLinks.map((link) => (
                <a
                  key={link.label}
                  href={link.href}
                  target="_blank"
                  rel="noopener noreferrer"
                  aria-label={link.label}
                  className="flex items-center justify-center w-9 h-9 rounded-lg bg-muted text-muted-foreground hover:bg-secondary hover:text-secondary-foreground transition-all duration-200"
                >
                  <link.icon size={18} />
                </a>
              ))}
            </div>
          </div>

          {/* Quick Links */}
          <div className="flex flex-col gap-3">
            <h3 className="text-sm font-semibold uppercase tracking-wider text-foreground">
              Quick Links
            </h3>
            <ul className="flex flex-col gap-2">
              {quickLinks.map((link) => (
                <li key={link.title}>
                  <Link
                    href={link.href}
                    className="text-sm text-muted-foreground hover:text-foreground transition-colors duration-200"
                  >
                    {link.title}
                  </Link>
                </li>
              ))}
            </ul>
          </div>

          {/* Services */}
          <div className="flex flex-col gap-3">
            <h3 className="text-sm font-semibold uppercase tracking-wider text-foreground">
              Services
            </h3>
            <ul className="flex flex-col gap-2">
              {platformLinks.map((link) => (
                <li key={link.title}>
                  <Link
                    href={link.href}
                    className="text-sm text-muted-foreground hover:text-foreground transition-colors duration-200"
                  >
                    {link.title}
                  </Link>
                </li>
              ))}
            </ul>
          </div>

          {/* Get Started */}
          <div className="flex flex-col gap-3">
            <h3 className="text-sm font-semibold uppercase tracking-wider text-foreground">
              Get Started
            </h3>
            <ul className="flex flex-col gap-2">
              <li>
                <Link
                  href="/auth/signup"
                  className="text-sm text-muted-foreground hover:text-foreground transition-colors duration-200"
                >
                  Create Account
                </Link>
              </li>
              <li>
                <Link
                  href="/auth/login"
                  className="text-sm text-muted-foreground hover:text-foreground transition-colors duration-200"
                >
                  Sign In
                </Link>
              </li>
              <li>
                <Link
                  href="/plans"
                  className="text-sm text-muted-foreground hover:text-foreground transition-colors duration-200"
                >
                  View Plans
                </Link>
              </li>
            </ul>
          </div>
        </div>
      </div>

      {/* Bottom bar */}
      <div className="border-t">
        <div className="container mx-auto px-4 py-5 flex flex-col sm:flex-row items-center justify-between gap-3">
          <p className="text-xs text-muted-foreground">
            &copy; {new Date().getFullYear()} GGfollows. All rights reserved.
          </p>
          <div className="flex items-center gap-4">
            {socialLinks.map((link) => (
              <a
                key={link.label}
                href={link.href}
                target="_blank"
                rel="noopener noreferrer"
                className="text-xs text-muted-foreground hover:text-foreground transition-colors duration-200"
              >
                {link.label}
              </a>
            ))}
          </div>
        </div>
      </div>
    </footer>
  );
}

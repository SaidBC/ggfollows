import Logo from "@/components/Logo";
import { Button } from "@/components/ui/button";
import Image from "next/image";
import Link from "next/link";
import {
  IconBrandInstagram,
  IconBrandYoutube,
  IconBrandTiktok,
  IconBrandX,
  IconBrandFacebook,
  IconArrowRight,
  IconStarFilled,
  IconUsers,
  IconTrendingUp,
} from "@tabler/icons-react";

const platforms = [
  { icon: IconBrandInstagram, label: "Instagram", color: "#E1306C" },
  { icon: IconBrandYoutube, label: "YouTube", color: "#FF0000" },
  { icon: IconBrandTiktok, label: "TikTok", color: "#00F2EA" },
  { icon: IconBrandX, label: "X", color: "#9ca3af" },
  { icon: IconBrandFacebook, label: "Facebook", color: "#1877F2" },
];

const stats = [
  { icon: IconUsers, value: "10K+", label: "Active Users" },
  { icon: IconTrendingUp, value: "50K+", label: "Tasks Completed" },
  { icon: IconStarFilled, value: "100", label: "Free Points" },
];

export default function HeroSection() {
  return (
    <section className="flex flex-col gap-16">
      {/* Main hero content */}
      <div className="flex flex-col lg:flex-row items-center justify-between gap-12 lg:gap-16">
        {/* Left side - Text content */}
        <div className="flex flex-col gap-8 text-center lg:text-start items-center lg:items-start lg:max-w-xl">
          {/* Badge */}
          <div className="inline-flex items-center gap-2 px-4 py-1.5 rounded-full bg-secondary/15 border border-secondary/30 text-sm text-secondary w-fit">
            <IconStarFilled size={14} />
            <span className="font-medium">
              Join now & get 100 free points
            </span>
          </div>

          {/* Heading */}
          <div className="flex flex-col gap-3">
            <h1 className="text-4xl sm:text-5xl lg:text-6xl font-bold tracking-tight leading-[1.1]">
              Grow Your Social
              <br />
              <span className="relative">
                <span className="bg-gradient-to-r from-secondary via-green-400 to-emerald-400 bg-clip-text text-transparent">
                  Media Presence
                </span>
              </span>
              <br />
              Organically
            </h1>
            <p className="text-lg text-muted-foreground max-w-lg leading-relaxed">
              Follow others, earn points, and watch your followers grow —{" "}
              <span className="text-foreground font-medium">
                no bots, just real people
              </span>{" "}
              helping each other.
            </p>
          </div>

          {/* CTA Buttons */}
          <div className="flex flex-col sm:flex-row items-center gap-3 w-full sm:w-auto">
            <Button
              variant="secondary"
              size="lg"
              asChild
              className="w-full sm:w-auto text-base px-8 py-6 rounded-xl shadow-lg shadow-secondary/25 hover:shadow-xl hover:shadow-secondary/30 transition-all duration-300"
            >
              <Link href="/auth/signup">
                Get Started Free
                <IconArrowRight size={18} />
              </Link>
            </Button>
            <Button
              variant="outline"
              size="lg"
              asChild
              className="w-full sm:w-auto text-base px-8 py-6 rounded-xl"
            >
              <Link href="/services">Browse Services</Link>
            </Button>
          </div>

          {/* Supported platforms */}
          <div className="flex flex-col gap-2.5">
            <p className="text-xs uppercase tracking-widest text-muted-foreground font-medium">
              Supported Platforms
            </p>
            <div className="flex items-center gap-3">
              {platforms.map((platform) => (
                <div
                  key={platform.label}
                  className="flex items-center justify-center w-10 h-10 rounded-lg bg-muted/50 hover:bg-muted transition-colors duration-200 group"
                  title={platform.label}
                >
                  <platform.icon
                    size={20}
                    className="text-muted-foreground group-hover:text-foreground transition-colors duration-200"
                    style={{ "--hover-color": platform.color } as React.CSSProperties}
                  />
                </div>
              ))}
            </div>
          </div>
        </div>

        {/* Right side - Illustration with decorative elements */}
        <div className="relative flex items-center justify-center lg:flex-1">
          {/* Glow effect behind illustration */}
          <div className="absolute inset-0 bg-gradient-to-br from-secondary/10 via-transparent to-emerald-500/10 rounded-3xl blur-3xl" />

          {/* Main illustration container */}
          <div className="relative p-6 lg:p-10">
            {/* Decorative ring */}
            <div className="absolute inset-4 rounded-3xl border border-secondary/10" />

            <Image
              src="/images/hero-illustration.svg"
              alt="GGfollows — Social media growth platform"
              width={800}
              height={600}
              className="w-full max-w-xl relative z-10"
              priority
            />

            {/* Floating stat cards */}
            <div className="absolute -top-2 -left-2 lg:-left-6 bg-card border rounded-xl px-4 py-3 shadow-lg z-20 animate-[fadeUp_500ms_ease-out_200ms_forwards] opacity-0">
              <div className="flex items-center gap-2.5">
                <div className="w-8 h-8 rounded-lg bg-secondary/15 flex items-center justify-center">
                  <IconTrendingUp size={16} className="text-secondary" />
                </div>
                <div>
                  <p className="text-xs text-muted-foreground">Growth</p>
                  <p className="text-sm font-bold text-foreground">+127%</p>
                </div>
              </div>
            </div>

            <div className="absolute -bottom-2 -right-2 lg:-right-6 bg-card border rounded-xl px-4 py-3 shadow-lg z-20 animate-[fadeUp_500ms_ease-out_400ms_forwards] opacity-0">
              <div className="flex items-center gap-2.5">
                <div className="w-8 h-8 rounded-lg bg-blue-500/15 flex items-center justify-center">
                  <IconUsers size={16} className="text-blue-500" />
                </div>
                <div>
                  <p className="text-xs text-muted-foreground">Followers</p>
                  <p className="text-sm font-bold text-foreground">+2.4K</p>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>

      {/* Stats bar */}
      <div className="grid grid-cols-1 sm:grid-cols-3 gap-4 lg:gap-6">
        {stats.map((stat) => (
          <div
            key={stat.label}
            className="flex items-center gap-4 p-5 rounded-2xl bg-card border hover:border-secondary/30 transition-colors duration-300 group"
          >
            <div className="w-12 h-12 rounded-xl bg-secondary/10 flex items-center justify-center group-hover:bg-secondary/20 transition-colors duration-300">
              <stat.icon size={22} className="text-secondary" />
            </div>
            <div>
              <p className="text-2xl font-bold text-foreground">{stat.value}</p>
              <p className="text-sm text-muted-foreground">{stat.label}</p>
            </div>
          </div>
        ))}
      </div>
    </section>
  );
}

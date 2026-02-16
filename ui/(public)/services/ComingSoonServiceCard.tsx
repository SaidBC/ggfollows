import siteConfig from "@/lib/siteConfig";
import { IconClock } from "@tabler/icons-react";

interface ComingSoonServiceCardProps {
  platform: "TIKTOK" | "INSTAGRAM" | "FACEBOOK" | "YOUTUBE" | "X";
}

export default function ComingSoonServiceCard({
  platform,
}: ComingSoonServiceCardProps) {
  const PlatformIcon = siteConfig.platforms[platform].icon;
  const platformName =
    platform === "X"
      ? "X (Twitter)"
      : platform.charAt(0) + platform.slice(1).toLowerCase();

  return (
    <div className="animate-fade-up rounded-2xl border bg-card overflow-hidden">
      {/* Card header */}
      <div className="flex items-center gap-3 px-6 py-5 border-b bg-muted/30">
        <div className="w-10 h-10 rounded-xl bg-secondary/10 flex items-center justify-center">
          <PlatformIcon size={20} className="text-secondary" />
        </div>
        <div>
          <h3 className="text-base font-semibold text-foreground">
            {platformName}
          </h3>
          <p className="text-xs text-muted-foreground">No services yet</p>
        </div>
      </div>

      {/* Coming soon content */}
      <div className="flex flex-col items-center justify-center gap-4 py-16 px-6">
        <div className="w-16 h-16 rounded-2xl bg-secondary/10 flex items-center justify-center">
          <IconClock size={28} className="text-secondary" />
        </div>
        <div className="text-center">
          <h4 className="text-lg font-semibold text-foreground mb-1">
            Coming Soon
          </h4>
          <p className="text-sm text-muted-foreground max-w-xs">
            {platformName} services are being prepared. Stay tuned for updates!
          </p>
        </div>
      </div>
    </div>
  );
}

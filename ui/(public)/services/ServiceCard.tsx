import siteConfig from "@/lib/siteConfig";
import ServiceForm from "./ServiceForm";

interface ServiceCardProps {
  platform: "TIKTOK" | "INSTAGRAM" | "FACEBOOK" | "YOUTUBE" | "X";
}

export default function ServiceCard({ platform }: ServiceCardProps) {
  const PlatformIcon = siteConfig.platforms[platform].icon;
  const services = siteConfig.SERVICES.filter(
    (service) => service.platform === platform
  );

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
          <p className="text-xs text-muted-foreground">
            {services.length} service{services.length !== 1 ? "s" : ""}{" "}
            available
          </p>
        </div>
      </div>

      {/* Card form content */}
      <div className="p-6">
        <ServiceForm services={services} />
      </div>
    </div>
  );
}

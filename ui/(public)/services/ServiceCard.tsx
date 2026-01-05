import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { IconBrandFacebook } from "@tabler/icons-react";
import ServiceForm from "./ServiceForm";
import siteConfig from "@/lib/siteConfig";

interface ServiceCardProps {
  platform: "TIKTOK" | "INSTAGRAM" | "FACEBOOK" | "YOUTUBE" | "X";
}

export default function ServiceCard({ platform }: ServiceCardProps) {
  const PlatformIcon = siteConfig.platforms[platform].icon;
  const services = siteConfig.SERVICES.filter(
    (service) => service.platform === platform
  );
  return (
    <Card className="animate-fade-up">
      <CardHeader>
        <CardTitle>
          <div className="flex gap-2 items-center text-card-foreground">
            <PlatformIcon />
            <span>{platform}</span>
          </div>
        </CardTitle>
      </CardHeader>
      <CardContent>
        <ServiceForm services={services} />
      </CardContent>
    </Card>
  );
}

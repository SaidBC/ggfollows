"use client";

import { Tabs, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { TabsContent } from "@radix-ui/react-tabs";
import ServiceCard from "./ServiceCard";
import ComingSoonServiceCard from "./ComingSoonServiceCard";
import { useGetServices } from "@/hooks/useServices";
import siteConfig from "@/lib/siteConfig";
import { Spinner } from "@/components/ui/spinner";

const SERVICES = ["FACEBOOK", "INSTAGRAM", "YOUTUBE", "X", "TIKTOK"] as const;

export default function ServiceSwitcher() {
  const { data, isLoading, error } = useGetServices();

  if (isLoading) {
    return (
      <div className="flex items-center justify-center py-20">
        <Spinner className="size-6 text-secondary" />
      </div>
    );
  }

  if (!data || !data.success || error) {
    return (
      <div className="flex items-center justify-center py-20 text-muted-foreground">
        <p>Failed to load services. Please try again later.</p>
      </div>
    );
  }

  const services = data.data;
  const uniqueByPlatform = Array.from(
    new Map(services.map((service) => [service.platform, service])).values()
  );

  const unavailableServices = SERVICES.filter(
    (service) => !services.find((s) => s.platform === service)
  );

  return (
    <Tabs defaultValue="FACEBOOK" className="w-full">
      <TabsList className="w-full flex flex-wrap h-auto gap-1 p-1 bg-muted/50 rounded-xl">
        {SERVICES.map((platform) => {
          const PlatformIcon = siteConfig.platforms[platform].icon;
          return (
            <TabsTrigger
              key={platform}
              value={platform}
              className="flex-1 min-w-fit gap-2 rounded-lg data-[state=active]:bg-card data-[state=active]:shadow-sm py-2.5 px-3 text-sm font-medium transition-all duration-200"
            >
              <PlatformIcon size={16} />
              <span className="hidden sm:inline">
                {platform === "X" ? "X (Twitter)" : platform.charAt(0) + platform.slice(1).toLowerCase()}
              </span>
            </TabsTrigger>
          );
        })}
      </TabsList>

      <div className="mt-6">
        {uniqueByPlatform.map((service) => (
          <TabsContent key={service.id} value={service.platform}>
            <ServiceCard platform={service.platform} />
          </TabsContent>
        ))}
        {unavailableServices.map((platform) => (
          <TabsContent key={platform} value={platform}>
            <ComingSoonServiceCard platform={platform} />
          </TabsContent>
        ))}
      </div>
    </Tabs>
  );
}

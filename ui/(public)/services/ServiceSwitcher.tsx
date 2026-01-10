"use client";

import { Tabs, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { TabsContent } from "@radix-ui/react-tabs";
import ServiceCard from "./ServiceCard";
import ComingSoonServiceCard from "./ComingSoonServiceCard";
import { useGetServices } from "@/hooks/useServices";

const SERVICES = ["FACEBOOK", "INSTAGRAM", "YOUTUBE", "X", "TIKTOK"] as const;

export default function ServiceSwitcher() {
  const { data, isLoading, error } = useGetServices();
  if (!isLoading && !data) return <p>Error loading user</p>;
  if (!data || !data.success || error)
    return <p>An Error occures durring fetching</p>;
  const services = data.data;
  const uniqueByPlatform = Array.from(
    new Map(services.map((service) => [service.platform, service])).values()
  );

  const unavailableServices = SERVICES.filter(
    (service) => !services.find((s) => s.platform === service)
  );

  return (
    <div>
      <Tabs defaultValue="FACEBOOK">
        <TabsList>
          <TabsTrigger value="FACEBOOK">Facebook</TabsTrigger>
          <TabsTrigger value="INSTAGRAM">Instagram</TabsTrigger>
          <TabsTrigger value="YOUTUBE">Youtube</TabsTrigger>
          <TabsTrigger value="X">X (twitter)</TabsTrigger>
          <TabsTrigger value="TIKTOK">Tiktok</TabsTrigger>
        </TabsList>
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
      </Tabs>
    </div>
  );
}

import { Tabs, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { TabsContent } from "@radix-ui/react-tabs";
import ServiceCard from "./ServiceCard";
import ComingSoonServiceCard from "./ComingSoonServiceCard";

export default function ServiceSwitcher() {
  return (
    <div>
      <Tabs defaultValue="facebook">
        <TabsList>
          <TabsTrigger value="facebook">Facebook</TabsTrigger>
          <TabsTrigger value="instagram">Instagram</TabsTrigger>
          <TabsTrigger value="youtube">Youtube</TabsTrigger>
          <TabsTrigger value="x">X (twitter)</TabsTrigger>
          <TabsTrigger value="tiktok">Tiktok</TabsTrigger>
        </TabsList>
        <TabsContent value="facebook">
          <ServiceCard platform="FACEBOOK" />
        </TabsContent>
        <TabsContent value="instagram">
          <ComingSoonServiceCard platform="INSTAGRAM" />
        </TabsContent>
        <TabsContent value="youtube">
          <ComingSoonServiceCard platform="YOUTUBE" />
        </TabsContent>
        <TabsContent value="x">
          <ComingSoonServiceCard platform="X" />
        </TabsContent>
        <TabsContent value="tiktok">
          <ComingSoonServiceCard platform="TIKTOK" />
        </TabsContent>
      </Tabs>
    </div>
  );
}

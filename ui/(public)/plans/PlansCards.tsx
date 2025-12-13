import { cn } from "@/lib/utils";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import PlansCard from "./PlansCard";

const features = {
  free: [
    "Up to 10 active tasks",
    "Up to 3 tasks per day",
    "Free daily points",
    "Access to basic campaigns",
    "Basic analytics (points & tasks)",
    "Community support",
  ],
  premium: [
    "Up to 50 active tasks",
    "Up to 15 tasks per day",
    "Increased daily reward points",
    "Boosted task visibility",
    "Access to premium campaigns",
    "Advanced analytics & stats",
    "Early access to new features",
    "No ads",
  ],
  pro: [
    "Unlimited active tasks",
    "Unlimited daily tasks",
    "Highest daily reward points",
    "Access to exclusive campaigns",
    "Auto-renew & scheduled tasks",
    "Full analytics & performance insights",
    "Priority support",
    "No ads",
    "Temporary task boost (24h)",
  ],
};

export default function PlansCards({
  className,
  ...props
}: React.ComponentProps<"div">) {
  return (
    <div className={cn("py-12", className)} {...props}>
      <Tabs defaultValue="annually">
        <TabsList>
          <TabsTrigger value="monthly">Monthly</TabsTrigger>
          <TabsTrigger value="annually">Annually (Save +%20)</TabsTrigger>
        </TabsList>
        <TabsContent value="annually">
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
            <PlansCard
              className="animate-fade-up"
              period="year"
              features={features.free}
              tier="Free"
              price="0"
              description="Start earning points and growing with daily rewards."
            />
            <PlansCard
              className="animate-fade-up md:max-lg:col-start-1 md:max-lg:col-end-3  md:max-lg:row-start-1 md:max-lg:justify-self-center"
              period="year"
              features={features.premium}
              tier="Premiem"
              price="0"
              description="More tasks, more visibility, faster growth."
            />
            <PlansCard
              className="animate-fade-up"
              period="year"
              features={features.pro}
              tier="Pro"
              price="0"
              description="Unlimited power for serious creators."
            />
          </div>
        </TabsContent>
        <TabsContent value="monthly">
          <div className="z-0 grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
            <PlansCard
              className="animate-fade-up"
              period="mounth"
              features={features.free}
              tier="Free"
              price="0"
              description="Start earning points and growing with daily rewards."
            />
            <PlansCard
              className="animate-fade-up md:max-lg:col-start-1 md:max-lg:col-end-3  md:max-lg:row-start-1 md:max-lg:justify-self-center"
              period="mounth"
              features={features.premium}
              tier="Premiem"
              price="0"
              description="More tasks, more visibility, faster growth."
            />
            <PlansCard
              className="animate-fade-up"
              period="mounth"
              features={features.pro}
              tier="Pro"
              price="0"
              description="Unlimited power for serious creators."
            />
          </div>
        </TabsContent>
      </Tabs>
    </div>
  );
}

import { cn } from "@/lib/utils";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import PlansCard from "./PlansCard";
import apiAxios from "@/lib/apiAxios";
import { GetUserMeResponse } from "@/types";
import { cookies } from "next/headers";
import { PlanType } from "@prisma/client";

const plans = {
  free: {
    name: "FREE" as const,
    description: "Start earning points and growing with daily rewards.",
    price: "0",
    features: [
      "Up to 10 active tasks",
      "Up to 3 tasks per day",
      "Free daily points",
      "Access to basic campaigns",
      "Basic analytics (points & tasks)",
      "Community support",
    ],
  },
  premium: {
    name: "PREMIUM" as const,
    description: "More tasks, more visibility, faster growth.",
    price: "5",
    features: [
      "Up to 50 active tasks",
      "Up to 15 tasks per day",
      "Increased daily reward points",
      "Boosted task visibility",
      "Access to premium campaigns",
      "Advanced analytics & stats",
      "Early access to new features",
      "No ads",
    ],
  },
  pro: {
    name: "PRO" as const,
    description: "Unlimited power for serious creators.",
    price: "10",
    features: [
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
  },
};

export default async function PlansCards({
  className,
  ...props
}: React.ComponentProps<"div">) {
  const cookieStore = await cookies();
  let userPlan: null | PlanType = null;
  const res = await apiAxios.get<GetUserMeResponse>("/users/me", {
    headers: {
      cookie: cookieStore.toString(),
    },
  });
  if (res.data.success) {
    userPlan = res.data.data.plan;
  }

  return (
    <div className={cn("py-12", className)} {...props}>
      <Tabs defaultValue="annually">
        <TabsList>
          <TabsTrigger value="monthly">Monthly</TabsTrigger>
          <TabsTrigger value="annually">Annually (Save +%20)</TabsTrigger>
        </TabsList>
        <TabsContent value="annually">
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
            {Object.entries(plans).map(([key, plan]) => {
              return (
                <PlansCard
                  key={key}
                  className={cn(
                    "animate-fade-up",
                    key === "premium" &&
                      "md:max-lg:col-start-1 md:max-lg:col-end-3  md:max-lg:row-start-1 md:max-lg:justify-self-center"
                  )}
                  period="year"
                  features={plan.features}
                  tier={plan.name}
                  price={String(Number(plan.price) * 10)}
                  description={plan.description}
                  currentPlan={userPlan}
                />
              );
            })}
          </div>
        </TabsContent>
        <TabsContent value="monthly">
          <div className="z-0 grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
            {Object.entries(plans).map(([key, plan]) => {
              return (
                <PlansCard
                  key={key}
                  className={cn(
                    "animate-fade-up",
                    key === "premium" &&
                      "md:max-lg:col-start-1 md:max-lg:col-end-3  md:max-lg:row-start-1 md:max-lg:justify-self-center"
                  )}
                  period="mounth"
                  features={plan.features}
                  tier={plan.name}
                  price={plan.price}
                  description={plan.description}
                  currentPlan={userPlan}
                />
              );
            })}
          </div>
        </TabsContent>
      </Tabs>
    </div>
  );
}

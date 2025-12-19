import { cn } from "@/lib/utils";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import PlansCard from "./PlansCard";
import apiAxios from "@/lib/apiAxios";
import { GetUserMeResponse } from "@/types";
import { cookies } from "next/headers";
import { PlanType } from "@prisma/client";
import siteConfig from "@/lib/siteConfig";

export default async function PlansCards({
  className,
  ...props
}: React.ComponentProps<"div">) {
  const { plans } = siteConfig;
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
                  period="month"
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

import { CheckCheck } from "lucide-react";
import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import PointsIcon from "@/components/vectors/PointIcon";
import { cn } from "@/lib/utils";
import Link from "next/link";
import { PlanType } from "@prisma/client";
import PayWithMoneyButton from "./PayWithMoneyButton";
import PayWithCoinsButton from "./PayWithCoinsButton";

interface PricingCardProps {
  currentPlan: PlanType | null;
  tier: PlanType;
  price: string;
  features: string[];
  description: string;
  period?: "month" | "year";
}

export default function PricingCard({
  currentPlan,
  features,
  price,
  description,
  tier,
  period = "month",
  className,
  ...props
}: PricingCardProps & React.ComponentProps<"div">) {
  return (
    <Card
      {...props}
      className={cn(className, tier === "PREMIUM" && "xl:relative xl:-top-4")}
    >
      <CardHeader className="gap-4">
        <CardTitle>
          {tier === "PREMIUM" ? (
            <div className="flex justify-between">
              <span className="gradient-text">
                {tier.charAt(0) + tier.slice(1).toLowerCase()}
              </span>
              <span className="gradient-text text-secondary">Recommanded</span>
            </div>
          ) : (
            tier.charAt(0) + tier.slice(1).toLowerCase()
          )}
        </CardTitle>
        <CardDescription className="flex justify-between items-center">
          <div className="flex gap-2 hover:text-secondary transition-colors">
            <div className="flex items-center gap-0.5">
              <span className=" font-bold">$</span>
              <span className="text-4xl font-caveat-brush">{price}</span>
            </div>
            <div className="text-[10px] self-end font-bold">
              USD /
              <br />
              {period}
            </div>
          </div>
          <div className=" font-kablammo text-xl text-secondary">OR</div>
          <div className="flex gap-2 hover:text-secondary transition-colors">
            <div className="flex items-center gap-1">
              <PointsIcon />
              <span className="text-2xl font-caveat-brush">
                {Number(price) * 200}
              </span>
            </div>
            <div className="text-[10px] self-end font-bold">
              points /
              <br />
              {period}
            </div>
          </div>
        </CardDescription>
        <CardDescription>{description}</CardDescription>
      </CardHeader>
      <CardContent className="grow grid h-full ">
        <div className=" grid gap-2 pb-10">
          {features.map((feature, i) => {
            return (
              <div key={i} className="flex gap-4">
                <CheckCheck className="text-secondary" />
                <span>{feature}</span>
              </div>
            );
          })}
        </div>
        {currentPlan === null && (
          <Button className="w-full mt-auto" variant="secondary" asChild>
            <Link href="/auth/signup">Get Started</Link>
          </Button>
        )}
        {currentPlan !== null && currentPlan !== tier && (
          <div className="flex gap-2 items-center">
            <PayWithMoneyButton price={price} />
            <div className=" font-kablammo text-xl text-secondary">OR</div>
            <PayWithCoinsButton period={period} plan={tier} price={price} />
          </div>
        )}
        {currentPlan === tier && (
          <Button className="w-full mt-auto" variant="secondary">
            Current Plan
          </Button>
        )}
      </CardContent>
    </Card>
  );
}

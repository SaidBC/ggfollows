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

interface PricingCardProps {
  tier: "Free" | "Premiem" | "Pro";
  price: string;
  features: string[];
  description: string;
  period?: "mounth" | "year";
}

export default function PricingCard({
  features,
  price,
  description,
  tier,
  period = "mounth",
  className,
  ...props
}: PricingCardProps & React.ComponentProps<"div">) {
  return (
    <Card
      {...props}
      className={cn(className, tier === "Premiem" && "xl:relative xl:-top-4")}
    >
      <CardHeader className="gap-4">
        <CardTitle>
          {tier === "Premiem" ? (
            <div className="flex justify-between">
              <span className="gradient-text">{tier}</span>
              <span className="gradient-text">Recomanded</span>
            </div>
          ) : (
            tier
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
        <Button className="w-full mt-auto" variant="secondary">
          Get Started
        </Button>
      </CardContent>
    </Card>
  );
}

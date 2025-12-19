"use client";
import { Button } from "@/components/ui/button";
import { Spinner } from "@/components/ui/spinner";
import PointsIcon from "@/components/vectors/PointIcon";
import useUpgradePlan from "@/hooks/useUpgradePlan";
import siteConfig from "@/lib/siteConfig";
import { PlanType } from "@prisma/client";
import { toast } from "sonner";

export default function PayWithPointsButton({
  plan,
  price,
  period,
}: {
  plan: PlanType;
  price: string;
  period: "month" | "year";
}) {
  const { mutate, isPending } = useUpgradePlan({ plan, period });
  const handleSubmit = function () {
    mutate(undefined, {
      onSuccess: (res) => {
        if (res.success)
          return toast.success(
            "Your plan was successfully upgraded to " + plan
          );
        return toast.error(
          res.errors.root?.message || "Unexpected error occured"
        );
      },
    });
  };
  return (
    <Button className="grow" variant="secondary" onClick={handleSubmit}>
      {!isPending && (
        <div className="flex items-center gap-1">
          <PointsIcon height={12} width={12} />
          <span className="text-2xl font-caveat-brush">
            {Number(price) * siteConfig.POINTS_RATE}
          </span>
        </div>
      )}
      {isPending && (
        <div className="flex items-center gap-1">
          <Spinner className="size-4" />
          <span>Loading</span>
        </div>
      )}
    </Button>
  );
}

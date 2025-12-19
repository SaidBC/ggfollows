import { Button } from "@/components/ui/button";
import { Spinner } from "@/components/ui/spinner";
import PointsIcon from "@/components/vectors/PointIcon";
import useUpgradePlan from "@/hooks/useUpgradePlan";
import siteConfig from "@/lib/siteConfig";
import { PlanType } from "@prisma/client";

export default function PayWithPointsButton({
  plan,
  price,
}: {
  plan: PlanType;
  price: string;
}) {
  const { mutate, isPending } = useUpgradePlan({ plan });
  const handleSubmit = function () {
    mutate();
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

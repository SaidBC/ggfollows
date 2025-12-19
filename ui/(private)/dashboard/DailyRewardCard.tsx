"use client";

import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import {
  Card,
  CardAction,
  CardDescription,
  CardFooter,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import { Spinner } from "@/components/ui/spinner";
import PointsIcon from "@/components/vectors/PointIcon";
import { useClaimDailyReward } from "@/hooks/useClaimDailyReward";
import { useDailyReward } from "@/hooks/useDailyRewardStatus";
import { toast } from "sonner";

export default function DailyRewardCard() {
  const { data, error } = useDailyReward();
  const { mutate, isPending } = useClaimDailyReward();

  const handleSubmit = function () {
    mutate(undefined, {
      onSuccess: (data) => {
        toast.success(data.message);
      },
      onError: (err) => {
        toast.error(err.message);
      },
    });
  };

  if (!data || !data.success || error)
    return <p>An Error occures durring fetching</p>;
  return (
    <Card>
      <CardHeader>
        <CardDescription>Daily Check-in</CardDescription>
        <CardTitle className="text-3xl text-secondary font-semibold tabular-nums @[250px]/card:text-3xl">
          <div className="flex items-center gap-4">
            <div className="flex items-center gap-2">
              <PointsIcon width={42} height={42} />
              <span>+{data.data.reward}</span>
            </div>

            <Button
              onClick={handleSubmit}
              disabled={data.data.claimed || isPending}
              variant={"secondary"}
            >
              {!isPending ? (
                !data.data.claimed ? (
                  "Claim"
                ) : (
                  "Claimed"
                )
              ) : (
                <div className="flex items-center gap-2">
                  <Spinner />
                  <span>Claiming ...</span>
                </div>
              )}
            </Button>
          </div>
        </CardTitle>
        <CardAction>
          <Badge className="bg-secondary">Day {data.data.streak}</Badge>
        </CardAction>
      </CardHeader>
      <CardFooter className="flex-col items-start gap-1.5 text-sm">
        <div className="text-muted-foreground">
          Claim your daily reward & come back tomorrow
        </div>
      </CardFooter>
    </Card>
  );
}

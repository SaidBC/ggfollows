import { Badge } from "@/components/ui/badge";
import {
  Card,
  CardAction,
  CardDescription,
  CardFooter,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import PointsIcon from "@/components/vectors/PointIcon";
import { usePointsBalance } from "@/hooks/usePointsBalance";
import { IconTrendingUp } from "@tabler/icons-react";

export default function BalanceCard() {
  const { data, error } = usePointsBalance();
  if (!data || !data.success || error)
    return <p>An Error occures durring fetching</p>;
  const balance = data.data;
  return (
    <Card className="@container/card">
      <CardHeader>
        <CardDescription>Points balance</CardDescription>
        <CardTitle className="text-3xl text-secondary font-semibold tabular-nums @[250px]/card:text-3xl">
          <div className="flex items-center gap-2">
            <PointsIcon width={42} height={42} />
            <span>{balance.points}</span>
          </div>
        </CardTitle>
        <CardAction>
          <Badge className={"bg-secondary"}>
            <IconTrendingUp />
            {balance.changes.month.change}
          </Badge>
        </CardAction>
      </CardHeader>
      <CardFooter className="flex-col items-start gap-1.5 text-sm">
        <div className="line-clamp-1 flex gap-2 font-medium text-secondary">
          Trending up this month <IconTrendingUp className="size-4" />
        </div>
        <div className="text-muted-foreground">Your current points balance</div>
      </CardFooter>
    </Card>
  );
}

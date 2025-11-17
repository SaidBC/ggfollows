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
import PointsIcon from "@/components/vectors/PointIcon";
import { IconTrendingUp } from "@tabler/icons-react";

export default function CardsSection() {
  return (
    <div className="*:data-[slot=card]:from-secondary/5 *:data-[slot=card]:to-card dark:*:data-[slot=card]:bg-card grid grid-cols-1 gap-4 px-4 *:data-[slot=card]:bg-linear-to-t *:data-[slot=card]:shadow-xs lg:px-6 @xl/main:grid-cols-2 ">
      <Card className="@container/card">
        <CardHeader>
          <CardDescription>Points balance</CardDescription>
          <CardTitle className="text-3xl text-secondary font-semibold tabular-nums @[250px]/card:text-3xl">
            <div className="flex items-center gap-2">
              <PointsIcon width={42} height={42} />
              <span>0</span>
            </div>
          </CardTitle>
          <CardAction>
            <Badge className="bg-secondary">
              <IconTrendingUp />
              +12.5%
            </Badge>
          </CardAction>
        </CardHeader>
        <CardFooter className="flex-col items-start gap-1.5 text-sm">
          <div className="line-clamp-1 flex gap-2 font-medium text-secondary">
            Trending up this month <IconTrendingUp className="size-4" />
          </div>
          <div className="text-muted-foreground">
            Your current points balance
          </div>
        </CardFooter>
      </Card>
      <Card>
        <CardHeader>
          <CardDescription>Daily Check-in</CardDescription>
          <CardTitle className="text-3xl text-secondary font-semibold tabular-nums @[250px]/card:text-3xl">
            <div className="flex items-center gap-4">
              <div className="flex items-center gap-2">
                <PointsIcon width={42} height={42} />
                <span>+20</span>
              </div>
              <Button variant={"secondary"}>Claim</Button>
            </div>
          </CardTitle>
          <CardAction>
            <Badge className="bg-secondary">Day 1</Badge>
          </CardAction>
        </CardHeader>
        <CardFooter className="flex-col items-start gap-1.5 text-sm">
          <div className="text-muted-foreground">
            Claim your daily reward & come back tomorrow
          </div>
        </CardFooter>
      </Card>
      <Card>
        <CardHeader>
          <CardDescription>New users free points</CardDescription>
          <CardTitle className="text-3xl text-secondary font-semibold tabular-nums @[250px]/card:text-3xl">
            <div className="flex items-center gap-4">
              <div className="flex items-center gap-2">
                <PointsIcon width={42} height={42} />
                <span>+100</span>
              </div>
              <Button variant={"secondary"}>Claim</Button>
            </div>
          </CardTitle>
          <CardAction>
            <Badge className="bg-secondary">0/1000</Badge>
          </CardAction>
        </CardHeader>
        <CardFooter className="flex-col items-start gap-1.5 text-sm">
          <div className="text-muted-foreground">Claim out your free point</div>
        </CardFooter>
      </Card>
    </div>
  );
}

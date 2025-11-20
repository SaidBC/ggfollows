"use client";
import EmptyListMessage from "@/components/EmptyListMessage";
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
import { useGetCampaings } from "@/hooks/useGetCampaigns";

interface CampaignCardProps {
  title: string;
  description: string | null;
  claimedCount: number;
  maxLimit: number;
  rewardAmount: number;
}

function CampaignCard({
  title,
  description,
  claimedCount,
  maxLimit,
  rewardAmount,
}: CampaignCardProps) {
  return (
    <Card>
      <CardHeader>
        <CardDescription>{title}</CardDescription>
        <CardTitle className="text-3xl text-secondary font-semibold tabular-nums @[250px]/card:text-3xl">
          <div className="flex items-center gap-4">
            <div className="flex items-center gap-2">
              <PointsIcon width={42} height={42} />
              <span>+{rewardAmount}</span>
            </div>
            <Button variant={"secondary"}>Claim</Button>
          </div>
        </CardTitle>
        <CardAction>
          <Badge className="bg-secondary">
            {claimedCount}/{maxLimit}
          </Badge>
        </CardAction>
      </CardHeader>
      <CardFooter className="flex-col items-start gap-1.5 text-sm">
        <div className="text-muted-foreground">
          {description || "Claim out your free point"}
        </div>
      </CardFooter>
    </Card>
  );
}

export default function CampaignList() {
  const { data, error } = useGetCampaings();
  if (!data || !data.success || error)
    return <p>An Error occures durring fetching</p>;
  const campaigns = data.data;

  return (
    <div className="col-start-1 col-end-3 flex flex-col gap-4">
      <h1 className="font-bold text-3xl my-2 text-neutral-300">Campaigns :</h1>
      <div className="grid grid-cols-1 gap-4 px-4 lg:px-6 @xl/main:grid-cols-2 ">
        {campaigns.map((campaign) => {
          return (
            <CampaignCard
              key={campaign.name}
              rewardAmount={campaign.rewardAmount}
              claimedCount={campaign.claimedCount}
              maxLimit={campaign.maxLimit}
              title={campaign.title}
              description={campaign.description}
            />
          );
        })}
      </div>
      {campaigns.length === 0 && (
        <div className="self-center">
          <EmptyListMessage
            title="No campaigns available right now"
            description="New reward campaigns will appear here once they’re released."
          />
        </div>
      )}
    </div>
  );
}

import {
  Card,
  CardAction,
  CardDescription,
  CardFooter,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import { Skeleton } from "@/components/ui/skeleton";

export default function SkeletonCard() {
  return (
    <Card>
      <CardHeader>
        <CardDescription>
          <Skeleton className="w-32 h-6" />
        </CardDescription>
        <CardTitle className="text-3xl text-secondary font-semibold tabular-nums @[250px]/card:text-3xl">
          <div className="flex items-center gap-4">
            <div className="flex items-center gap-2">
              <Skeleton className="w-18 h-10" />
            </div>
          </div>
        </CardTitle>
        <CardAction>
          <Skeleton className="w-12 h-6" />
        </CardAction>
      </CardHeader>
      <CardFooter className="flex-col items-start gap-1.5 text-sm">
        <div className="text-muted-foreground">
          <Skeleton className="w-38 h-6" />
        </div>
      </CardFooter>
    </Card>
  );
}

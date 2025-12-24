import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import siteConfig from "@/lib/siteConfig";

interface ComingSoonServiceCardProps {
  platform: "TIKTOK" | "INSTAGRAM" | "FACEBOOK" | "YOUTUBE" | "X";
}
export default function ComingSoonServiceCard({
  platform,
}: ComingSoonServiceCardProps) {
  const PlatformIcon = siteConfig.platforms[platform].icon;
  return (
    <Card className="animate-fade-up">
      <CardHeader>
        <CardTitle>
          <div className="flex gap-2 items-center text-card-foreground">
            <PlatformIcon />
            <span>{platform}</span>
          </div>
        </CardTitle>
      </CardHeader>
      <CardContent>
        <div className="min-h-72 flex items-center justify-center">
          <h1 className="text-3xl text-secondary font-bold font-kablammo">
            Coming Soon ...
          </h1>
        </div>
      </CardContent>
    </Card>
  );
}

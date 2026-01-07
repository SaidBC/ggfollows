import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import {
  Card,
  CardContent,
  CardDescription,
  CardFooter,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import PointsIcon from "@/components/vectors/PointIcon";
import { Role } from "@prisma/client";
import { Label } from "@radix-ui/react-label";

interface UserCardProps {
  username: string | null;
  firstname: string | null;
  lastname: string | null;
  email: string | null;
  id: string;
  image: string | null;
  points: number;
  role: Role;
  onUpdateRole: () => void;
  onAdjustPoints: () => void;
}

export default function UserCard({
  username,
  firstname,
  lastname,
  email,
  image,
  points,
  role,
  onUpdateRole,
  onAdjustPoints,
}: UserCardProps) {
  return (
    <Card>
      <CardHeader className="flex">
        <Avatar className="rounded-full bg-muted-foreground text-xl size-14">
          <AvatarImage src={image || undefined} alt={username || ""} />
          <AvatarFallback className="rounded-full bg-secondary text-secondary-foreground  flex items-center justify-center uppercase font-bold">
            {firstname?.charAt(0)}
            {lastname?.charAt(0)}
          </AvatarFallback>
        </Avatar>
        <div className="flex flex-col gap-1">
          <CardTitle>@{username}</CardTitle>
          <CardDescription className="ml-2 text-xs">
            <div>{firstname + " " + lastname}</div>
            <div>{email}</div>
          </CardDescription>
        </div>
      </CardHeader>
      <CardContent className="flex flex-col gap-1">
        <div className="flex gap-2 justify-between">
          <span className="text-muted-foreground font-bold">Points:</span>
          <div className="flex gap-2 items-center">
            <div className="flex gap-2">
              <span className="font-bold text-secondary">{points}</span>
              <PointsIcon />
            </div>
            <Button onClick={onAdjustPoints} variant="ghost" size="sm">
              Adjust point
            </Button>
          </div>
        </div>
        <div className="flex gap-2 justify-between">
          <span className="text-muted-foreground font-bold">Role:</span>
          <div className="flex gap-2 items-center">
            <Badge className="font-bold" variant="secondary">
              {role}
            </Badge>
            <Button onClick={onUpdateRole} variant="ghost" size="sm">
              Change role
            </Button>
          </div>
        </div>
      </CardContent>
      <CardFooter>
        <Button variant="secondary" className="w-full">
          View Details
        </Button>
      </CardFooter>
    </Card>
  );
}

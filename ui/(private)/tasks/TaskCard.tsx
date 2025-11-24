import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import PointsIcon from "@/components/vectors/PointIcon";
import { LinkIcon, XIcon } from "lucide-react";
import Image from "next/image";
import Link from "next/link";

function RemoveButton() {
  return (
    <button>
      <XIcon className="text-red-600" />
    </button>
  );
}

interface TaskCardProps {
  id: string;
  title: string;
  description?: string;
  amount: number;
  complated: number;
  max: number;
  srcImage: string;
  platformLink: string;
  removeable: boolean;
}

export default function TaskCard({
  id,
  title,
  description,
  amount,
  complated,
  max,
  srcImage,
  platformLink,
  removeable,
}: TaskCardProps) {
  return (
    <div className="bg-card text-card-foreground flex justify-between rounded-xl border py-4 shadow-sm @container/card from-secondary/5 to-card dark:bg-card bg-linear-to-t px-4 ">
      <div className="flex items-center gap-4">
        <div>
          <Image src={srcImage} width={64} height={64} alt="Task Image" />
        </div>
        <div>
          <h2 className="text-xl font-bold">{title}</h2>
          <p className="text-sm text-muted-foreground">{description}</p>
        </div>
      </div>
      <div className="flex flex-col items-end gap-2">
        <div className="flex gap-2">
          <Badge className="bg-secondary">
            {complated}/{max}
          </Badge>
          {removeable && <RemoveButton />}
        </div>
        <div className="text-secondary flex items-center gap-1">
          <span className="text-2xl font-bold">{amount}</span>
          <PointsIcon width={24} height={24} />
        </div>
        <div className="flex gap-4">
          <Link
            className="flex items-center gap-1 text-sm hover:underline"
            href={platformLink}
          >
            <LinkIcon size={16} />
            <span>GO TO</span>
          </Link>
          <Button variant={"secondary"}>Check</Button>
        </div>
      </div>
    </div>
  );
}

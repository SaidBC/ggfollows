import { Button } from "@/components/ui/button";
import {
  Dialog,
  DialogHeader,
  DialogTitle,
  DialogContent,
  DialogDescription,
} from "@/components/ui/dialog";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import PointsIcon from "@/components/vectors/PointIcon";

import useAdminAdjust from "@/hooks/useAdminAdjust";
import { User } from "@prisma/client";
import { ChangeEvent, useState } from "react";
import { toast } from "sonner";

interface UpdateUserRoleDialog {
  user: User;
  open: boolean;
  onOpenChange: (open: boolean) => void;
}

export function AdjustPointMessage({ balance }: { balance: number }) {
  return (
    <div className="flex gap-2 items-center">
      <span>
        User points was adjusted successfully the new balance is{" "}
        <b>{balance}</b>
      </span>
      <PointsIcon />
    </div>
  );
}

export default function AdjustPointsDialog({
  user,
  open,
  onOpenChange,
}: UpdateUserRoleDialog) {
  const { mutate } = useAdminAdjust();
  const [value, setValue] = useState<number>(0);
  const onPointsChange = (e: ChangeEvent<HTMLInputElement>) =>
    setValue(parseInt(e.target.value));

  const onSubmit = () => {
    mutate(
      { userId: user.id, points: value },
      {
        onSuccess: (data) => {
          if (data.success)
            return toast.success(
              <AdjustPointMessage balance={data.data.balance} />
            );
          toast.error(
            (data.errors.root && data.errors.root.message) ||
              "Unexpected error occures"
          );
        },
      }
    );
  };

  return (
    <Dialog open={open} onOpenChange={onOpenChange}>
      <DialogContent>
        <DialogHeader>
          <DialogTitle>Adjust User Poinst</DialogTitle>
          <DialogDescription>Adjust the user points</DialogDescription>
        </DialogHeader>
        <div>
          <div className="flex flex-col gap-2 mb-4">
            <Label htmlFor="points">Points</Label>
            <Input
              id="points"
              name="points"
              type="number"
              value={value}
              onChange={onPointsChange}
            />
          </div>
          <Button className="w-full" onClick={onSubmit} variant="secondary">
            Update
          </Button>
        </div>
      </DialogContent>
    </Dialog>
  );
}

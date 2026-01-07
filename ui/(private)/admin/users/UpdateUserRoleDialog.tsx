import { Button } from "@/components/ui/button";
import {
  Dialog,
  DialogHeader,
  DialogTitle,
  DialogContent,
  DialogDescription,
} from "@/components/ui/dialog";
import { Label } from "@/components/ui/label";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import { useUpdateUserRole } from "@/hooks/useUpdateUserRole";
import { Role, User } from "@prisma/client";
import { useState } from "react";
import { toast } from "sonner";

interface UpdateUserRoleDialog {
  user: User;
  open: boolean;
  onOpenChange: (open: boolean) => void;
}
export default function UpdateUserRoleDialog({
  user,
  open,
  onOpenChange,
}: UpdateUserRoleDialog) {
  const { mutate } = useUpdateUserRole({ userId: user.id });
  const [value, setValue] = useState<Role>("USER");
  const onRoleChange = (role: Role) => {
    setValue(role);
  };

  const onSubmit = () => {
    mutate(
      { role: value },
      {
        onSuccess: (data) => {
          if (data.success)
            return toast.success(
              "User ROLE was updated successfully to " + data.data.role
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
          <DialogTitle>Update User Role</DialogTitle>
          <DialogDescription>Update the role of the user</DialogDescription>
        </DialogHeader>
        <div>
          <div className="flex flex-col gap-2 mb-4">
            <Label htmlFor="role">User Role</Label>
            <Select onValueChange={onRoleChange} defaultValue={value}>
              <SelectTrigger id="role" name="role" className="w-[180px]">
                <SelectValue placeholder="Role" />
              </SelectTrigger>
              <SelectContent>
                <SelectItem className="flex gap-2" value="USER">
                  USER
                </SelectItem>
                <SelectItem className="flex gap-2" value="ADMIN">
                  ADMIN
                </SelectItem>
              </SelectContent>
            </Select>
          </div>
          <Button className="w-full" onClick={onSubmit} variant="secondary">
            Update
          </Button>
        </div>
      </DialogContent>
    </Dialog>
  );
}

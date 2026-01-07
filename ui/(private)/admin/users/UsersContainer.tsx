"use client";
import { useGetUsers } from "@/hooks/useUsers";
import { useSearchParams } from "next/navigation";
import siteConfig from "@/lib/siteConfig";
import MainPagination from "@/components/MainPagination";
import EmptyListMessage from "@/components/EmptyListMessage";
import { Spinner } from "@/components/ui/spinner";
import UserCard from "./UserCard";
import UpdateUserRoleDialog from "./UpdateUserRoleDialog";
import { useState } from "react";
import { User } from "@prisma/client";
import AdjustPointsDialog from "./AdjustPointsDialog";

export default function UsersContainer() {
  const searchParams = useSearchParams();
  const page = parseInt(searchParams.get("page") ?? "0") || 1;
  const { data, isLoading, error } = useGetUsers({
    page,
  });
  const [updateUserDialogOpen, setUpdateUserDialogOpen] = useState(false);
  const [adjustPointsDialogOpen, setAdjustPointsDialogOpenOpen] =
    useState(false);
  const [selectedUser, setSelectedUser] = useState<User | null>(null);
  if (error) return <p>Error loading users</p>;
  if (!isLoading && (!data || !data.success)) return <p>Error loading users</p>;
  const users = data ? (data.success ? data.data : null) : null;
  const lastPage = Math.ceil((users?.total || 0) / siteConfig.DEFAULT_LIMIT);
  const onUpdateRole = (user: User) => {
    return () => {
      setSelectedUser(user);
      setUpdateUserDialogOpen(true);
    };
  };
  const onAdjustPoints = (user: User) => {
    return () => {
      setSelectedUser(user);
      setAdjustPointsDialogOpenOpen(true);
    };
  };
  return (
    <div>
      <div className="grid @xl/main:grid-cols-2 gap-4">
        {users &&
          users.users.map((user) => (
            <UserCard
              key={user.id}
              id={user.id}
              username={user.username}
              firstname={user.firstname}
              lastname={user.lastname}
              email={user.email}
              image={user.image}
              points={user.points}
              role={user.role}
              onUpdateRole={onUpdateRole(user)}
              onAdjustPoints={onAdjustPoints(user)}
            />
          ))}
      </div>
      <MainPagination page={page} lastPage={lastPage} />
      {users && users.total === 0 && (
        <div>
          <EmptyListMessage
            className="@xl/main:flex-row @xl/main:text-left"
            title="Your transaction history is empty"
            description="Start claiming rewards to track your earned points."
          />
        </div>
      )}
      {isLoading && (
        <div className="w-full py-8">
          <Spinner className="size-16 text-secondary mx-auto" />
        </div>
      )}
      {selectedUser && (
        <UpdateUserRoleDialog
          user={selectedUser}
          open={updateUserDialogOpen}
          onOpenChange={setUpdateUserDialogOpen}
        />
      )}
      {selectedUser && (
        <AdjustPointsDialog
          user={selectedUser}
          open={adjustPointsDialogOpen}
          onOpenChange={setAdjustPointsDialogOpenOpen}
        />
      )}
    </div>
  );
}

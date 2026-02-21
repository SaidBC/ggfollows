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
import { IconUsers } from "@tabler/icons-react";
import AdjustPointsDialog from "./AdjustPointsDialog";

import UserTable from "./UserTable";

export default function UsersContainer() {
  const searchParams = useSearchParams();
  const page = parseInt(searchParams.get("page") ?? "0") || 1;
  const [search, setSearch] = useState("");
  const { data, isLoading, error } = useGetUsers({
    page,
  });
  const [updateUserDialogOpen, setUpdateUserDialogOpen] = useState(false);
  const [adjustPointsDialogOpen, setAdjustPointsDialogOpenOpen] =
    useState(false);
  const [selectedUser, setSelectedUser] = useState<User | null>(null);

  if (error) return <p className="text-xs font-bold text-rose-500 uppercase tracking-widest">Error loading users</p>;
  
  const users = data ? (data.success ? data.data : null) : null;
  const lastPage = Math.ceil((users?.total || 0) / siteConfig.DEFAULT_LIMIT);

  const filteredUsers = (users?.users || []).filter(u => 
    u.username?.toLowerCase().includes(search.toLowerCase()) ||
    u.email?.toLowerCase().includes(search.toLowerCase())
  );

  const onUpdateRole = (user: User) => {
    setSelectedUser(user);
    setUpdateUserDialogOpen(true);
  };
  const onAdjustPoints = (user: User) => {
    setSelectedUser(user);
    setAdjustPointsDialogOpenOpen(true);
  };

  return (
    <div className="space-y-6">
      {/* Search Bar */}
      <div className="flex items-center gap-4 bg-card/20 backdrop-blur-md border border-border/10 p-2 pl-4 rounded-2xl w-full md:w-96 group focus-within:border-secondary/40 transition-colors">
        <IconUsers className="h-4 w-4 text-muted-foreground/40 group-focus-within:text-secondary transition-colors" />
        <input 
          placeholder="Search creators..." 
          className="bg-transparent border-none outline-none text-xs font-bold text-foreground placeholder:text-muted-foreground/30 w-full"
          value={search}
          onChange={(e) => setSearch(e.target.value)}
        />
      </div>

      <div className="relative">
        {isLoading && (
          <div className="absolute inset-0 bg-background/20 backdrop-blur-[2px] z-10 flex items-center justify-center rounded-[2rem]">
            <Spinner className="size-16 text-secondary mx-auto" />
          </div>
        )}
        
        {users && users.total > 0 && (
           <UserTable 
              users={filteredUsers} 
              onUpdateRole={onUpdateRole} 
              onAdjustPoints={onAdjustPoints} 
           />
        )}

        {!isLoading && users && users.total === 0 && (
          <EmptyListMessage
            className="bg-card/20 border border-border/10 rounded-[2rem] p-12"
            title="No creators found"
            description="The system currently has no registered users matching your criteria."
          />
        )}
      </div>

      <div className="flex justify-center pt-4">
        <MainPagination page={page} lastPage={lastPage} />
      </div>

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

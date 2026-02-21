import AdminHeader from "@/ui/(private)/admin/AdminHeader";
import UsersContainer from "@/ui/(private)/admin/users/UsersContainer";
import { IconUsers } from "@tabler/icons-react";

export default function Page() {
  return (
    <main className="p-8 space-y-8 max-w-7xl mx-auto">
      <AdminHeader 
        title="User Management" 
        description="Monitor and manage GGfollows creators"
        icon={IconUsers}
      />

      <section className="animate-fade-up">
        <UsersContainer />
      </section>
    </main>
  );
}

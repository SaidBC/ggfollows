import AdminHeader from "@/ui/(private)/admin/AdminHeader";
import AdminTasksContainer from "@/ui/(private)/admin/tasks/AdminTasksContainer";
import { IconChecklist } from "@tabler/icons-react";
import { Metadata } from "next";

export const metadata: Metadata = {
  title: "Admin Tasks | GG Admin",
  description: "Monitor and manage user-created tasks",
};

export default function AdminTasksPage() {
  return (
    <main className="p-8 space-y-8 max-w-7xl mx-auto">
      <AdminHeader 
        title="Task Management" 
        description="Monitor system-wide task assignments and progress"
        icon={IconChecklist}
      />

      <section className="animate-fade-up">
        <AdminTasksContainer />
      </section>
    </main>
  );
}

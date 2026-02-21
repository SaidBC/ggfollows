import AdminHeader from "@/ui/(private)/admin/AdminHeader";
import AdminOverviewContainer from "@/ui/(private)/admin/overview/AdminOverviewContainer";
import { IconDashboard } from "@tabler/icons-react";

export const metadata = {
  title: "Admin Overview | GG Admin",
  description: "System-wide metrics and dashboard",
};

export default function AdminOverviewPage() {
  return (
    <main className="p-8 space-y-8 max-w-7xl mx-auto">
      <AdminHeader 
        title="Admin Overview" 
        description="System-wide metrics and dashboard at a glance"
        icon={IconDashboard}
      />

      <section className="space-y-6">
        <div className="flex items-center justify-between">
           <h2 className="text-sm font-black uppercase tracking-widest text-muted-foreground/40 italic">Global Stats</h2>
        </div>
        <AdminOverviewContainer />
      </section>

      {/* Future sections like Recent Activity or Charts can go here */}
    </main>
  );
}

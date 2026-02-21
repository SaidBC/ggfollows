import TicketList from "@/ui/(private)/admin/support/TicketList";
import { IconMessage2 } from "@tabler/icons-react";

export const metadata = {
  title: "Support Tickets | GG Admin",
  description: "Manage user support requests",
};

export default function AdminSupportPage() {
  return (
    <main className="p-6 space-y-8">
      {/* Header Section */}
      <div className="flex flex-col gap-2">
        <div className="flex items-center gap-3">
          <div className="p-3 rounded-2xl bg-secondary/10 text-secondary shadow-inner">
            <IconMessage2 size={24} />
          </div>
          <div>
            <h1 className="text-3xl font-black text-foreground tracking-tight uppercase italic">Support Tickets</h1>
            <p className="text-xs text-muted-foreground font-bold tracking-widest uppercase">
              Manage and respond to user inquiries
            </p>
          </div>
        </div>
      </div>

      {/* Ticket Management Section */}
      <section className="animate-fade-up">
        <TicketList />
      </section>
    </main>
  );
}

import AdminHeader from "@/ui/(private)/admin/AdminHeader";
import AdminTransactionsContainer from "@/ui/(private)/admin/transactions/AdminTransactionsContainer";
import { IconHistory } from "@tabler/icons-react";
import { Metadata } from "next";

export const metadata: Metadata = {
  title: "Admin Transactions | GG Admin",
  description: "Monitor point movements and system economy",
};

export default function AdminTransactionsPage() {
  return (
    <main className="p-8 space-y-8 max-w-7xl mx-auto">
      <AdminHeader 
        title="Transaction Audit" 
        description="Monitor point movements, rewards, and system economy"
        icon={IconHistory} // Tabler icons uses IconHistory
      />

      <section className="animate-fade-up">
        <AdminTransactionsContainer />
      </section>
    </main>
  );
}

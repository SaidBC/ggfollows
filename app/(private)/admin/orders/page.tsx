import AdminHeader from "@/ui/(private)/admin/AdminHeader";
import ActiveOrdersContainer from "@/ui/(private)/admin/orders/ActiveOrdersContainer";
import { IconReceipt } from "@tabler/icons-react";
import { Metadata } from "next";

export const metadata: Metadata = {
  title: "Admin Orders | GG Admin",
  description: "Manage and monitor platform orders",
};

export default function Page() {
  return (
    <main className="p-8 space-y-8 max-w-7xl mx-auto">
      <AdminHeader 
        title="Active Orders" 
        description="Monitor and manage real-time platform transactions"
        icon={IconReceipt}
      />

      <section className="animate-fade-up">
        <ActiveOrdersContainer />
      </section>
    </main>
  );
}

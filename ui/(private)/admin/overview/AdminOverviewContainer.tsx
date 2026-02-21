"use client";

import { useEffect, useState } from "react";
import apiAxios from "@/lib/apiAxios";
import AdminStatCard from "./AdminStatCard";
import { 
  IconUsers, 
  IconReceipt, 
  IconChecklist, 
  IconMessage2,
  IconChartBar,
  IconActivity
} from "@tabler/icons-react";
import { Loader2 } from "lucide-react";

interface OverviewStats {
  totalUsers: number;
  totalOrders: number;
  totalTasks: number;
  totalTickets: number;
  activeOrders: number;
  activeTasks: number;
}

export default function AdminOverviewContainer() {
  const [stats, setStats] = useState<OverviewStats | null>(null);
  const [isLoading, setIsLoading] = useState(true);

  useEffect(() => {
    const fetchStats = async () => {
      try {
        const res = await apiAxios.get("/admin/overview");
        if (res.data.success) {
          setStats(res.data.data);
        }
      } catch (error) {
        console.error("Failed to fetch overview stats", error);
      } finally {
        setIsLoading(false);
      }
    };
    fetchStats();
  }, []);

  if (isLoading) {
    return (
      <div className="flex flex-col items-center justify-center min-h-[400px] gap-4 text-muted-foreground">
        <Loader2 className="h-10 w-10 animate-spin text-secondary" />
        <p className="text-xs font-black uppercase tracking-[0.3em]">Gathering System Intelligence...</p>
      </div>
    );
  }

  if (!stats) return null;

  return (
    <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6 animate-fade-up">
      <AdminStatCard 
        label="Total Users" 
        value={stats.totalUsers} 
        icon={IconUsers} 
        description="Total registered creators"
      />
      <AdminStatCard 
        label="Active Orders" 
        value={stats.activeOrders} 
        icon={IconReceipt} 
        description={`${stats.totalOrders} total platform orders`}
      />
       <AdminStatCard 
        label="Active Tasks" 
        value={stats.activeTasks} 
        icon={IconChecklist} 
        description={`${stats.totalTasks} total tasks created`}
      />
      <AdminStatCard 
        label="Support Tickets" 
        value={stats.totalTickets} 
        icon={IconMessage2} 
        description="Pending and open inquiries"
      />
      
      {/* placeholders for more advanced stats later */}
      <AdminStatCard 
        label="System Health" 
        value="100%" 
        icon={IconActivity} 
        description="All services operational"
        className="opacity-50"
      />
      <AdminStatCard 
        label="Growth Rate" 
        value="+12%" 
        icon={IconChartBar} 
        trend={{ value: 12, isUp: true }}
        className="opacity-50"
      />
    </div>
  );
}

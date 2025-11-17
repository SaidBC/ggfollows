"use client";

import { useSidebar } from "@/components/ui/sidebar";
import PointsIcon from "@/components/vectors/PointIcon";

export default function PointsView({ amount }: { amount: number }) {
  const { open } = useSidebar();
  return (
    <div className="flex items-center gap-4 bg-sidebar-accent p-2 rounded-md">
      <div className="text-secondary">
        <PointsIcon width={open ? 36 : 16} height={open ? 36 : 16} />
      </div>

      {open && (
        <span>
          Points amount :{" "}
          <span className="text-secondary font-bold">{amount}</span>
        </span>
      )}
    </div>
  );
}

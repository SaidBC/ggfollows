"use client";

import { useSidebar } from "@/components/ui/sidebar";
import { Skeleton } from "@/components/ui/skeleton";
import PointsIcon from "@/components/vectors/PointIcon";
import formatNumber from "@/utils/formatNumber";

export default function PointsView({
  amount,
  isLoading,
}: {
  amount: number;
  isLoading: boolean;
}) {
  const { open } = useSidebar();
  return (
    <div className="flex items-center gap-4 bg-sidebar-accent p-2 rounded-md">
      <div className="text-secondary">
        <PointsIcon width={open ? 36 : 16} height={open ? 36 : 16} />
      </div>

      {open && (
        <span className="flex items-center gap-2 text-sm ">
          <span>Points amount :</span>
          {!isLoading ? (
            <span className="text-secondary font-bold">
              {formatNumber(amount)}
            </span>
          ) : (
            <Skeleton className="w-6 h-4 bg-secondary" />
          )}
        </span>
      )}
    </div>
  );
}

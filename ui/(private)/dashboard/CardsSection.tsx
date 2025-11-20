"use client";

import BalanceCard from "./BalanceCard";
import { Suspense } from "react";
import SkeletonCard from "./SkeletonCard";
import { QueryErrorResetBoundary } from "@tanstack/react-query";
import { ErrorBoundary } from "react-error-boundary";
import DailyRewardCard from "./DailyRewardCard";
import CampaignList from "./CampaingsList";

export default function CardsSection() {
  return (
    <div className="*:data-[slot=card]:from-secondary/5 *:data-[slot=card]:to-card dark:*:data-[slot=card]:bg-card grid grid-cols-1 gap-4 px-4 *:data-[slot=card]:bg-linear-to-t *:data-[slot=card]:shadow-xs lg:px-6 @xl/main:grid-cols-2 ">
      <QueryErrorResetBoundary>
        {({ reset }) => (
          <ErrorBoundary
            onReset={reset}
            fallbackRender={({ resetErrorBoundary }) => (
              <div>
                There was an error!
                <button onClick={() => resetErrorBoundary()}>Try again</button>
              </div>
            )}
          >
            <Suspense fallback={<SkeletonCard />}>
              <BalanceCard />
            </Suspense>
          </ErrorBoundary>
        )}
      </QueryErrorResetBoundary>
      <QueryErrorResetBoundary>
        {({ reset }) => (
          <ErrorBoundary
            onReset={reset}
            fallbackRender={({ resetErrorBoundary }) => (
              <div>
                There was an error!
                <button onClick={() => resetErrorBoundary()}>Try again</button>
              </div>
            )}
          >
            <Suspense fallback={<SkeletonCard />}>
              <DailyRewardCard />
            </Suspense>
          </ErrorBoundary>
        )}
      </QueryErrorResetBoundary>
      <CampaignList />
    </div>
  );
}

"use client";
import { Suspense } from "react";
import YourTasksList from "./YourTasksList";
import { QueryErrorResetBoundary } from "@tanstack/react-query";
import { ErrorBoundary } from "react-error-boundary";
import { Spinner } from "@/components/ui/spinner";

export default function YourTasksSection() {
  return (
    <div className="flex flex-col gap-4 py-4 md:gap-6 md:py-6 lg:px-6 px-2">
      <h1 className="font-bold text-3xl my-2 text-neutral-300">Your Tasks</h1>
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
            <Suspense
              fallback={<Spinner className="size-16 text-secondary mx-auto" />}
            >
              <YourTasksList />
            </Suspense>
          </ErrorBoundary>
        )}
      </QueryErrorResetBoundary>
    </div>
  );
}

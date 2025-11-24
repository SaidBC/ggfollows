"use client";

import { Suspense } from "react";
import SkeletonCard from "../dashboard/SkeletonCard";
import { QueryErrorResetBoundary } from "@tanstack/react-query";
import { ErrorBoundary } from "react-error-boundary";
import TasksList from "./TasksList";
import { Spinner } from "@/components/ui/spinner";

export default function TasksSection() {
  return (
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
            <TasksList />
          </Suspense>
        </ErrorBoundary>
      )}
    </QueryErrorResetBoundary>
  );
}

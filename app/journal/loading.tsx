import { Skeleton } from "@/components/ui/skeleton"

export default function Loading() {
  return (
    <div className="flex min-h-screen flex-col items-center bg-section-light p-4 sm:p-6 lg:p-8">
      <div className="container-responsive w-full max-w-4xl space-y-6">
        {/* Header Skeleton */}
        <div className="flex items-center justify-between">
          <Skeleton className="h-8 w-32" />
          <Skeleton className="h-8 w-24" />
        </div>

        {/* Journal Entry Skeletons */}
        <div className="space-y-6">
          <Skeleton className="h-48 w-full rounded-lg" />
          <Skeleton className="h-48 w-full rounded-lg" />
          <Skeleton className="h-48 w-full rounded-lg" />
        </div>

        {/* Pagination Skeleton */}
        <div className="flex justify-center">
          <Skeleton className="h-10 w-48 rounded-md" />
        </div>
      </div>
    </div>
  )
}

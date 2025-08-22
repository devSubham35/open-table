const ResturantCardListingSkeleton = () => {
  return (
    <div className="grid grid-cols-2 md:grid-cols-4 gap-5 py-6">
      {Array.from({ length: 5 }).map((_, i) => (
        <div
          key={i}
          className="group flex flex-col w-full rounded-2xl border bg-card shadow-sm overflow-hidden animate-pulse"
        >
          {/* Image Skeleton */}
          <div className="w-full h-[140px] bg-muted rounded-t-2xl" />

          {/* Content Skeleton */}
          <div className="p-3 flex flex-col justify-between flex-1">
            {/* Title + Description */}
            <div className="space-y-2">
              <div className="h-4 w-2/3 bg-muted rounded" />
              <div className="h-3 w-full bg-muted rounded" />
              <div className="h-3 w-5/6 bg-muted rounded" />
            </div>

            {/* Bottom Info */}
            <div className="space-y-3 mt-4">
              <div className="flex items-center gap-2">
                <div className="h-3 w-16 bg-muted rounded" />
                <div className="h-3 w-14 bg-muted rounded ml-4" />
              </div>
              <div className="h-4 w-20 bg-muted rounded" />
            </div>
          </div>
        </div>
      ))}
    </div>
  )
}

export default ResturantCardListingSkeleton

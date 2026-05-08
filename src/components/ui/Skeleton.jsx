function Skeleton({ className = '' }) {
  return (
    <div
      className={[
        'animate-pulse rounded-[8px] bg-gradient-to-r from-ink-100 via-white to-ink-100 bg-[length:200%_100%]',
        className,
      ].join(' ')}
      aria-hidden="true"
    />
  );
}

export function ProductCardSkeleton() {
  return (
    <div className="overflow-hidden rounded-[8px] bg-white shadow-soft ring-1 ring-ink-200/70">
      <Skeleton className="aspect-[4/5] w-full" />
      <div className="space-y-4 p-5">
        <div className="flex items-start justify-between gap-4">
          <div className="flex-1 space-y-2">
            <Skeleton className="h-4 w-24" />
            <Skeleton className="h-5 w-36" />
          </div>
          <Skeleton className="h-5 w-14" />
        </div>
        <div className="flex items-center justify-between">
          <Skeleton className="h-4 w-16" />
          <div className="flex gap-2">
            <Skeleton className="h-10 w-10 rounded-full" />
            <Skeleton className="h-10 w-20 rounded-full" />
          </div>
        </div>
      </div>
    </div>
  );
}

export function TextBlockSkeleton({ lines = 3 }) {
  return (
    <div className="space-y-3">
      {Array.from({ length: lines }).map((_, index) => (
        <Skeleton
          key={index}
          className={index === lines - 1 ? 'h-4 w-2/3' : 'h-4 w-full'}
        />
      ))}
    </div>
  );
}

export default Skeleton;

import { cn } from "@/lib/utils"


function Skeleton({ className, ...props }: React.ComponentProps<"div">) {
  return (
    <div
      data-slot="skeleton"
      className={cn(
        "animate-pulse rounded-xl bg-muted/50 ",
        className
      )}
      {...props}
    />
  )
}

type SkeletonTableProps = {
  rows?: number
  columns?: number
  className?: string
}

function SkeletonTable({ rows = 6, columns = 4, className }: SkeletonTableProps) {
  const cols = Array.from({ length: columns });

  return (
    <div className={cn("space-y-3", className)}>
      
      {/* Header */}
      <div className="flex gap-4">
        {cols.map((_, i) => (
          <Skeleton
            key={`header-${i}`}
            className={cn(
              "h-8 flex-1 bg-primary",
            )}
            style={{ opacity: (30 + i * 10) / 100 }}
          />
        ))}
      </div>

      {/* Rows */}
      {Array.from({ length: rows }).map((_, rowIndex) => (
        <div key={rowIndex} className="flex gap-4">
          {cols.map((_, colIndex) => (
            <Skeleton
              key={`row-${rowIndex}-col-${colIndex}`}
              className={cn(
                "h-5 flex-1 bg-primary"
              )}
              style={{ opacity: (30 + rowIndex * 10) / 100 }}
            />
          ))}
        </div>
      ))}
    </div>
  );
}

export { Skeleton, SkeletonTable }

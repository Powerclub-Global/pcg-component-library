import { cn } from "../../lib/cn";

export interface SkeletonProps extends React.HTMLAttributes<HTMLDivElement> {}

function Skeleton({ className, ...props }: SkeletonProps) {
  return (
    <div
      className={cn(
        "animate-pulse rounded-md bg-[var(--color-muted,theme(colors.neutral.200))]/50",
        className
      )}
      {...props}
    />
  );
}

export { Skeleton };

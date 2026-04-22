import { cn } from "../../lib/cn";

export interface SkeletonProps extends React.HTMLAttributes<HTMLDivElement> {}

function Skeleton({ className, style, ...props }: SkeletonProps) {
  return (
    <div
      className={cn("relative overflow-hidden rounded-sm", className)}
      style={{ background: "rgba(255,255,255,0.06)", ...style }}
      {...props}
    >
      <div
        className="absolute inset-0"
        style={{
          background:
            "linear-gradient(90deg, transparent 0%, rgba(255,255,255,0.08) 40%, rgba(255,255,255,0.15) 50%, rgba(255,255,255,0.08) 60%, transparent 100%)",
          animation: "pcg-shimmer 1.8s ease-in-out infinite",
        }}
      />
      <style>{`
        @keyframes pcg-shimmer {
          0% { transform: translateX(-100%); }
          100% { transform: translateX(100%); }
        }
      `}</style>
    </div>
  );
}

export { Skeleton };

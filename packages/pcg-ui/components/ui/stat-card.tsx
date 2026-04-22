import { cn } from "../../lib/cn";

export interface StatCardTrend {
  value: number;
  positive: boolean;
}

export interface StatCardProps {
  title: string;
  value: string | number;
  subtitle?: string;
  icon?: React.ReactNode;
  trend?: StatCardTrend;
  onClick?: () => void;
  className?: string;
}

function TrendArrow({ positive }: { positive: boolean }) {
  return (
    <svg
      className="mr-0.5 inline-block h-3.5 w-3.5"
      style={{ color: positive ? "#22c55e" : "#ffffff" }}
      fill="none"
      stroke="currentColor"
      viewBox="0 0 24 24"
    >
      {positive ? (
        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2.5} d="M7 17l5-5 5 5M7 7l5 5 5-5" />
      ) : (
        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2.5} d="M7 7l5 5 5-5M7 17l5-5 5 5" />
      )}
    </svg>
  );
}

export function StatCard({
  title,
  value,
  subtitle,
  icon,
  trend,
  onClick,
  className,
}: StatCardProps) {
  const Wrapper = onClick ? "button" : "div";

  return (
    <Wrapper
      onClick={onClick}
      className={cn(
        "group relative rounded-xl p-6 text-left backdrop-blur-xl transition-all",
        onClick && "cursor-pointer",
        className
      )}
      style={{
        background: "rgba(255,255,255,0.06)",
        border: "1px solid rgba(255,255,255,0.1)",
        color: "rgba(255,255,255,0.88)",
      }}
    >
      <div className="flex items-start justify-between gap-4">
        <div className="min-w-0 space-y-2">
          <p
            className="text-xs font-semibold uppercase tracking-wider"
            style={{ color: "rgba(255,255,255,0.4)" }}
          >
            {title}
          </p>
          <p
            className="font-bold tracking-tight text-white"
            style={{ fontSize: "2rem", lineHeight: 0.95 }}
          >
            {value}
          </p>
          {subtitle && (
            <p className="text-sm" style={{ color: "rgba(255,255,255,0.6)" }}>
              {subtitle}
            </p>
          )}
          {trend && (
            <div
              className="inline-flex items-center gap-1 rounded-sm px-2.5 py-0.5 text-xs font-semibold"
              style={{
                background: trend.positive ? "rgba(34,197,94,0.1)" : "rgba(255,255,255,0.1)",
                color: trend.positive ? "#22c55e" : "#ffffff",
              }}
            >
              <TrendArrow positive={trend.positive} />
              {trend.positive ? "+" : ""}
              {trend.value}%
            </div>
          )}
        </div>
        {icon && (
          <div
            className="flex h-11 w-11 shrink-0 items-center justify-center rounded-sm"
            style={{
              background: "rgba(255,255,255,0.1)",
              color: "#ffffff",
            }}
          >
            {icon}
          </div>
        )}
      </div>
    </Wrapper>
  );
}

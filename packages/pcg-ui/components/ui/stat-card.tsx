import { cn } from "../../lib/cn";

export interface StatCardTrend {
  value: number;
  positive: boolean;
}

export interface StatCardProps {
  /** Label above the value */
  title: string;
  /** Primary display value */
  value: string | number;
  /** Secondary text below the value */
  subtitle?: string;
  /** Icon element rendered top-right */
  icon?: React.ReactNode;
  /** Trend indicator */
  trend?: StatCardTrend;
  /** Optional click handler */
  onClick?: () => void;
  className?: string;
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
        "rounded-xl border border-[var(--color-border)] bg-[var(--color-surface)] p-5 text-left transition-colors",
        onClick && "cursor-pointer hover:border-[var(--color-accent)]",
        className
      )}
    >
      <div className="flex items-start justify-between">
        <div className="space-y-1">
          <p className="text-sm text-[var(--color-muted-foreground)]">{title}</p>
          <p className="text-3xl font-bold text-[var(--color-foreground)]">
            {value}
          </p>
          {subtitle && (
            <p className="text-sm text-[var(--color-muted-foreground)]">
              {subtitle}
            </p>
          )}
          {trend && (
            <p
              className={cn(
                "text-sm",
                trend.positive ? "text-green-500" : "text-red-500"
              )}
            >
              {trend.positive ? "+" : ""}
              {trend.value}%
            </p>
          )}
        </div>
        {icon && (
          <div className="text-[var(--color-accent)] shrink-0">{icon}</div>
        )}
      </div>
    </Wrapper>
  );
}

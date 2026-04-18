export interface TrustBadge {
  id: string;
  label: string;
  shortLabel?: string;
  image: string;
}

export interface TrustBadgesProps {
  badges: TrustBadge[];
  heading?: string;
  description?: string;
  layout?: "row" | "grid";
  showLabels?: boolean;
  badgeSize?: number;
  className?: string;
}

export function TrustBadges({
  badges,
  heading,
  description,
  layout = "row",
  showLabels = true,
  badgeSize = 32,
  className = "",
}: TrustBadgesProps) {
  if (!badges || badges.length === 0) return null;

  return (
    <div className={className}>
      {heading && (
        <div className="text-xs text-[var(--color-text-muted,#666)] mb-2 font-medium uppercase tracking-wide">
          {heading}
        </div>
      )}

      <div
        className={
          layout === "grid"
            ? "grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 gap-4"
            : "flex gap-4 items-center flex-wrap"
        }
      >
        {badges.map((badge) => (
          <div
            key={badge.id}
            className="flex items-center gap-2"
            title={badge.label}
          >
            <img
              src={badge.image}
              alt={badge.label}
              style={{ height: badgeSize, width: badgeSize }}
              className="object-contain opacity-90"
              loading="lazy"
            />
            {showLabels && (
              <span className="text-xs text-[var(--color-text-muted,#666)] hidden sm:inline">
                {badge.shortLabel || badge.label}
              </span>
            )}
          </div>
        ))}
      </div>

      {description && (
        <p className="text-xs text-[var(--color-text-muted,#666)] mt-2">
          {description}
        </p>
      )}
    </div>
  );
}

export default TrustBadges;

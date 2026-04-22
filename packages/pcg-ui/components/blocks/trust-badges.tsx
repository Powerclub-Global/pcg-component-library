export interface TrustBadge {
  id: string;
  label: string;
  shortLabel?: string;
  image?: string;
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
    <div
      className={`px-6 py-10 ${className}`}
      style={{ backgroundColor: "#0d0d0d", color: "rgba(255,255,255,0.88)" }}
    >
      <div className="mx-auto max-w-6xl">
        {heading && (
          <p
            className="mb-6 text-center text-xs font-semibold uppercase tracking-widest"
            style={{ color: "rgba(255,255,255,0.4)" }}
          >
            {heading}
          </p>
        )}

        <div
          className={
            layout === "grid"
              ? "grid grid-cols-2 gap-4 sm:grid-cols-3 md:grid-cols-4"
              : "flex flex-wrap items-center justify-center gap-x-8 gap-y-4"
          }
        >
          {badges.map((badge) => (
            <div
              key={badge.id}
              className="flex items-center gap-3"
              title={badge.label}
              style={{ color: "rgba(255,255,255,0.6)" }}
            >
              {badge.image ? (
                <img
                  src={badge.image}
                  alt={badge.label}
                  style={{ height: badgeSize, width: badgeSize }}
                  className="object-contain opacity-60 transition-opacity hover:opacity-100"
                  loading="lazy"
                />
              ) : (
                <div
                  className="flex items-center justify-center rounded-sm text-xs font-bold uppercase"
                  style={{
                    height: badgeSize,
                    width: badgeSize,
                    background: "rgba(255,255,255,0.06)",
                    border: "1px solid rgba(255,255,255,0.1)",
                    color: "rgba(255,255,255,0.6)",
                  }}
                >
                  {badge.label.charAt(0)}
                </div>
              )}
              {showLabels && (
                <span className="text-xs font-medium tracking-wide">
                  {badge.shortLabel || badge.label}
                </span>
              )}
            </div>
          ))}
        </div>

        {description && (
          <p
            className="mt-4 text-center text-xs leading-relaxed"
            style={{ color: "rgba(255,255,255,0.4)" }}
          >
            {description}
          </p>
        )}
      </div>
    </div>
  );
}

export default TrustBadges;

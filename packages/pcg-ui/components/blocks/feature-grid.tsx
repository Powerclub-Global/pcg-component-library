export interface FeatureItem {
  step?: number;
  icon?: React.ReactNode;
  title: string;
  subtitle?: string;
  description: string;
}

export interface FeatureGridProps {
  heading?: string;
  highlight?: string;
  description?: string;
  features: FeatureItem[];
  columns?: 2 | 3 | 4;
  className?: string;
}

const colsMap = {
  2: "sm:grid-cols-2",
  3: "sm:grid-cols-2 lg:grid-cols-3",
  4: "sm:grid-cols-2 lg:grid-cols-4",
};

export function FeatureGrid({
  heading,
  highlight,
  description,
  features,
  columns = 4,
  className = "",
}: FeatureGridProps) {
  return (
    <section
      className={`px-6 py-20 md:py-28 ${className}`}
      style={{ backgroundColor: "#0d0d0d", color: "rgba(255,255,255,0.88)" }}
    >
      <div className="mx-auto max-w-7xl">
        {(heading || description) && (
          <div className="mb-14 text-center">
            {heading && (
              <h2
                className="font-semibold uppercase text-white"
                style={{
                  fontSize: "clamp(2.5rem, 5vw, 4.5rem)",
                  lineHeight: 0.95,
                  letterSpacing: "0.02em",
                }}
              >
                {heading}
                {highlight && (
                  <>
                    {" "}
                    <span style={{ color: "#ffffff" }}>{highlight}</span>
                  </>
                )}
              </h2>
            )}
            {description && (
              <p
                className="mx-auto mt-4 max-w-2xl text-lg"
                style={{ color: "rgba(255,255,255,0.6)" }}
              >
                {description}
              </p>
            )}
          </div>
        )}

        <div className={`grid grid-cols-1 gap-6 ${colsMap[columns]}`}>
          {features.map((feature, i) => (
            <div
              key={i}
              className="relative h-full overflow-hidden rounded-xl p-6 backdrop-blur-xl transition-all duration-300"
              style={{
                background: "rgba(255,255,255,0.06)",
                border: "1px solid rgba(255,255,255,0.1)",
              }}
            >
              {(feature.step !== undefined || feature.icon) && (
                <div className="mb-4">
                  {feature.step !== undefined ? (
                    <div
                      className="absolute right-4 top-4 font-bold leading-none"
                      style={{
                        color: "rgba(255,255,255,0.2)",
                        fontSize: "4rem",
                      }}
                    >
                      {String(feature.step).padStart(2, "0")}
                    </div>
                  ) : (
                    <div style={{ color: "#ffffff" }}>{feature.icon}</div>
                  )}
                </div>
              )}
              <h3
                className="mb-1 font-semibold uppercase text-white"
                style={{ fontSize: "1.5rem", lineHeight: 0.95 }}
              >
                {feature.title}
              </h3>
              {feature.subtitle && (
                <p
                  className="mb-3 text-xs font-semibold uppercase tracking-widest"
                  style={{ color: "#ffffff" }}
                >
                  {feature.subtitle}
                </p>
              )}
              <p
                className="text-sm leading-relaxed"
                style={{ color: "rgba(255,255,255,0.6)" }}
              >
                {feature.description}
              </p>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}

export default FeatureGrid;

export interface FeatureItem {
  icon?: React.ReactNode;
  title: string;
  description: string;
}

export interface FeatureGridProps {
  heading?: string;
  description?: string;
  features: FeatureItem[];
  columns?: 2 | 3 | 4;
  variant?: "cards" | "minimal" | "centered";
  className?: string;
}

const colsMap = {
  2: "md:grid-cols-2",
  3: "md:grid-cols-2 lg:grid-cols-3",
  4: "md:grid-cols-2 lg:grid-cols-4",
};

export function FeatureGrid({
  heading,
  description,
  features,
  columns = 3,
  variant = "cards",
  className = "",
}: FeatureGridProps) {
  return (
    <section className={`py-16 lg:py-24 ${className}`}>
      <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
        {(heading || description) && (
          <div className="text-center mb-12 lg:mb-16">
            {heading && (
              <h2 className="text-3xl sm:text-4xl font-bold text-[var(--color-text,#1a1a1a)] mb-4">
                {heading}
              </h2>
            )}
            {description && (
              <p className="text-lg text-[var(--color-text-muted,#666)] max-w-2xl mx-auto">
                {description}
              </p>
            )}
          </div>
        )}

        <div className={`grid gap-6 lg:gap-8 ${colsMap[columns]}`}>
          {features.map((feature, i) => (
            <div
              key={i}
              className={
                variant === "cards"
                  ? "p-6 lg:p-8 rounded-xl border border-[var(--color-border,#e5e5e5)] bg-[var(--color-surface,#ffffff)] hover:shadow-lg transition-shadow duration-300"
                  : variant === "centered"
                    ? "p-6 lg:p-8 text-center"
                    : "p-4"
              }
            >
              {feature.icon && (
                <div
                  className={`mb-4 text-[var(--color-accent)] ${variant === "centered" ? "flex justify-center" : ""}`}
                >
                  {feature.icon}
                </div>
              )}
              <h3 className="text-lg font-bold text-[var(--color-text,#1a1a1a)] mb-2">
                {feature.title}
              </h3>
              <p className="text-sm text-[var(--color-text-muted,#666)] leading-relaxed">
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

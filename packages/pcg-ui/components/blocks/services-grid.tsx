import Link from "next/link";

export interface ServiceItem {
  icon?: React.ReactNode;
  image?: string;
  title: string;
  description: string;
  href?: string;
  linkLabel?: string;
}

export interface ServicesGridProps {
  heading?: string;
  description?: string;
  services: ServiceItem[];
  columns?: 2 | 3 | 4;
  variant?: "cards" | "image-cards" | "minimal";
  className?: string;
}

const colsMap = {
  2: "md:grid-cols-2",
  3: "md:grid-cols-2 lg:grid-cols-3",
  4: "md:grid-cols-2 lg:grid-cols-4",
};

export function ServicesGrid({
  heading,
  description,
  services,
  columns = 3,
  variant = "cards",
  className = "",
}: ServicesGridProps) {
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
          {services.map((service, i) => {
            const content = (
              <>
                {/* Image */}
                {variant === "image-cards" && service.image && (
                  <div className="aspect-video overflow-hidden rounded-t-xl -mx-6 -mt-6 mb-6 lg:-mx-8 lg:-mt-8 lg:mb-8">
                    <img
                      src={service.image}
                      alt={service.title}
                      className="w-full h-full object-cover"
                      loading="lazy"
                    />
                  </div>
                )}

                {/* Icon */}
                {service.icon && (
                  <div className="mb-4 text-[var(--color-accent)]">
                    {service.icon}
                  </div>
                )}

                {/* Title */}
                <h3 className="text-lg font-bold text-[var(--color-text,#1a1a1a)] mb-2">
                  {service.title}
                </h3>

                {/* Description */}
                <p className="text-sm text-[var(--color-text-muted,#666)] leading-relaxed mb-4">
                  {service.description}
                </p>

                {/* Link */}
                {service.href && (
                  <span className="text-sm font-semibold text-[var(--color-accent)] inline-flex items-center gap-1 group-hover:gap-2 transition-all">
                    {service.linkLabel || "Learn more"}
                    <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 5l7 7-7 7" />
                    </svg>
                  </span>
                )}
              </>
            );

            const cardClass =
              variant === "minimal"
                ? "p-4"
                : "p-6 lg:p-8 rounded-xl border border-[var(--color-border,#e5e5e5)] bg-[var(--color-surface,#ffffff)] hover:shadow-lg transition-shadow duration-300 group";

            if (service.href) {
              return (
                <Link key={i} href={service.href} className={`block ${cardClass}`}>
                  {content}
                </Link>
              );
            }

            return (
              <div key={i} className={cardClass}>
                {content}
              </div>
            );
          })}
        </div>
      </div>
    </section>
  );
}

export default ServicesGrid;

import Link from "next/link";

export interface ServiceItem {
  icon?: React.ReactNode;
  image?: string;
  title: string;
  subtitle?: string;
  description?: string;
  price?: string;
  href?: string;
  linkLabel?: string;
}

export interface ServicesGridProps {
  eyebrow?: string;
  heading?: string;
  highlight?: string;
  description?: string;
  services: ServiceItem[];
  columns?: 2 | 3 | 4;
  variant?: "cards" | "image-cards";
  className?: string;
}

const colsMap = {
  2: "sm:grid-cols-2",
  3: "sm:grid-cols-2 lg:grid-cols-3",
  4: "sm:grid-cols-2 lg:grid-cols-4",
};

export function ServicesGrid({
  eyebrow,
  heading,
  highlight,
  description,
  services,
  columns = 3,
  variant = "cards",
  className = "",
}: ServicesGridProps) {
  return (
    <section
      className={`px-6 py-20 md:py-28 ${className}`}
      style={{ backgroundColor: "#0d0d0d", color: "rgba(255,255,255,0.88)" }}
    >
      <div className="mx-auto max-w-7xl">
        {(eyebrow || heading || description) && (
          <div className="mb-14 text-center">
            {eyebrow && (
              <p
                className="mb-4 text-xs font-semibold uppercase tracking-widest"
                style={{ color: "#ffffff" }}
              >
                {eyebrow}
              </p>
            )}
            {heading && (
              <h2
                className="mb-4 font-semibold uppercase tracking-wide text-white"
                style={{ fontSize: "clamp(2.5rem, 5vw, 4rem)", lineHeight: 0.95 }}
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
                className="mx-auto max-w-2xl text-lg"
                style={{ color: "rgba(255,255,255,0.6)" }}
              >
                {description}
              </p>
            )}
          </div>
        )}

        <div className={`grid grid-cols-1 gap-6 ${colsMap[columns]}`}>
          {services.map((service, i) => {
            if (variant === "image-cards") {
              const imageCard = (
                <>
                  {service.image && (
                    <img
                      src={service.image}
                      alt={service.title}
                      className="absolute inset-0 h-full w-full object-cover transition-transform duration-700 group-hover:scale-105"
                      loading="lazy"
                    />
                  )}
                  <div
                    className="absolute inset-0"
                    style={{
                      background:
                        "linear-gradient(to top, rgba(0,0,0,0.9) 0%, rgba(0,0,0,0.5) 50%, rgba(0,0,0,0.2) 100%)",
                    }}
                    aria-hidden="true"
                  />
                  <div className="relative z-10 mt-auto p-6">
                    <h3
                      className="mb-2 font-semibold uppercase tracking-wide text-white"
                      style={{ fontSize: "1.5rem", lineHeight: 0.95 }}
                    >
                      {service.title}
                    </h3>
                    {service.description && (
                      <p
                        className="mb-3 text-sm"
                        style={{ color: "rgba(255,255,255,0.6)" }}
                      >
                        {service.description}
                      </p>
                    )}
                    {service.price && (
                      <p
                        className="text-sm font-semibold"
                        style={{ color: "#ffffff" }}
                      >
                        {service.price}
                      </p>
                    )}
                  </div>
                </>
              );

              const imageClass =
                "group relative flex aspect-[4/3] overflow-hidden rounded-xl";
              const imageStyle = {
                background: "rgba(255,255,255,0.06)",
                border: "1px solid rgba(255,255,255,0.1)",
              };

              if (service.href) {
                return (
                  <Link key={i} href={service.href} className={imageClass} style={imageStyle}>
                    {imageCard}
                  </Link>
                );
              }
              return (
                <div key={i} className={imageClass} style={imageStyle}>
                  {imageCard}
                </div>
              );
            }

            const content = (
              <>
                {service.icon && (
                  <div className="mb-5" style={{ color: "#ffffff" }}>
                    {service.icon}
                  </div>
                )}

                <h3
                  className="mb-3 font-semibold uppercase tracking-wide text-white"
                  style={{ fontSize: "1.5rem", lineHeight: 0.95 }}
                >
                  {service.title}
                </h3>

                {service.subtitle && (
                  <p
                    className="mb-3 text-xs font-semibold uppercase tracking-widest"
                    style={{ color: "#ffffff" }}
                  >
                    {service.subtitle}
                  </p>
                )}

                {service.description && (
                  <p
                    className="mb-4 text-sm leading-relaxed"
                    style={{ color: "rgba(255,255,255,0.6)" }}
                  >
                    {service.description}
                  </p>
                )}

                {service.href && (
                  <span
                    className="inline-flex items-center gap-2 text-xs font-semibold uppercase tracking-widest"
                    style={{ color: "#ffffff" }}
                  >
                    {service.linkLabel || "Learn more"}
                    <svg
                      className="h-4 w-4 transition-transform group-hover:translate-x-1"
                      fill="none"
                      stroke="currentColor"
                      strokeWidth={2}
                      viewBox="0 0 24 24"
                    >
                      <path strokeLinecap="round" strokeLinejoin="round" d="M17 8l4 4m0 0l-4 4m4-4H3" />
                    </svg>
                  </span>
                )}
              </>
            );

            const cardStyle = {
              background: "rgba(255,255,255,0.06)",
              border: "1px solid rgba(255,255,255,0.1)",
            };

            if (service.href) {
              return (
                <Link
                  key={i}
                  href={service.href}
                  className="group relative block h-full overflow-hidden rounded-xl p-6 backdrop-blur-xl transition-colors"
                  style={cardStyle}
                >
                  {content}
                </Link>
              );
            }

            return (
              <div
                key={i}
                className="group relative h-full overflow-hidden rounded-xl p-6 backdrop-blur-xl"
                style={cardStyle}
              >
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

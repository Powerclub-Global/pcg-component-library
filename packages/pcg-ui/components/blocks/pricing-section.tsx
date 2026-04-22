import Link from "next/link";

export interface PricingFeature {
  text: string;
  included?: boolean;
}

export interface PricingTier {
  name: string;
  price: string;
  priceSubtext?: string;
  description?: string;
  features: (string | PricingFeature)[];
  cta: { label: string; href: string };
  popular?: boolean;
}

export interface PricingSectionProps {
  heading?: string;
  description?: string;
  tiers: PricingTier[];
  popularLabel?: string;
  className?: string;
}

export function PricingSection({
  heading,
  description,
  tiers,
  popularLabel = "Most Popular",
  className = "",
}: PricingSectionProps) {
  return (
    <section
      className={`px-6 py-20 ${className}`}
      style={{ backgroundColor: "#0d0d0d", color: "rgba(255,255,255,0.88)" }}
    >
      <div className="mx-auto max-w-7xl">
        {(heading || description) && (
          <div className="mb-14 text-center">
            {heading && (
              <h2
                className="mb-4 font-semibold uppercase tracking-wide text-white"
                style={{ fontSize: "clamp(2rem, 5vw, 3rem)", lineHeight: 0.95 }}
              >
                {heading}
              </h2>
            )}
            {description && (
              <p
                className="mx-auto max-w-2xl text-base"
                style={{ color: "rgba(255,255,255,0.6)" }}
              >
                {description}
              </p>
            )}
          </div>
        )}

        <div
          className={`grid items-stretch gap-6 ${
            tiers.length === 1
              ? "mx-auto max-w-md"
              : tiers.length === 2
              ? "mx-auto max-w-4xl md:grid-cols-2"
              : tiers.length === 3
              ? "sm:grid-cols-2 lg:grid-cols-3"
              : "sm:grid-cols-2 lg:grid-cols-4"
          }`}
        >
          {tiers.map((tier, i) => {
            const cardStyle = tier.popular
              ? {
                  background: "rgba(255,255,255,0.08)",
                  border: "1px solid rgba(255,255,255,0.4)",
                }
              : {
                  background: "rgba(255,255,255,0.06)",
                  border: "1px solid rgba(255,255,255,0.1)",
                };
            return (
              <div
                key={i}
                className="relative flex flex-col rounded-xl p-6 backdrop-blur-xl"
                style={cardStyle}
              >
                {tier.popular && (
                  <div
                    className="absolute -top-3 left-1/2 -translate-x-1/2 rounded-sm px-4 py-1 text-[10px] font-bold uppercase tracking-widest"
                    style={{ backgroundColor: "#ffffff", color: "#000000" }}
                  >
                    {popularLabel}
                  </div>
                )}

                <h3
                  className="font-semibold uppercase tracking-wide text-white"
                  style={{ fontSize: "1.5rem", lineHeight: 0.95 }}
                >
                  {tier.name}
                </h3>

                {tier.description && (
                  <p
                    className="mb-5 mt-1 text-sm"
                    style={{ color: "rgba(255,255,255,0.6)" }}
                  >
                    {tier.description}
                  </p>
                )}

                <p className="mb-6 mt-2 font-bold" style={{ color: "#ffffff", fontSize: "2rem" }}>
                  {tier.price}
                  {tier.priceSubtext && (
                    <span
                      className="ml-2 text-sm font-normal"
                      style={{ color: "rgba(255,255,255,0.6)" }}
                    >
                      {tier.priceSubtext}
                    </span>
                  )}
                </p>

                <ul className="mb-6 flex-1 space-y-2">
                  {tier.features.map((feature, fi) => {
                    const text = typeof feature === "string" ? feature : feature.text;
                    const included = typeof feature === "string" ? true : feature.included !== false;
                    return (
                      <li
                        key={fi}
                        className="flex items-start gap-2 text-sm"
                        style={{
                          color: included ? "rgba(255,255,255,0.6)" : "rgba(255,255,255,0.3)",
                          textDecoration: included ? undefined : "line-through",
                        }}
                      >
                        <svg
                          className="mt-0.5 h-4 w-4 shrink-0"
                          style={{ color: included ? "#ffffff" : "rgba(255,255,255,0.2)" }}
                          fill="none"
                          stroke="currentColor"
                          strokeWidth={2}
                          viewBox="0 0 24 24"
                        >
                          {included ? (
                            <path strokeLinecap="round" strokeLinejoin="round" d="M5 13l4 4L19 7" />
                          ) : (
                            <path strokeLinecap="round" strokeLinejoin="round" d="M6 18L18 6M6 6l12 12" />
                          )}
                        </svg>
                        <span>{text}</span>
                      </li>
                    );
                  })}
                </ul>

                <Link
                  href={tier.cta.href}
                  className="block rounded-sm py-2.5 text-center text-sm font-semibold uppercase tracking-wider transition-all hover:brightness-110"
                  style={{ backgroundColor: "#ffffff", color: "#000000" }}
                >
                  {tier.cta.label}
                </Link>
              </div>
            );
          })}
        </div>
      </div>
    </section>
  );
}

export default PricingSection;

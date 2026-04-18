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

        <div
          className={`grid gap-8 items-stretch ${
            tiers.length === 1
              ? "max-w-md mx-auto"
              : tiers.length === 2
                ? "md:grid-cols-2 max-w-4xl mx-auto"
                : tiers.length === 3
                  ? "md:grid-cols-2 lg:grid-cols-3"
                  : "md:grid-cols-2 lg:grid-cols-4"
          }`}
        >
          {tiers.map((tier, i) => (
            <div
              key={i}
              className={`relative flex flex-col rounded-2xl border p-6 lg:p-8 transition-shadow duration-300 ${
                tier.popular
                  ? "border-[var(--color-accent)] shadow-lg scale-[1.02]"
                  : "border-[var(--color-border,#e5e5e5)] hover:shadow-md"
              }`}
            >
              {/* Popular badge */}
              {tier.popular && (
                <div className="absolute -top-3 left-1/2 -translate-x-1/2 bg-[var(--color-accent)] text-white text-xs font-bold px-4 py-1 rounded-full">
                  {popularLabel}
                </div>
              )}

              {/* Tier name */}
              <h3 className="text-xl font-bold text-[var(--color-text,#1a1a1a)] mb-2">
                {tier.name}
              </h3>

              {/* Price */}
              <div className="mb-4">
                <span className="text-4xl font-bold text-[var(--color-text,#1a1a1a)]">
                  {tier.price}
                </span>
                {tier.priceSubtext && (
                  <span className="text-[var(--color-text-muted,#666)] ml-1 text-sm">
                    {tier.priceSubtext}
                  </span>
                )}
              </div>

              {/* Description */}
              {tier.description && (
                <p className="text-sm text-[var(--color-text-muted,#666)] mb-6">
                  {tier.description}
                </p>
              )}

              {/* Features */}
              <ul className="space-y-3 mb-8 flex-1">
                {tier.features.map((feature, fi) => {
                  const text = typeof feature === "string" ? feature : feature.text;
                  const included = typeof feature === "string" ? true : feature.included !== false;

                  return (
                    <li key={fi} className="flex items-start gap-2 text-sm">
                      <svg
                        className={`w-5 h-5 flex-shrink-0 mt-0.5 ${
                          included
                            ? "text-[var(--color-accent)]"
                            : "text-[var(--color-text-muted,#ccc)]"
                        }`}
                        fill="none"
                        stroke="currentColor"
                        viewBox="0 0 24 24"
                      >
                        {included ? (
                          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M5 13l4 4L19 7" />
                        ) : (
                          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M6 18L18 6M6 6l12 12" />
                        )}
                      </svg>
                      <span className={included ? "text-[var(--color-text-muted,#666)]" : "text-[var(--color-text-muted,#ccc)] line-through"}>
                        {text}
                      </span>
                    </li>
                  );
                })}
              </ul>

              {/* CTA */}
              <Link
                href={tier.cta.href}
                className={`block text-center w-full py-3 rounded-lg font-semibold transition-all duration-200 ${
                  tier.popular
                    ? "bg-[var(--color-accent)] text-white hover:shadow-lg"
                    : "border-2 border-[var(--color-border,#e5e5e5)] text-[var(--color-text,#1a1a1a)] hover:border-[var(--color-accent)] hover:text-[var(--color-accent)]"
                }`}
              >
                {tier.cta.label}
              </Link>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}

export default PricingSection;

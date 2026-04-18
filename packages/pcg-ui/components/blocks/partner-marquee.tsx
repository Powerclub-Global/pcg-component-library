export interface PartnerLogo {
  name: string;
  src: string;
  href?: string;
}

export interface PartnerMarqueeProps {
  logos: PartnerLogo[];
  heading?: string;
  speed?: "slow" | "normal" | "fast";
  direction?: "left" | "right";
  pauseOnHover?: boolean;
  logoHeight?: number;
  className?: string;
}

const speedMap = {
  slow: "60s",
  normal: "40s",
  fast: "20s",
};

export function PartnerMarquee({
  logos,
  heading,
  speed = "normal",
  direction = "left",
  pauseOnHover = true,
  logoHeight = 48,
  className = "",
}: PartnerMarqueeProps) {
  if (!logos || logos.length === 0) return null;

  const animationDirection = direction === "right" ? "reverse" : "normal";
  const duration = speedMap[speed];

  // We render 4 copies for seamless infinite scroll
  const renderSet = (key: string) => (
    <div
      key={key}
      className="flex shrink-0"
      style={{
        animation: `pcg-marquee-scroll ${duration} linear infinite`,
        animationDirection,
      }}
    >
      {logos.map((logo, i) => {
        const img = (
          <img
            src={logo.src}
            alt={logo.name}
            style={{ height: logoHeight }}
            className="object-contain opacity-70 hover:opacity-100 transition-opacity duration-300"
            loading="lazy"
          />
        );

        return (
          <div key={`${key}-${i}`} className="flex-shrink-0 mx-8 sm:mx-12 flex items-center">
            {logo.href ? (
              <a href={logo.href} target="_blank" rel="noopener noreferrer" aria-label={logo.name}>
                {img}
              </a>
            ) : (
              img
            )}
          </div>
        );
      })}
    </div>
  );

  return (
    <section className={`py-12 lg:py-16 ${className}`}>
      {heading && (
        <div className="text-center mb-8">
          <h3 className="text-sm font-semibold uppercase tracking-widest text-[var(--color-text-muted,#666)]">
            {heading}
          </h3>
        </div>
      )}

      <div
        className={`overflow-hidden ${pauseOnHover ? "[&:hover_div]:![animation-play-state:paused]" : ""}`}
      >
        <div className="flex">
          {renderSet("a")}
          {renderSet("b")}
          {renderSet("c")}
          {renderSet("d")}
        </div>
      </div>

      {/* Inline keyframes */}
      <style>{`
        @keyframes pcg-marquee-scroll {
          from { transform: translateX(0); }
          to { transform: translateX(-100%); }
        }
      `}</style>
    </section>
  );
}

export default PartnerMarquee;

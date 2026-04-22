export interface PartnerLogo {
  name: string;
  src?: string;
  href?: string;
}

export interface PartnerMarqueeProps {
  logos?: PartnerLogo[];
  texts?: string[];
  heading?: string;
  speed?: "slow" | "normal" | "fast";
  direction?: "left" | "right";
  pauseOnHover?: boolean;
  logoHeight?: number;
  className?: string;
}

const speedMap = { slow: "60s", normal: "40s", fast: "20s" };

export function PartnerMarquee({
  logos,
  texts,
  heading,
  speed = "normal",
  direction = "left",
  pauseOnHover = true,
  logoHeight = 48,
  className = "",
}: PartnerMarqueeProps) {
  const hasLogos = logos && logos.length > 0;
  const hasTexts = texts && texts.length > 0;
  if (!hasLogos && !hasTexts) return null;

  const animationDirection = direction === "right" ? "reverse" : "normal";
  const duration = speedMap[speed];

  const renderSet = (key: string) => (
    <div
      key={key}
      className="flex shrink-0"
      style={{
        animation: `pcg-marquee-scroll ${duration} linear infinite`,
        animationDirection,
      }}
    >
      {hasLogos
        ? logos!.map((logo, i) => {
            const img = logo.src ? (
              <img
                src={logo.src}
                alt={logo.name}
                style={{ height: logoHeight }}
                className="object-contain opacity-40 transition-opacity hover:opacity-80"
                loading="lazy"
              />
            ) : (
              <span
                className="font-semibold uppercase tracking-widest"
                style={{
                  fontSize: `${Math.max(logoHeight * 0.6, 24)}px`,
                  color: "rgba(255,255,255,0.4)",
                }}
              >
                {logo.name}
              </span>
            );
            return (
              <div key={`${key}-${i}`} className="mx-8 flex shrink-0 items-center">
                {logo.href ? (
                  <a href={logo.href} target="_blank" rel="noopener noreferrer" aria-label={logo.name}>
                    {img}
                  </a>
                ) : (
                  img
                )}
              </div>
            );
          })
        : texts!.map((text, i) => (
            <span
              key={`${key}-${i}`}
              className="px-4 text-2xl font-semibold uppercase tracking-widest sm:text-3xl md:text-4xl"
              style={{ color: "rgba(255,255,255,0.4)" }}
            >
              {text}
            </span>
          ))}
    </div>
  );

  return (
    <section
      className={`overflow-hidden py-5 ${className}`}
      style={{
        backgroundColor: "#141414",
        borderTop: "1px solid rgba(255,255,255,0.1)",
        borderBottom: "1px solid rgba(255,255,255,0.1)",
      }}
    >
      {heading && (
        <div className="mb-4 text-center">
          <h3
            className="text-[10px] font-semibold uppercase tracking-widest"
            style={{ color: "rgba(255,255,255,0.4)" }}
          >
            {heading}
          </h3>
        </div>
      )}

      <div
        className={`flex whitespace-nowrap ${
          pauseOnHover ? "[&:hover_div]:![animation-play-state:paused]" : ""
        }`}
      >
        {renderSet("a")}
        {renderSet("b")}
      </div>

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

import Link from "next/link";

export interface HeroCTA {
  label: string;
  href: string;
  variant?: "primary" | "secondary" | "outline";
}

export interface HeroSectionProps {
  eyebrow?: string;
  headline: string;
  subheadline?: string;
  ctas?: HeroCTA[];
  background?: "solid" | "image" | "video";
  backgroundImage?: string;
  backgroundVideo?: string;
  backgroundOverlay?: boolean;
  textAlign?: "left" | "center";
  minHeight?: "sm" | "md" | "lg" | "full";
  showScrollIndicator?: boolean;
  children?: React.ReactNode;
  className?: string;
}

const minHeightMap = {
  sm: "py-16 lg:py-24",
  md: "py-24 lg:py-32",
  lg: "py-32 lg:py-48",
  full: "min-h-screen flex items-center",
};

export function HeroSection({
  eyebrow,
  headline,
  subheadline,
  ctas = [],
  background = "solid",
  backgroundImage,
  backgroundVideo,
  backgroundOverlay = true,
  textAlign = "center",
  minHeight = "full",
  showScrollIndicator = true,
  children,
  className = "",
}: HeroSectionProps) {
  const alignClass =
    textAlign === "center" ? "text-center items-center" : "text-left items-start";

  return (
    <section
      className={`relative overflow-hidden ${minHeightMap[minHeight]} ${className}`}
      style={{ backgroundColor: "#0d0d0d", color: "rgba(255,255,255,0.88)" }}
    >
      {background === "image" && backgroundImage && (
        <div
          className="absolute inset-0 bg-cover bg-center"
          style={{ backgroundImage: `url(${backgroundImage})` }}
          aria-hidden="true"
        />
      )}

      {background === "video" && backgroundVideo && (
        <video
          className="absolute inset-0 h-full w-full object-cover"
          src={backgroundVideo}
          autoPlay
          muted
          loop
          playsInline
          aria-hidden="true"
        />
      )}

      {backgroundOverlay && background !== "solid" && (
        <div
          className="absolute inset-0"
          style={{
            background:
              "linear-gradient(to bottom, rgba(13,13,13,0.7), rgba(13,13,13,0.5), #0d0d0d)",
          }}
        />
      )}

      <div className="relative z-10 mx-auto w-full max-w-5xl px-6">
        <div className={`flex flex-col ${alignClass}`}>
          {eyebrow && (
            <span
              className="mb-6 inline-block text-xs font-semibold uppercase tracking-widest"
              style={{ color: "#ffffff" }}
            >
              {eyebrow}
            </span>
          )}

          <h1
            className="mb-6 font-semibold uppercase text-white"
            style={{
              fontSize: "clamp(3rem, 9vw, 7rem)",
              lineHeight: 0.95,
              letterSpacing: "0.02em",
            }}
          >
            {headline}
          </h1>

          {subheadline && (
            <p
              className="mb-10 max-w-2xl text-lg sm:text-xl md:text-2xl tracking-wide"
              style={{ color: "rgba(255,255,255,0.6)" }}
            >
              {subheadline}
            </p>
          )}

          {ctas.length > 0 && (
            <div
              className={`flex flex-col sm:flex-row gap-4 ${
                textAlign === "center" ? "justify-center" : ""
              }`}
            >
              {ctas.map((cta, i) => {
                const base =
                  "inline-block rounded-sm px-8 py-4 text-lg font-semibold uppercase tracking-wider transition-all";
                const primary = {
                  backgroundColor: "#ffffff",
                  color: "#000000",
                };
                const outline = {
                  border: "1px solid rgba(255,255,255,0.3)",
                  color: "#ffffff",
                  backgroundColor: "transparent",
                };
                const secondary = {
                  backgroundColor: "rgba(255,255,255,0.06)",
                  border: "1px solid rgba(255,255,255,0.1)",
                  color: "#ffffff",
                  backdropFilter: "blur(20px)",
                };
                const style =
                  cta.variant === "outline"
                    ? outline
                    : cta.variant === "secondary"
                    ? secondary
                    : primary;
                return (
                  <Link
                    key={i}
                    href={cta.href}
                    className={`${base} hover:brightness-110`}
                    style={style}
                  >
                    {cta.label}
                  </Link>
                );
              })}
            </div>
          )}

          {children && <div className="mt-10 w-full">{children}</div>}
        </div>
      </div>

      {showScrollIndicator && (
        <div className="absolute bottom-8 left-1/2 z-10 -translate-x-1/2">
          <svg
            className="h-8 w-8 animate-bounce"
            style={{ color: "rgba(255,255,255,0.4)" }}
            fill="none"
            stroke="currentColor"
            strokeWidth={2}
            viewBox="0 0 24 24"
            aria-hidden="true"
          >
            <path strokeLinecap="round" strokeLinejoin="round" d="M19 9l-7 7-7-7" />
          </svg>
        </div>
      )}
    </section>
  );
}

export default HeroSection;

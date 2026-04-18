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
  background?: "gradient" | "image" | "video" | "solid";
  backgroundImage?: string;
  backgroundVideo?: string;
  backgroundOverlay?: boolean;
  textAlign?: "left" | "center";
  minHeight?: "sm" | "md" | "lg" | "full";
  showScrollIndicator?: boolean;
  animate?: boolean;
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
  background = "gradient",
  backgroundImage,
  backgroundVideo,
  backgroundOverlay = true,
  textAlign = "left",
  minHeight = "md",
  showScrollIndicator = false,
  children,
  className = "",
}: HeroSectionProps) {
  const alignClass = textAlign === "center" ? "text-center items-center" : "text-left items-start";

  return (
    <section
      className={`relative overflow-hidden text-white ${minHeightMap[minHeight]} ${className}`}
      style={
        background === "solid"
          ? { backgroundColor: "var(--color-primary, #1a1a2e)" }
          : undefined
      }
    >
      {/* Background Layer */}
      {background === "gradient" && (
        <div className="absolute inset-0 bg-gradient-to-br from-[var(--color-primary,#1a1a2e)] to-[var(--color-primary-dark,#0d0d1a)]" />
      )}

      {background === "image" && backgroundImage && (
        <div
          className="absolute inset-0 bg-cover bg-center"
          style={{ backgroundImage: `url(${backgroundImage})` }}
        />
      )}

      {background === "video" && backgroundVideo && (
        <video
          className="absolute inset-0 w-full h-full object-cover"
          src={backgroundVideo}
          autoPlay
          muted
          loop
          playsInline
        />
      )}

      {/* Overlay */}
      {backgroundOverlay && background !== "solid" && (
        <div className="absolute inset-0 bg-black/40" />
      )}

      {/* Content */}
      <div className="relative z-10 mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
        <div className={`flex flex-col max-w-3xl ${alignClass} ${textAlign === "center" ? "mx-auto" : ""}`}>
          {eyebrow && (
            <span className="inline-block text-sm font-semibold uppercase tracking-widest text-[var(--color-accent)] mb-4">
              {eyebrow}
            </span>
          )}

          <h1 className="text-4xl sm:text-5xl lg:text-6xl font-bold leading-tight mb-6">
            {headline}
          </h1>

          {subheadline && (
            <p className="text-lg sm:text-xl text-white/90 mb-8 leading-relaxed max-w-2xl">
              {subheadline}
            </p>
          )}

          {ctas.length > 0 && (
            <div className="flex flex-wrap gap-4">
              {ctas.map((cta, i) => (
                <Link
                  key={i}
                  href={cta.href}
                  className={
                    cta.variant === "outline"
                      ? "border-2 border-white text-white hover:bg-white hover:text-[var(--color-primary,#1a1a2e)] px-6 py-3 rounded-lg font-semibold transition-all duration-200"
                      : cta.variant === "secondary"
                        ? "bg-white/10 backdrop-blur-sm text-white hover:bg-white/20 px-6 py-3 rounded-lg font-semibold transition-all duration-200"
                        : "bg-[var(--color-accent)] hover:bg-[var(--color-accent-hover,var(--color-accent))] text-white px-6 py-3 rounded-lg font-semibold transition-all duration-200 hover:shadow-lg"
                  }
                >
                  {cta.label}
                </Link>
              ))}
            </div>
          )}

          {children && <div className="mt-8">{children}</div>}
        </div>
      </div>

      {/* Scroll Indicator */}
      {showScrollIndicator && (
        <div className="absolute bottom-8 left-1/2 -translate-x-1/2 z-10">
          <div className="w-6 h-10 border-2 border-white/50 rounded-full flex justify-center pt-2">
            <div className="w-1 h-3 bg-white/70 rounded-full animate-bounce" />
          </div>
        </div>
      )}
    </section>
  );
}

export default HeroSection;

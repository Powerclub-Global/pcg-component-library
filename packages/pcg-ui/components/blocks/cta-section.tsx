import Link from "next/link";

export interface CTAButton {
  label: string;
  href: string;
  variant?: "primary" | "secondary" | "outline";
}

export interface CTASectionProps {
  heading: string;
  description?: string;
  buttons: CTAButton[];
  variant?: "primary" | "accent" | "dark" | "light";
  textAlign?: "left" | "center";
  className?: string;
}

const variantStyles: Record<NonNullable<CTASectionProps["variant"]>, { section: string; text: string }> = {
  primary: {
    section: "bg-gradient-to-r from-[var(--color-primary,#1a1a2e)] to-[var(--color-primary-dark,#0d0d1a)]",
    text: "text-white",
  },
  accent: {
    section: "bg-gradient-to-r from-[var(--color-accent,#6366f1)] to-[var(--color-primary,#1a1a2e)]",
    text: "text-white",
  },
  dark: {
    section: "bg-[var(--color-surface-dark,#0a0a0a)]",
    text: "text-white",
  },
  light: {
    section: "bg-[var(--color-surface,#f9f9f9)]",
    text: "text-[var(--color-text,#1a1a1a)]",
  },
};

function buttonClass(variant: CTAButton["variant"], sectionVariant: CTASectionProps["variant"]) {
  const isLightSection = sectionVariant === "light";

  if (variant === "outline") {
    return isLightSection
      ? "border-2 border-[var(--color-primary)] text-[var(--color-primary)] hover:bg-[var(--color-primary)] hover:text-white px-6 py-3 rounded-lg font-semibold transition-all duration-200"
      : "border-2 border-white text-white hover:bg-white hover:text-[var(--color-primary,#1a1a2e)] px-6 py-3 rounded-lg font-semibold transition-all duration-200";
  }

  if (variant === "secondary") {
    return isLightSection
      ? "bg-[var(--color-surface-dark,#1a1a2e)]/10 text-[var(--color-text)] hover:bg-[var(--color-surface-dark,#1a1a2e)]/20 px-6 py-3 rounded-lg font-semibold transition-all duration-200"
      : "bg-white/10 backdrop-blur-sm text-white hover:bg-white/20 px-6 py-3 rounded-lg font-semibold transition-all duration-200";
  }

  // primary
  return isLightSection
    ? "bg-[var(--color-accent)] hover:bg-[var(--color-accent-hover,var(--color-accent))] text-white px-6 py-3 rounded-lg font-semibold transition-all duration-200 hover:shadow-lg"
    : "bg-white text-[var(--color-primary,#1a1a2e)] hover:bg-white/90 px-6 py-3 rounded-lg font-semibold transition-all duration-200 hover:shadow-lg";
}

export function CTASection({
  heading,
  description,
  buttons,
  variant = "primary",
  textAlign = "center",
  className = "",
}: CTASectionProps) {
  const styles = variantStyles[variant];
  const alignClass = textAlign === "center" ? "text-center" : "text-left";

  return (
    <section className={`py-16 lg:py-24 ${styles.section} ${styles.text} ${className}`}>
      <div className={`mx-auto max-w-7xl px-4 sm:px-6 lg:px-8 ${alignClass}`}>
        <h2 className="text-3xl sm:text-4xl lg:text-5xl font-bold mb-4">
          {heading}
        </h2>
        {description && (
          <p className={`text-lg opacity-90 max-w-2xl mb-8 ${textAlign === "center" ? "mx-auto" : ""}`}>
            {description}
          </p>
        )}
        <div className={`flex flex-wrap gap-4 ${textAlign === "center" ? "justify-center" : ""}`}>
          {buttons.map((btn, i) => (
            <Link
              key={i}
              href={btn.href}
              className={buttonClass(btn.variant, variant)}
            >
              {btn.label}
            </Link>
          ))}
        </div>
      </div>
    </section>
  );
}

export default CTASection;

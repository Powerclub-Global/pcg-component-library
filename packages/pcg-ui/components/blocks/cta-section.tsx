import Link from "next/link";

export interface CTAButton {
  label: string;
  href: string;
  variant?: "primary" | "outline";
}

export interface CTASectionProps {
  heading: string;
  highlight?: string;
  description?: string;
  buttons: CTAButton[];
  phone?: string;
  textAlign?: "left" | "center";
  className?: string;
}

export function CTASection({
  heading,
  highlight,
  description,
  buttons,
  phone,
  textAlign = "center",
  className = "",
}: CTASectionProps) {
  const alignClass = textAlign === "center" ? "text-center" : "text-left";

  return (
    <section
      className={`relative overflow-hidden px-6 py-24 md:py-32 ${className}`}
      style={{ backgroundColor: "#0d0d0d", color: "rgba(255,255,255,0.88)" }}
    >
      <div
        className="absolute inset-0"
        style={{
          background:
            "linear-gradient(135deg, rgba(255,255,255,0.1), #0d0d0d 40%, #0d0d0d)",
        }}
        aria-hidden="true"
      />

      <div className={`relative z-10 mx-auto max-w-4xl ${alignClass}`}>
        <h2
          className="mb-6 font-semibold uppercase text-white"
          style={{
            fontSize: "clamp(2.5rem, 6vw, 5rem)",
            lineHeight: 0.95,
            letterSpacing: "0.02em",
          }}
        >
          {heading}
          {highlight && (
            <>
              {" "}
              <span style={{ color: "#ffffff" }}>{highlight}</span>
            </>
          )}
        </h2>

        {description && (
          <p
            className={`mb-10 max-w-2xl text-lg md:text-xl ${
              textAlign === "center" ? "mx-auto" : ""
            }`}
            style={{ color: "rgba(255,255,255,0.6)" }}
          >
            {description}
          </p>
        )}

        <div
          className={`mb-8 flex flex-col gap-4 sm:flex-row ${
            textAlign === "center" ? "justify-center" : ""
          }`}
        >
          {buttons.map((btn, i) => {
            const style =
              btn.variant === "outline"
                ? {
                    border: "1px solid rgba(255,255,255,0.3)",
                    color: "#ffffff",
                    backgroundColor: "transparent",
                  }
                : { backgroundColor: "#ffffff", color: "#000000" };
            return (
              <Link
                key={i}
                href={btn.href}
                className="inline-block rounded-sm px-8 py-4 text-lg font-semibold uppercase tracking-wider transition-all hover:brightness-110"
                style={style}
              >
                {btn.label}
              </Link>
            );
          })}
        </div>

        {phone && (
          <a
            href={`tel:${phone.replace(/\D/g, "")}`}
            className="text-lg tracking-wide transition-colors hover:text-[#ffffff]"
            style={{ color: "rgba(255,255,255,0.6)" }}
          >
            {phone}
          </a>
        )}
      </div>
    </section>
  );
}

export default CTASection;

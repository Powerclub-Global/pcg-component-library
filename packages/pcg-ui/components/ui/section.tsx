import { cn } from "../../lib/cn";

export interface SectionProps {
  id?: string;
  title?: string;
  highlight?: string;
  subtitle?: string;
  center?: boolean;
  className?: string;
  children: React.ReactNode;
}

export function Section({
  id,
  title,
  highlight,
  subtitle,
  center = false,
  className,
  children,
}: SectionProps) {
  return (
    <section
      id={id}
      className={cn("px-6 py-20 md:py-28", className)}
      style={{ backgroundColor: "#0d0d0d", color: "rgba(255,255,255,0.88)" }}
    >
      <div className={cn("mx-auto max-w-6xl", center && "text-center")}>
        {(title || subtitle) && (
          <div className="mb-12 md:mb-16">
            {title && (
              <h2
                className="mb-4 font-semibold uppercase tracking-wide text-white"
                style={{ fontSize: "clamp(2.5rem, 5vw, 4rem)", lineHeight: 0.95 }}
              >
                {title}
                {highlight && (
                  <>
                    {" "}
                    <span style={{ color: "#ffffff" }}>{highlight}</span>
                  </>
                )}
              </h2>
            )}
            {subtitle && (
              <p
                className={cn(
                  "max-w-2xl text-lg leading-relaxed",
                  center && "mx-auto"
                )}
                style={{ color: "rgba(255,255,255,0.6)" }}
              >
                {subtitle}
              </p>
            )}
          </div>
        )}
        <div>{children}</div>
      </div>
    </section>
  );
}

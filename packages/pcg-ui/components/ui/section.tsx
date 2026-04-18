import { cn } from "../../lib/cn";

export interface SectionProps {
  id?: string;
  title?: string;
  subtitle?: string;
  center?: boolean;
  className?: string;
  children: React.ReactNode;
}

export function Section({
  id,
  title,
  subtitle,
  center = false,
  className,
  children,
}: SectionProps) {
  return (
    <section id={id} className={cn("py-16 md:py-24", className)}>
      <div
        className={cn(
          "mx-auto max-w-6xl px-6 md:px-8 space-y-6",
          center && "text-center"
        )}
      >
        {title && (
          <h2 className="text-3xl md:text-4xl font-bold text-[var(--color-foreground)]">
            {title}
          </h2>
        )}
        {subtitle && (
          <p className="mx-auto max-w-3xl text-[var(--color-muted-foreground)]">
            {subtitle}
          </p>
        )}
        <div>{children}</div>
      </div>
    </section>
  );
}

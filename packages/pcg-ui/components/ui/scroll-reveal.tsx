"use client";

import { useEffect, useRef, type ReactNode } from "react";
import { cn } from "../../lib/cn";

export interface ScrollRevealProps {
  children: ReactNode;
  className?: string;
  /** Delay in ms before the reveal animation triggers */
  delay?: number;
  /** IntersectionObserver threshold (0-1) */
  threshold?: number;
  /** Whether to only animate once or every time element enters viewport */
  once?: boolean;
}

export function ScrollReveal({
  children,
  className,
  delay = 0,
  threshold = 0.15,
  once = true,
}: ScrollRevealProps) {
  const ref = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const el = ref.current;
    if (!el) return;

    const observer = new IntersectionObserver(
      ([entry]) => {
        if (entry.isIntersecting) {
          const timer = setTimeout(() => el.classList.add("visible"), delay);
          if (once) observer.unobserve(el);
          return () => clearTimeout(timer);
        } else if (!once) {
          el.classList.remove("visible");
        }
      },
      { threshold }
    );

    observer.observe(el);
    return () => observer.disconnect();
  }, [delay, threshold, once]);

  return (
    <div
      ref={ref}
      className={cn(
        "opacity-0 translate-y-6 transition-all duration-700 ease-out [&.visible]:opacity-100 [&.visible]:translate-y-0",
        className
      )}
    >
      {children}
    </div>
  );
}

"use client";

import { useEffect, useRef, useState } from "react";

export interface StatItem {
  value: number;
  suffix?: string;
  prefix?: string;
  label: string;
}

export interface StatsSectionProps {
  heading?: string;
  description?: string;
  stats: StatItem[];
  layout?: "row" | "grid";
  columns?: 2 | 3 | 4;
  animate?: boolean;
  animationDuration?: number;
  variant?: "default" | "card" | "dark";
  className?: string;
}

function useCountUp(target: number, duration: number, shouldAnimate: boolean) {
  const [count, setCount] = useState(0);

  useEffect(() => {
    if (!shouldAnimate) {
      setCount(target);
      return;
    }

    let startTime: number;
    let frameId: number;

    function tick(timestamp: number) {
      if (!startTime) startTime = timestamp;
      const progress = Math.min((timestamp - startTime) / duration, 1);
      // Ease-out quad
      const eased = 1 - (1 - progress) * (1 - progress);
      setCount(Math.floor(eased * target));

      if (progress < 1) {
        frameId = requestAnimationFrame(tick);
      }
    }

    frameId = requestAnimationFrame(tick);
    return () => cancelAnimationFrame(frameId);
  }, [target, duration, shouldAnimate]);

  return count;
}

function AnimatedStat({
  stat,
  animate,
  duration,
  isVisible,
}: {
  stat: StatItem;
  animate: boolean;
  duration: number;
  isVisible: boolean;
}) {
  const count = useCountUp(stat.value, duration, animate && isVisible);

  return (
    <div className="text-center">
      <div className="text-3xl sm:text-4xl lg:text-5xl font-bold text-[var(--color-accent)] mb-2">
        {stat.prefix}
        {animate ? count : stat.value}
        {stat.suffix}
      </div>
      <div className="text-sm sm:text-base text-[var(--color-text-muted,#666)]">
        {stat.label}
      </div>
    </div>
  );
}

export function StatsSection({
  heading,
  description,
  stats,
  layout = "row",
  columns = 4,
  animate = true,
  animationDuration = 2000,
  variant = "default",
  className = "",
}: StatsSectionProps) {
  const ref = useRef<HTMLDivElement>(null);
  const [isVisible, setIsVisible] = useState(false);

  useEffect(() => {
    if (!animate || !ref.current) {
      setIsVisible(true);
      return;
    }

    const observer = new IntersectionObserver(
      ([entry]) => {
        if (entry.isIntersecting) {
          setIsVisible(true);
          observer.disconnect();
        }
      },
      { threshold: 0.2 }
    );

    observer.observe(ref.current);
    return () => observer.disconnect();
  }, [animate]);

  const bgClass =
    variant === "dark"
      ? "bg-[var(--color-surface-dark,#1a1a2e)] text-white"
      : variant === "card"
        ? "bg-[var(--color-surface,#f9f9f9)]"
        : "";

  const gridClass =
    layout === "row"
      ? `flex flex-wrap justify-center gap-8 lg:gap-16`
      : `grid gap-8 ${
          columns === 2
            ? "md:grid-cols-2"
            : columns === 3
              ? "md:grid-cols-3"
              : "md:grid-cols-2 lg:grid-cols-4"
        }`;

  return (
    <section ref={ref} className={`py-16 lg:py-24 ${bgClass} ${className}`}>
      <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
        {(heading || description) && (
          <div className="text-center mb-12">
            {heading && (
              <h2 className="text-3xl sm:text-4xl font-bold mb-4">
                {heading}
              </h2>
            )}
            {description && (
              <p className="text-lg opacity-80 max-w-2xl mx-auto">
                {description}
              </p>
            )}
          </div>
        )}

        <div className={gridClass}>
          {stats.map((stat, i) => (
            <AnimatedStat
              key={i}
              stat={stat}
              animate={animate}
              duration={animationDuration}
              isVisible={isVisible}
            />
          ))}
        </div>
      </div>
    </section>
  );
}

export default StatsSection;

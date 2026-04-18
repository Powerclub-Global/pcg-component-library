"use client";

import { useState, useEffect, useCallback } from "react";

export interface ScrollPosition {
  y: number;
  isScrolled: boolean;
  direction: "up" | "down" | null;
}

export interface UseScrollPositionOptions {
  threshold?: number;
}

export function useScrollPosition(options: UseScrollPositionOptions = {}): ScrollPosition {
  const { threshold = 20 } = options;

  const [position, setPosition] = useState<ScrollPosition>({
    y: 0,
    isScrolled: false,
    direction: null,
  });

  const handleScroll = useCallback(() => {
    setPosition((prev) => {
      const y = window.scrollY;
      const direction = y > prev.y ? "down" : y < prev.y ? "up" : prev.direction;
      return {
        y,
        isScrolled: y > threshold,
        direction,
      };
    });
  }, [threshold]);

  useEffect(() => {
    window.addEventListener("scroll", handleScroll, { passive: true });
    // Set initial position
    handleScroll();
    return () => window.removeEventListener("scroll", handleScroll);
  }, [handleScroll]);

  return position;
}

export default useScrollPosition;

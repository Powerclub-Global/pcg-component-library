"use client";

import { useEffect, useState } from "react";
import { cn } from "../../lib/cn";
import { ImageWithFallback } from "./image-with-fallback";

export interface RotatorImage {
  src: string;
  alt?: string;
}

export interface ImageRotatorProps {
  /** Array of images to rotate through */
  images: RotatorImage[];
  /** Interval between transitions in milliseconds */
  intervalMs?: number;
  /** Fallback image URL if an image fails to load */
  fallbackSrc?: string;
  className?: string;
}

export function ImageRotator({
  images,
  intervalMs = 5000,
  fallbackSrc,
  className,
}: ImageRotatorProps) {
  const [index, setIndex] = useState(0);

  useEffect(() => {
    if (images.length <= 1) return;

    const timer = setInterval(() => {
      setIndex((prev) => (prev + 1) % images.length);
    }, intervalMs);

    return () => clearInterval(timer);
  }, [images.length, intervalMs]);

  useEffect(() => {
    setIndex(0);
  }, [images]);

  if (!images.length) return null;

  return (
    <div className={cn("relative overflow-hidden", className)}>
      {images.map((image, idx) => (
        <ImageWithFallback
          key={image.src ?? idx}
          src={image.src}
          alt={image.alt ?? ""}
          fallbackSrc={fallbackSrc}
          className={cn(
            "absolute inset-0 h-full w-full object-cover transition-opacity duration-700 ease-in-out",
            idx === index ? "opacity-100" : "opacity-0"
          )}
        />
      ))}
    </div>
  );
}

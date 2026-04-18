"use client";

import { useState } from "react";
import { cn } from "../../lib/cn";

export interface ImageWithFallbackProps
  extends React.ImgHTMLAttributes<HTMLImageElement> {
  /** Fallback image URL when src fails to load */
  fallbackSrc?: string;
}

export function ImageWithFallback({
  fallbackSrc = "",
  src,
  alt = "",
  className,
  ...rest
}: ImageWithFallbackProps) {
  const initialSrc = typeof src === "string" && src.length > 0 ? src : fallbackSrc;
  const [currentSrc, setCurrentSrc] = useState(initialSrc);
  const [hasError, setHasError] = useState(false);

  return (
    <img
      {...rest}
      src={currentSrc}
      alt={alt}
      className={cn(className)}
      onError={() => {
        if (fallbackSrc && currentSrc !== fallbackSrc && !hasError) {
          setCurrentSrc(fallbackSrc);
          setHasError(true);
        }
      }}
    />
  );
}

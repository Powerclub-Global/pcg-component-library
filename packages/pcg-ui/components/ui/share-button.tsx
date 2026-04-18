"use client";

import { useState } from "react";
import { cn } from "../../lib/cn";

export interface ShareButtonProps {
  /** Title for the native share dialog */
  title?: string;
  /** Description text for the native share dialog */
  description?: string;
  /** URL to share — defaults to current page */
  url?: string;
  /** Optional custom icon element */
  icon?: React.ReactNode;
  className?: string;
  children?: React.ReactNode;
}

export function ShareButton({
  title = "",
  description = "",
  url,
  icon,
  className,
  children,
}: ShareButtonProps) {
  const [copied, setCopied] = useState(false);

  const handleShare = async () => {
    const shareUrl = url ?? (typeof window !== "undefined" ? window.location.href : "");

    try {
      if (typeof navigator !== "undefined" && navigator.share) {
        await navigator.share({
          title,
          text: description,
          url: shareUrl,
        });
      } else {
        await navigator.clipboard.writeText(shareUrl);
        setCopied(true);
        setTimeout(() => setCopied(false), 2000);
      }
    } catch (error) {
      // User cancelled share or clipboard failed — silent
    }
  };

  return (
    <button
      className={cn(
        "inline-flex items-center gap-2 rounded-lg border border-[var(--color-accent)]/30 px-3 py-2 text-sm text-[var(--color-accent)] hover:bg-[var(--color-accent)]/10 transition-colors duration-200",
        className
      )}
      onClick={handleShare}
      type="button"
    >
      {icon}
      {children ?? (copied ? "Copied!" : "Share")}
    </button>
  );
}

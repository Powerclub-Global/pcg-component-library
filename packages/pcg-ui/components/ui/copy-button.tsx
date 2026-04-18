"use client";

import { useState, useCallback } from "react";
import { cn } from "../../lib/cn";

export interface CopyButtonProps {
  /** The text to copy to clipboard */
  text: string;
  /** Label shown on the button */
  label?: string;
  /** Label shown after a successful copy */
  copiedLabel?: string;
  /** Duration in ms to show the copied state */
  copiedDuration?: number;
  /** Optional custom icon element */
  icon?: React.ReactNode;
  className?: string;
}

export function CopyButton({
  text,
  label = "Copy",
  copiedLabel = "Copied!",
  copiedDuration = 2000,
  icon,
  className,
}: CopyButtonProps) {
  const [copied, setCopied] = useState(false);

  const handleCopy = useCallback(async () => {
    try {
      await navigator.clipboard.writeText(text);
      setCopied(true);
      setTimeout(() => setCopied(false), copiedDuration);
    } catch {
      // Clipboard API not available
    }
  }, [text, copiedDuration]);

  return (
    <button
      onClick={handleCopy}
      type="button"
      className={cn(
        "inline-flex items-center gap-2 rounded-lg border border-[var(--color-border)] bg-[var(--color-surface)] px-4 py-2 text-sm font-medium text-[var(--color-foreground)] transition-all hover:border-[var(--color-accent)]",
        copied && "border-green-500 text-green-500",
        className
      )}
    >
      {icon}
      {copied ? copiedLabel : label}
    </button>
  );
}

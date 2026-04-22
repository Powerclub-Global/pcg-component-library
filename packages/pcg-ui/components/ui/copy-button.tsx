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

function CopyIcon() {
  return (
    <svg
      className="h-4 w-4 transition-transform duration-300"
      fill="none"
      stroke="currentColor"
      viewBox="0 0 24 24"
    >
      <rect x="9" y="9" width="13" height="13" rx="2" ry="2" strokeWidth={2} />
      <path
        d="M5 15H4a2 2 0 01-2-2V4a2 2 0 012-2h9a2 2 0 012 2v1"
        strokeWidth={2}
        strokeLinecap="round"
        strokeLinejoin="round"
      />
    </svg>
  );
}

function CheckIcon() {
  return (
    <svg
      className="h-4 w-4 transition-transform duration-300"
      fill="none"
      stroke="currentColor"
      viewBox="0 0 24 24"
    >
      <path
        strokeLinecap="round"
        strokeLinejoin="round"
        strokeWidth={2}
        d="M5 13l4 4L19 7"
      />
    </svg>
  );
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
        "inline-flex items-center gap-2.5 rounded-sm px-4 py-2.5 text-sm font-medium backdrop-blur-xl transition-all",
        className
      )}
      style={
        copied
          ? {
              background: "rgba(255,255,255,0.1)",
              border: "1px solid rgba(255,255,255,0.4)",
              color: "#ffffff",
            }
          : {
              background: "rgba(255,255,255,0.06)",
              border: "1px solid rgba(255,255,255,0.1)",
              color: "#ffffff",
            }
      }
    >
      <span className="relative flex h-4 w-4 items-center justify-center overflow-hidden">
        <span
          className={cn(
            "absolute inset-0 flex items-center justify-center transition-all duration-300",
            copied
              ? "translate-y-0 opacity-100"
              : "-translate-y-4 opacity-0"
          )}
        >
          <CheckIcon />
        </span>
        <span
          className={cn(
            "absolute inset-0 flex items-center justify-center transition-all duration-300",
            copied
              ? "translate-y-4 opacity-0"
              : "translate-y-0 opacity-100"
          )}
        >
          {icon ?? <CopyIcon />}
        </span>
      </span>
      <span className="transition-colors duration-300">
        {copied ? copiedLabel : label}
      </span>
    </button>
  );
}

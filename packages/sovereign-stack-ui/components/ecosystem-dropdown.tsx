"use client";

import { useState, useEffect, useRef } from "react";
import { ECOSYSTEM_PROJECTS } from "@sovereign-stack/config";
import type { EcosystemProject } from "@sovereign-stack/config";

interface EcosystemDropdownProps {
  currentProjectId: string;
  currentProjectColor: string;
  /** Compact mode for mobile */
  compact?: boolean;
  className?: string;
}

export function EcosystemDropdown({
  currentProjectId,
  currentProjectColor,
  compact = false,
  className = "",
}: EcosystemDropdownProps) {
  const [open, setOpen] = useState(false);
  const ref = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const handleEscape = (e: KeyboardEvent) => {
      if (e.key === "Escape") setOpen(false);
    };
    if (open) document.addEventListener("keydown", handleEscape);
    return () => document.removeEventListener("keydown", handleEscape);
  }, [open]);

  const currentProject = ECOSYSTEM_PROJECTS.find((p) => p.id === currentProjectId);

  return (
    <div ref={ref} className={`relative ${className}`}>
      <button
        onClick={() => setOpen(!open)}
        className={`flex items-center gap-2 rounded-lg bg-[var(--bg-surface)] border border-[var(--border-default)] hover:border-[var(--sovereign-gold)] transition-all ${
          compact ? "px-2.5 py-2 gap-1.5" : "px-3 py-2"
        }`}
      >
        <div className="flex items-center gap-2">
          <div
            className={`rounded-full ${compact ? "w-2 h-2" : "w-2 h-2"}`}
            style={{ background: currentProjectColor }}
          />
          {!compact && (
            <span className="text-sm font-medium text-[var(--text-primary)]">
              {currentProject?.shortName ?? "SS"}
            </span>
          )}
        </div>
        <svg
          className={`text-[var(--text-muted)] transition-transform ${
            open ? "rotate-180" : ""
          } ${compact ? "w-3.5 h-3.5" : "w-4 h-4"}`}
          fill="none"
          stroke="currentColor"
          viewBox="0 0 24 24"
        >
          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M19 9l-7 7-7-7" />
        </svg>
      </button>

      {open && (
        <>
          <div className="fixed inset-0 z-40" onClick={() => setOpen(false)} />
          <div
            className={`absolute top-full left-0 mt-2 bg-[var(--bg-card)] border border-[var(--border-default)] rounded-xl shadow-xl z-50 overflow-hidden ${
              compact ? "w-72" : "w-80"
            }`}
          >
            {/* Header */}
            <div className="p-3 border-b border-[var(--border-default)]">
              <div className="flex items-center gap-2">
                <div className="w-6 h-6 rounded-md bg-gradient-to-br from-[var(--sovereign-gold)] to-[var(--sovereign-gold-dark)] flex items-center justify-center">
                  <span className="text-xs font-bold text-[var(--bg-primary)]">SS</span>
                </div>
                <span className="text-sm font-semibold text-gradient-sovereign">
                  Sovereign Stack
                </span>
              </div>
              {!compact && (
                <p className="text-xs text-[var(--text-muted)] mt-1">
                  A symbiotic ecosystem for digital sovereignty
                </p>
              )}
            </div>

            {/* Project List */}
            <div className={`p-2 ${compact ? "max-h-80 overflow-y-auto" : ""}`}>
              {ECOSYSTEM_PROJECTS.map((project) => {
                const isCurrent = project.id === currentProjectId;
                return (
                  <a
                    key={project.id}
                    href={isCurrent ? "#" : project.url}
                    target={isCurrent ? "_self" : "_blank"}
                    rel="noopener noreferrer"
                    onClick={() => setOpen(false)}
                    className={`flex items-start gap-3 rounded-lg transition-all ${
                      compact ? "p-2.5" : "p-3"
                    } ${isCurrent ? "bg-[var(--bg-surface)]" : "hover:bg-[var(--bg-surface)]"}`}
                  >
                    <div
                      className={`rounded-lg flex items-center justify-center flex-shrink-0 mt-0.5 ${
                        compact ? "w-7 h-7" : "w-8 h-8"
                      }`}
                      style={{ background: `${project.color}20` }}
                    >
                      <div
                        className={`rounded-full ${compact ? "w-2.5 h-2.5" : "w-3 h-3"}`}
                        style={{ background: project.color }}
                      />
                    </div>
                    <div className="flex-1 min-w-0">
                      <div className="flex items-center gap-2">
                        <span className="text-sm font-medium text-[var(--text-primary)]">
                          {compact ? project.shortName : project.name}
                        </span>
                        {isCurrent && (
                          <span
                            className={`px-1.5 py-0.5 rounded bg-[var(--status-success-bg)] text-[var(--status-success)] ${
                              compact ? "text-[9px]" : "text-[10px]"
                            }`}
                          >
                            Current
                          </span>
                        )}
                      </div>
                      {!compact && (
                        <p className="text-xs text-[var(--text-muted)] mt-0.5 truncate">
                          {project.description}
                        </p>
                      )}
                    </div>
                    {!isCurrent && (
                      <ExternalLinkIcon className={compact ? "w-3.5 h-3.5" : "w-4 h-4"} />
                    )}
                  </a>
                );
              })}
            </div>

            {/* Footer */}
            <div className="p-3 border-t border-[var(--border-default)] bg-[var(--bg-surface)]">
              <a
                href="https://okb-ventures.vercel.app"
                target="_blank"
                rel="noopener noreferrer"
                className="flex items-center justify-center gap-2 text-xs text-[var(--text-muted)] hover:text-[var(--sovereign-gold)] transition-colors"
              >
                <span>Backed by OKB Ventures</span>
                <ExternalLinkIcon className="w-3 h-3" />
              </a>
            </div>
          </div>
        </>
      )}
    </div>
  );
}

function ExternalLinkIcon({ className = "w-4 h-4" }: { className?: string }) {
  return (
    <svg
      className={`text-[var(--text-muted)] flex-shrink-0 mt-1 ${className}`}
      fill="none"
      stroke="currentColor"
      viewBox="0 0 24 24"
    >
      <path
        strokeLinecap="round"
        strokeLinejoin="round"
        strokeWidth={2}
        d="M10 6H6a2 2 0 00-2 2v10a2 2 0 002 2h10a2 2 0 002-2v-4M14 4h6m0 0v6m0-6L10 14"
      />
    </svg>
  );
}

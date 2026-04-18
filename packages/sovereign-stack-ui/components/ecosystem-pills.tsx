"use client";

import { ECOSYSTEM_PROJECTS } from "@sovereign-stack/config";

interface EcosystemPillsProps {
  currentProjectId: string;
  currentColorVar?: string;
  className?: string;
}

export function EcosystemPills({
  currentProjectId,
  currentColorVar = "--ss-vibeland",
  className = "",
}: EcosystemPillsProps) {
  return (
    <div className={`flex flex-wrap justify-center gap-3 ${className}`}>
      {ECOSYSTEM_PROJECTS.map((project) => {
        const isCurrent = project.id === currentProjectId;
        return (
          <a
            key={project.id}
            href={isCurrent ? "#" : project.url}
            target={isCurrent ? "_self" : "_blank"}
            rel="noopener noreferrer"
            className={`flex items-center gap-2 px-3 py-1.5 rounded-full text-xs transition-all ${
              isCurrent
                ? `bg-[var(${currentColorVar})]/10 text-[var(${currentColorVar})] border border-[var(${currentColorVar})]/30`
                : "bg-[var(--bg-surface)] text-[var(--text-muted)] border border-[var(--border-default)] hover:border-[var(--sovereign-gold)] hover:text-[var(--sovereign-gold)]"
            }`}
          >
            <span
              className="w-2 h-2 rounded-full"
              style={{ background: project.color }}
            />
            {project.name}
          </a>
        );
      })}
    </div>
  );
}

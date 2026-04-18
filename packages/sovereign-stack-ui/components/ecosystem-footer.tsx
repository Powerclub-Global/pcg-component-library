import Link from "next/link";
import { ECOSYSTEM_PROJECTS } from "@sovereign-stack/config";
import { EcosystemPills } from "./ecosystem-pills";

interface EcosystemFooterProps {
  currentProjectId: string;
  logo: React.ReactNode;
  brandName: string;
  brandSubtitle: string;
  brandDescription: string;
  statusLabel?: string;
  productLinks: Array<{ label: string; href: string }>;
  productColumnTitle?: string;
  /** CSS variable name for the project's primary color, e.g. "--pythia-primary" */
  brandColorVar?: string;
  className?: string;
}

export function EcosystemFooter({
  currentProjectId,
  logo,
  brandName,
  brandSubtitle,
  brandDescription,
  statusLabel,
  productLinks,
  productColumnTitle = "Product",
  brandColorVar = "--text-primary",
  className = "",
}: EcosystemFooterProps) {
  return (
    <footer className={`bg-[var(--dark-surface)] border-t border-[var(--dark-border)] ${className}`}>
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12">
        <div className="grid grid-cols-1 md:grid-cols-4 gap-8">
          {/* Brand Column */}
          <div className="md:col-span-1">
            <div className="flex items-center gap-3 mb-4">
              {logo}
              <div>
                <span className="text-xl font-bold text-[var(--text-primary)]">{brandName}</span>
                <span className="text-xs block text-[var(--text-muted)]">{brandSubtitle}</span>
              </div>
            </div>
            <p className="text-[var(--text-secondary)] text-sm mb-4">{brandDescription}</p>
            {statusLabel && (
              <div className="flex items-center gap-2">
                <span className="w-2 h-2 rounded-full bg-[var(--status-success)] animate-pulse" />
                <span className="text-xs text-[var(--status-success)]">{statusLabel}</span>
              </div>
            )}
          </div>

          {/* Product Links */}
          <div>
            <h3
              className="font-semibold mb-4"
              style={{ color: `var(${brandColorVar})` }}
            >
              {productColumnTitle}
            </h3>
            <ul className="space-y-2">
              {productLinks.map((link) => (
                <li key={link.href}>
                  <Link
                    href={link.href}
                    className="text-sm text-[var(--text-muted)] hover:text-[var(--text-primary)] transition-colors"
                  >
                    {link.label}
                  </Link>
                </li>
              ))}
            </ul>
          </div>

          {/* Sovereign Stack Ecosystem */}
          <div>
            <h3 className="text-[var(--sovereign-gold)] font-semibold mb-4">Sovereign Stack</h3>
            <ul className="space-y-2">
              {ECOSYSTEM_PROJECTS.map((project) => {
                const isCurrent = project.id === currentProjectId;
                return (
                  <li key={project.id}>
                    {isCurrent ? (
                      <span
                        className="text-sm flex items-center gap-2"
                        style={{ color: project.color }}
                      >
                        <span
                          className="w-1.5 h-1.5 rounded-full"
                          style={{ background: project.color }}
                        />
                        {project.name} (You are here)
                      </span>
                    ) : (
                      <a
                        href={project.url}
                        target="_blank"
                        rel="noopener noreferrer"
                        className="text-sm text-[var(--text-muted)] hover:text-[var(--sovereign-gold)] transition-colors flex items-center gap-2"
                      >
                        <span
                          className="w-1.5 h-1.5 rounded-full"
                          style={{ background: project.color }}
                        />
                        {project.name}
                      </a>
                    )}
                  </li>
                );
              })}
            </ul>
          </div>

          {/* Backed By */}
          <div>
            <h3 className="text-[var(--text-primary)] font-semibold mb-4">Backed By</h3>
            <ul className="space-y-2">
              <li>
                <a
                  href="https://powerclubglobal.com"
                  target="_blank"
                  rel="noopener noreferrer"
                  className="text-sm text-[var(--text-muted)] hover:text-[var(--text-primary)] transition-colors"
                >
                  PowerClub Global
                </a>
              </li>
              <li>
                <a
                  href="https://okb-ventures.vercel.app"
                  target="_blank"
                  rel="noopener noreferrer"
                  className="text-sm text-[var(--text-muted)] hover:text-[var(--sovereign-gold)] transition-colors"
                >
                  OKB Ventures
                </a>
              </li>
            </ul>
          </div>
        </div>

        {/* Ecosystem Pills */}
        <div className="mt-8 pt-8 border-t border-[var(--dark-border)]">
          <EcosystemPills
            currentProjectId={currentProjectId}
            currentColorVar={brandColorVar}
            className="mb-6"
          />
        </div>

        {/* Copyright */}
        <div className="pt-6 border-t border-[var(--dark-border)] flex flex-col md:flex-row justify-between items-center gap-4">
          <p className="text-[var(--text-muted)] text-sm">
            &copy; {new Date().getFullYear()} {brandName}. Part of the{" "}
            <span className="text-[var(--sovereign-gold)]">Sovereign Stack</span>.
          </p>
          <p className="text-xs text-[var(--text-muted)]">
            Backed by{" "}
            <a
              href="https://okb-ventures.vercel.app"
              target="_blank"
              rel="noopener noreferrer"
              className="text-[var(--sovereign-gold)] hover:underline"
            >
              OKB Ventures
            </a>
          </p>
        </div>
      </div>
    </footer>
  );
}

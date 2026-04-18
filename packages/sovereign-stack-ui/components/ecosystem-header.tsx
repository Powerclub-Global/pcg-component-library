"use client";

import { useState, useEffect } from "react";
import Link from "next/link";
import { EcosystemDropdown } from "./ecosystem-dropdown";
import { useScrollPosition } from "../hooks/use-scroll-position";
import { useBodyScrollLock } from "../hooks/use-body-scroll-lock";

interface EcosystemHeaderProps {
  currentProjectId: string;
  currentProjectColor: string;
  logo: React.ReactNode;
  brandName: string;
  brandSubtitle?: string;
  brandGradientClass?: string;
  navItems: Array<{ label: string; href: string }>;
  ctaLabel: string;
  ctaHref: string;
  ctaExternal?: boolean;
  /** Slot for extra elements (CartButton, price display, etc.) */
  headerExtra?: React.ReactNode;
  className?: string;
}

export function EcosystemHeader({
  currentProjectId,
  currentProjectColor,
  logo,
  brandName,
  brandGradientClass = "",
  navItems,
  ctaLabel,
  ctaHref,
  ctaExternal = false,
  headerExtra,
  className = "",
}: EcosystemHeaderProps) {
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);
  const isScrolled = useScrollPosition(20);
  useBodyScrollLock(mobileMenuOpen);

  useEffect(() => {
    const handleEscape = (e: KeyboardEvent) => {
      if (e.key === "Escape") setMobileMenuOpen(false);
    };
    document.addEventListener("keydown", handleEscape);
    return () => document.removeEventListener("keydown", handleEscape);
  }, []);

  return (
    <header
      className={`fixed top-0 left-0 right-0 z-50 ${
        isScrolled
          ? "bg-[var(--dark-bg)]/95 backdrop-blur-sm"
          : "bg-[var(--dark-bg)]/95 backdrop-blur-sm"
      } border-b border-[var(--dark-border)] ${className}`}
    >
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        {/* Desktop Layout */}
        <div className="hidden md:flex items-center justify-between h-16">
          {/* Ecosystem Dropdown + Logo */}
          <div className="flex items-center gap-4">
            <EcosystemDropdown
              currentProjectId={currentProjectId}
              currentProjectColor={currentProjectColor}
            />
            <Link href="/" className="flex items-center gap-3">
              {logo}
              <div>
                <span className={`text-lg font-bold ${brandGradientClass}`}>
                  {brandName}
                </span>
              </div>
            </Link>
          </div>

          {/* Desktop Navigation */}
          <nav className="flex items-center gap-8">
            {navItems.map((item) => (
              <Link
                key={item.href}
                href={item.href}
                className="text-[var(--text-secondary)] hover:text-[var(--text-primary)] transition-colors text-sm font-medium"
              >
                {item.label}
              </Link>
            ))}
          </nav>

          {/* CTA + Extra */}
          <div className="flex items-center gap-3">
            {headerExtra}
            {ctaExternal ? (
              <a
                href={ctaHref}
                target="_blank"
                rel="noopener noreferrer"
                className="btn-primary text-sm"
              >
                {ctaLabel}
              </a>
            ) : (
              <Link href={ctaHref} className="btn-primary text-sm">
                {ctaLabel}
              </Link>
            )}
          </div>
        </div>

        {/* Mobile Layout: SS (Left) | Logo (Center) | Menu (Right) */}
        <div className="flex md:hidden items-center justify-between h-16 relative">
          <EcosystemDropdown
            currentProjectId={currentProjectId}
            currentProjectColor={currentProjectColor}
            compact
          />

          <Link
            href="/"
            className="flex items-center gap-2 hover:opacity-90 transition-opacity absolute left-1/2 -translate-x-1/2"
          >
            {logo}
          </Link>

          <div className="flex items-center gap-2 z-10">
            {headerExtra}
            <button
              onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
              className="p-2"
              style={{ color: currentProjectColor }}
            >
              {mobileMenuOpen ? (
                <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M6 18L18 6M6 6l12 12" />
                </svg>
              ) : (
                <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M4 6h16M4 12h16M4 18h16" />
                </svg>
              )}
            </button>
          </div>
        </div>
      </div>

      {/* Mobile Navigation */}
      {mobileMenuOpen && (
        <div className="md:hidden bg-[var(--dark-surface)] border-t border-[var(--dark-border)]">
          <nav className="px-4 py-4 space-y-2">
            {navItems.map((item) => (
              <Link
                key={item.href}
                href={item.href}
                onClick={() => setMobileMenuOpen(false)}
                className="block py-2 text-[var(--text-secondary)] hover:text-[var(--text-primary)] transition-colors"
              >
                {item.label}
              </Link>
            ))}
            {ctaExternal ? (
              <a
                href={ctaHref}
                target="_blank"
                rel="noopener noreferrer"
                onClick={() => setMobileMenuOpen(false)}
                className="block btn-primary text-center mt-4"
              >
                {ctaLabel}
              </a>
            ) : (
              <Link
                href={ctaHref}
                onClick={() => setMobileMenuOpen(false)}
                className="block btn-primary text-center mt-4"
              >
                {ctaLabel}
              </Link>
            )}
          </nav>
        </div>
      )}
    </header>
  );
}

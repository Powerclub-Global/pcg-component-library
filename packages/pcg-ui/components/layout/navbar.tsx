"use client";

import { useState, useEffect, useCallback } from "react";
import Link from "next/link";

export interface NavbarNavItem {
  label: string;
  href: string;
}

export interface NavbarCTA {
  label: string;
  href: string;
  variant?: "primary" | "outline";
}

export interface NavbarPhone {
  number: string;
  hours?: string;
}

export interface NavbarProps {
  logo: React.ReactNode;
  logoHref?: string;
  navItems: NavbarNavItem[];
  cta?: NavbarCTA;
  mobileMenuVariant?: "dropdown" | "drawer" | "fullscreen";
  scrollBehavior?: "transparent-to-solid" | "always-solid";
  scrollThreshold?: number;
  theme?: "dark" | "light";
  phone?: NavbarPhone;
  cartSlot?: React.ReactNode;
  className?: string;
}

export function Navbar({
  logo,
  logoHref = "/",
  navItems,
  cta,
  mobileMenuVariant = "drawer",
  scrollBehavior = "always-solid",
  scrollThreshold = 20,
  theme = "light",
  phone,
  cartSlot,
  className = "",
}: NavbarProps) {
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);
  const [isScrolled, setIsScrolled] = useState(false);

  const handleScroll = useCallback(() => {
    setIsScrolled(window.scrollY > scrollThreshold);
  }, [scrollThreshold]);

  useEffect(() => {
    if (scrollBehavior === "transparent-to-solid") {
      window.addEventListener("scroll", handleScroll, { passive: true });
      return () => window.removeEventListener("scroll", handleScroll);
    }
  }, [scrollBehavior, handleScroll]);

  // Lock body scroll when mobile menu is open
  useEffect(() => {
    if (mobileMenuOpen) {
      document.body.style.overflow = "hidden";
    } else {
      document.body.style.overflow = "";
    }
    return () => {
      document.body.style.overflow = "";
    };
  }, [mobileMenuOpen]);

  const isDark = theme === "dark";
  const isTransparent = scrollBehavior === "transparent-to-solid" && !isScrolled;

  const headerBg = isTransparent
    ? "bg-transparent"
    : isDark
      ? "bg-[var(--color-surface,#030712)]/95 backdrop-blur-xl border-b border-[var(--color-border,rgba(255,255,255,0.1))]"
      : "bg-[var(--color-surface,#ffffff)] backdrop-blur-sm border-b border-[var(--color-border,#e5e5e5)]";

  const textColor = isDark || isTransparent ? "text-white" : "text-[var(--color-text,#1a1a1a)]";
  const textMuted = isDark || isTransparent ? "text-white/70" : "text-[var(--color-text-muted,#666)]";
  const hoverColor = "hover:text-[var(--color-accent)]";

  return (
    <>
      <header
        className={`fixed top-0 left-0 right-0 z-50 transition-all duration-500 ease-out ${headerBg} ${className}`}
      >
        <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
          <nav className="flex h-16 lg:h-20 items-center justify-between">
            {/* Logo */}
            <Link href={logoHref} className="relative z-10 flex items-center gap-3">
              {logo}
            </Link>

            {/* Desktop Navigation */}
            <div className="hidden lg:flex items-center gap-1">
              {navItems.map((item) => (
                <Link
                  key={item.href}
                  href={item.href}
                  className={`px-4 py-2 text-sm font-medium tracking-wide transition-colors duration-300 ${textMuted} ${hoverColor}`}
                >
                  {item.label}
                </Link>
              ))}
            </div>

            {/* Desktop Right Section */}
            <div className="hidden lg:flex items-center gap-4">
              {phone && (
                <a
                  href={`tel:${phone.number.replace(/\D/g, "")}`}
                  className={`flex items-center gap-2 text-sm transition-colors duration-300 ${textMuted} ${hoverColor}`}
                >
                  <svg className="h-4 w-4" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M3 5a2 2 0 012-2h3.28a1 1 0 01.948.684l1.498 4.493a1 1 0 01-.502 1.21l-2.257 1.13a11.042 11.042 0 005.516 5.516l1.13-2.257a1 1 0 011.21-.502l4.493 1.498a1 1 0 01.684.949V19a2 2 0 01-2 2h-1C9.716 21 3 14.284 3 6V5z" />
                  </svg>
                  <span>{phone.number}</span>
                  {phone.hours && (
                    <span className="text-xs opacity-75">{phone.hours}</span>
                  )}
                </a>
              )}

              {cta && (
                <Link
                  href={cta.href}
                  className={
                    cta.variant === "outline"
                      ? `border border-[var(--color-accent)] text-[var(--color-accent)] hover:bg-[var(--color-accent)] hover:text-white px-5 py-2 rounded-lg font-semibold text-sm transition-all duration-200`
                      : `bg-[var(--color-accent)] hover:bg-[var(--color-accent-hover,var(--color-accent))] text-white px-5 py-2 rounded-lg font-semibold text-sm transition-all duration-200 hover:shadow-lg`
                  }
                >
                  {cta.label}
                </Link>
              )}

              {cartSlot}
            </div>

            {/* Mobile Right Section */}
            <div className="lg:hidden flex items-center gap-3">
              {cartSlot}
              <button
                type="button"
                onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
                className={`p-2 rounded-lg transition-colors ${textColor}`}
                aria-label={mobileMenuOpen ? "Close menu" : "Open menu"}
                aria-expanded={mobileMenuOpen}
              >
                <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  {mobileMenuOpen && mobileMenuVariant === "dropdown" ? (
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M6 18L18 6M6 6l12 12" />
                  ) : (
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M4 6h16M4 12h16M4 18h16" />
                  )}
                </svg>
              </button>
            </div>
          </nav>
        </div>

        {/* Mobile Dropdown Menu */}
        {mobileMenuOpen && mobileMenuVariant === "dropdown" && (
          <div className="lg:hidden border-t border-[var(--color-border,rgba(255,255,255,0.1))]">
            <div className="mx-auto max-w-7xl px-4 sm:px-6 py-4">
              <div className="flex flex-col gap-2">
                {navItems.map((item) => (
                  <Link
                    key={item.href}
                    href={item.href}
                    onClick={() => setMobileMenuOpen(false)}
                    className={`px-4 py-3 rounded-lg font-medium transition-colors ${textMuted} ${hoverColor}`}
                  >
                    {item.label}
                  </Link>
                ))}
                {cta && (
                  <Link
                    href={cta.href}
                    onClick={() => setMobileMenuOpen(false)}
                    className="mt-2 bg-[var(--color-accent)] text-white text-center px-6 py-3 rounded-lg font-semibold transition-colors"
                  >
                    {cta.label}
                  </Link>
                )}
              </div>
            </div>
          </div>
        )}
      </header>

      {/* Mobile Drawer / Fullscreen Menu */}
      {mobileMenuOpen && mobileMenuVariant !== "dropdown" && (
        <div className="fixed inset-0 z-[60] lg:hidden">
          {/* Backdrop */}
          <div
            className="fixed inset-0 bg-black/60 backdrop-blur-sm"
            onClick={() => setMobileMenuOpen(false)}
            aria-hidden="true"
          />

          {/* Drawer / Fullscreen Panel */}
          <div
            className={
              mobileMenuVariant === "fullscreen"
                ? "fixed inset-0 bg-[var(--color-surface,#030712)] flex flex-col"
                : "fixed right-0 top-0 h-full w-80 max-w-[90vw] bg-[var(--color-surface,#ffffff)] shadow-2xl border-l border-[var(--color-border,#e5e5e5)] flex flex-col"
            }
          >
            {/* Header */}
            <div className="flex items-center justify-between px-6 h-16 lg:h-20 border-b border-[var(--color-border,rgba(255,255,255,0.1))]">
              <div className="flex items-center gap-3">{logo}</div>
              <button
                type="button"
                onClick={() => setMobileMenuOpen(false)}
                className={`p-2 rounded-lg transition-colors ${textColor}`}
                aria-label="Close menu"
              >
                <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M6 18L18 6M6 6l12 12" />
                </svg>
              </button>
            </div>

            {/* Links */}
            <nav className="flex-1 overflow-y-auto px-6 py-8">
              <div className="flex flex-col gap-1">
                {navItems.map((item) => (
                  <Link
                    key={item.href}
                    href={item.href}
                    onClick={() => setMobileMenuOpen(false)}
                    className={`block py-3 text-lg font-medium tracking-wide transition-colors duration-300 border-b border-[var(--color-border,rgba(255,255,255,0.05))] ${textMuted} ${hoverColor}`}
                  >
                    {item.label}
                  </Link>
                ))}
              </div>
            </nav>

            {/* Footer */}
            <div className="border-t border-[var(--color-border,rgba(255,255,255,0.05))] px-6 py-6 space-y-4">
              {phone && (
                <a
                  href={`tel:${phone.number.replace(/\D/g, "")}`}
                  className={`flex items-center gap-3 text-sm transition-colors ${textMuted} ${hoverColor}`}
                >
                  <svg className="h-4 w-4" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M3 5a2 2 0 012-2h3.28a1 1 0 01.948.684l1.498 4.493a1 1 0 01-.502 1.21l-2.257 1.13a11.042 11.042 0 005.516 5.516l1.13-2.257a1 1 0 011.21-.502l4.493 1.498a1 1 0 01.684.949V19a2 2 0 01-2 2h-1C9.716 21 3 14.284 3 6V5z" />
                  </svg>
                  <div>
                    <div className="font-semibold">{phone.number}</div>
                    {phone.hours && <div className="text-xs opacity-75">{phone.hours}</div>}
                  </div>
                </a>
              )}
              {cta && (
                <Link
                  href={cta.href}
                  onClick={() => setMobileMenuOpen(false)}
                  className="block w-full bg-[var(--color-accent)] text-white text-center px-6 py-3 rounded-lg font-semibold transition-colors"
                >
                  {cta.label}
                </Link>
              )}
            </div>
          </div>
        </div>
      )}
    </>
  );
}

export default Navbar;

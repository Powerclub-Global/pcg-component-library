"use client";

import { useState, useEffect } from "react";
import Link from "next/link";

export interface NavbarNavItem {
  label: string;
  href: string;
}

export interface NavbarCTA {
  label: string;
  href: string;
}

export interface NavbarPhone {
  number: string;
  address?: string;
}

export interface NavbarProps {
  logo: React.ReactNode;
  logoHref?: string;
  navItems: NavbarNavItem[];
  cta?: NavbarCTA;
  phone?: NavbarPhone;
  scrollBehavior?: "transparent-to-solid" | "always-solid";
  className?: string;
}

export function Navbar({
  logo,
  logoHref = "/",
  navItems,
  cta,
  phone,
  scrollBehavior = "transparent-to-solid",
  className = "",
}: NavbarProps) {
  const [mobileOpen, setMobileOpen] = useState(false);
  const [scrolled, setScrolled] = useState(scrollBehavior === "always-solid");

  useEffect(() => {
    if (scrollBehavior === "always-solid") return;
    const onScroll = () => setScrolled(window.scrollY > 80);
    onScroll();
    window.addEventListener("scroll", onScroll, { passive: true });
    return () => window.removeEventListener("scroll", onScroll);
  }, [scrollBehavior]);

  return (
    <header
      className={`fixed left-0 right-0 top-0 z-50 transition-all duration-300 ${className}`}
      style={
        scrolled
          ? {
              background: "rgba(13,13,13,0.95)",
              backdropFilter: "blur(8px)",
              borderBottom: "1px solid rgba(255,255,255,0.1)",
              boxShadow: "0 4px 20px rgba(0,0,0,0.2)",
            }
          : { background: "transparent" }
      }
    >
      {phone && (
        <div
          className={`overflow-hidden text-center text-xs uppercase tracking-widest transition-all duration-300 ${
            scrolled ? "h-0 opacity-0" : "h-8 opacity-100"
          }`}
          style={{ background: "rgba(255,255,255,0.08)", color: "#ffffff", borderBottom: "1px solid rgba(255,255,255,0.1)" }}
        >
          <div className="flex h-full items-center justify-center gap-4">
            <a
              href={`tel:${phone.number.replace(/\D/g, "")}`}
              className="font-semibold transition-colors hover:brightness-110"
            >
              {phone.number}
            </a>
            {phone.address && (
              <>
                <span style={{ color: "rgba(255,255,255,0.4)" }}>|</span>
                <span>{phone.address}</span>
              </>
            )}
          </div>
        </div>
      )}

      <nav className="mx-auto flex h-16 max-w-[1400px] items-center justify-between px-6">
        <Link href={logoHref} className="block">
          {logo}
        </Link>

        <div className="hidden items-center gap-8 md:flex">
          {navItems.map((link) => (
            <Link
              key={link.href}
              href={link.href}
              className="group relative text-sm uppercase tracking-widest transition-colors"
              style={{ color: "rgba(255,255,255,0.6)" }}
            >
              <span className="transition-colors group-hover:text-white">
                {link.label}
              </span>
              <span
                className="absolute -bottom-1 left-0 h-[1px] w-0 transition-all duration-300 group-hover:w-full"
                style={{ background: "#ffffff" }}
              />
            </Link>
          ))}
          {cta && (
            <Link
              href={cta.href}
              className="px-5 py-2 text-sm font-semibold uppercase tracking-wider transition-all hover:brightness-110"
              style={{ background: "#ffffff", color: "#000000" }}
            >
              {cta.label}
            </Link>
          )}
        </div>

        <button
          onClick={() => setMobileOpen(!mobileOpen)}
          className="flex flex-col gap-1.5 p-2 md:hidden"
          aria-label="Toggle menu"
        >
          <span
            className={`h-[2px] w-6 transition-all duration-300 ${
              mobileOpen ? "translate-y-[5px] rotate-45" : ""
            }`}
            style={{ background: "#ffffff" }}
          />
          <span
            className={`h-[2px] w-6 transition-all duration-300 ${
              mobileOpen ? "scale-0 opacity-0" : ""
            }`}
            style={{ background: "#ffffff" }}
          />
          <span
            className={`h-[2px] w-6 transition-all duration-300 ${
              mobileOpen ? "-translate-y-[5px] -rotate-45" : ""
            }`}
            style={{ background: "#ffffff" }}
          />
        </button>
      </nav>

      <div
        className={`overflow-hidden transition-all duration-300 md:hidden ${
          mobileOpen ? "max-h-[500px] opacity-100" : "max-h-0 opacity-0"
        }`}
      >
        <div
          className="space-y-1 px-6 py-4 backdrop-blur-xl"
          style={{
            background: "rgba(255,255,255,0.06)",
            borderTop: "1px solid rgba(255,255,255,0.1)",
          }}
        >
          {navItems.map((link) => (
            <Link
              key={link.href}
              href={link.href}
              onClick={() => setMobileOpen(false)}
              className="block py-3 text-sm uppercase tracking-widest transition-all hover:pl-2 hover:text-white"
              style={{
                color: "rgba(255,255,255,0.6)",
                borderBottom: "1px solid rgba(255,255,255,0.05)",
              }}
            >
              {link.label}
            </Link>
          ))}
          {cta && (
            <Link
              href={cta.href}
              onClick={() => setMobileOpen(false)}
              className="mt-4 block py-3 text-center text-sm font-semibold uppercase tracking-wider"
              style={{ background: "#ffffff", color: "#000000" }}
            >
              {cta.label}
            </Link>
          )}
        </div>
      </div>
    </header>
  );
}

export default Navbar;

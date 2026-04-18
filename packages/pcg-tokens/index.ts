export type { ColorTokens, NeutralScale, TypographyTokens, ShadowTokens, RadiusTokens, ThemeConfig } from "./types";

export const NEUTRALS = {
  50: "#F7F9FC", 100: "#F1F5F9", 200: "#E2E8F0", 300: "#D1D6DC", 400: "#94A3B8",
  500: "#64748B", 600: "#475569", 700: "#334155", 800: "#1E293B", 900: "#0F172A",
} as const;

export const STATUS = {
  success: "#22c55e",
  warning: "#eab308",
  error: "#ef4444",
  info: "#3b82f6",
} as const;

export const GOLD = {
  DEFAULT: "#B4914C",
  light: "#D4B978",
  dark: "#8B6F3A",
} as const;

export const SHADOWS = {
  soft: "0 2px 15px -3px rgba(0,0,0,0.07), 0 10px 20px -2px rgba(0,0,0,0.04)",
  medium: "0 4px 25px -5px rgba(0,0,0,0.1), 0 10px 10px -5px rgba(0,0,0,0.04)",
  strong: "0 10px 40px -10px rgba(0,0,0,0.15), 0 2px 10px -2px rgba(0,0,0,0.05)",
} as const;

export const RADIUS = {
  sm: "6px", md: "8px", lg: "12px", xl: "16px", full: "9999px",
} as const;

/** Canonical Sovereign Stack Rainbow */
export const SS_COLORS = {
  alpha: "#dc2626",
  omega: "#f97316",
  vibertas: "#eab308",
  vibe: "#22c55e",
  vibeland: "#3b82f6",
  pythia: "#6366f1",
  spectrum: "#8b5cf6",
} as const;

/** Ecosystem Gold */
export const SOVEREIGN_GOLD = {
  DEFAULT: "#C9A227",
  light: "#E8D48A",
  dark: "#8B7119",
} as const;

/** Dark Neutrals */
export const DARK_NEUTRALS = {
  bgPrimary: "#0a0a0f",
  bgSecondary: "#111118",
  bgSurface: "#16161d",
  bgCard: "#1a1a22",
  bgElevated: "#222230",
  borderDefault: "#2a2a35",
  borderSubtle: "#1f1f2a",
} as const;

/** Text Colors */
export const TEXT_COLORS = {
  primary: "#f8fafc",
  secondary: "#a1a1aa",
  muted: "#71717a",
} as const;

/** Status Colors */
export const STATUS_COLORS = {
  success: "#22c55e",
  successBg: "rgba(34, 197, 94, 0.1)",
  warning: "#eab308",
  warningBg: "rgba(234, 179, 8, 0.1)",
  error: "#ef4444",
  errorBg: "rgba(239, 68, 68, 0.1)",
  info: "#3b82f6",
  infoBg: "rgba(59, 130, 246, 0.1)",
} as const;

/** All colors as CSS custom properties map */
export const CSS_VARS = {
  "--ss-alpha": SS_COLORS.alpha,
  "--ss-omega": SS_COLORS.omega,
  "--ss-vibertas": SS_COLORS.vibertas,
  "--ss-vibe": SS_COLORS.vibe,
  "--ss-vibeland": SS_COLORS.vibeland,
  "--ss-pythia": SS_COLORS.pythia,
  "--ss-spectrum": SS_COLORS.spectrum,
  "--sovereign-gold": SOVEREIGN_GOLD.DEFAULT,
  "--sovereign-gold-light": SOVEREIGN_GOLD.light,
  "--sovereign-gold-dark": SOVEREIGN_GOLD.dark,
  "--bg-primary": DARK_NEUTRALS.bgPrimary,
  "--bg-secondary": DARK_NEUTRALS.bgSecondary,
  "--bg-surface": DARK_NEUTRALS.bgSurface,
  "--bg-card": DARK_NEUTRALS.bgCard,
  "--bg-elevated": DARK_NEUTRALS.bgElevated,
  "--border-default": DARK_NEUTRALS.borderDefault,
  "--text-primary": TEXT_COLORS.primary,
  "--text-secondary": TEXT_COLORS.secondary,
  "--text-muted": TEXT_COLORS.muted,
  "--status-success": STATUS_COLORS.success,
  "--status-success-bg": STATUS_COLORS.successBg,
  "--status-warning": STATUS_COLORS.warning,
  "--status-error": STATUS_COLORS.error,
  "--status-info": STATUS_COLORS.info,
} as const;

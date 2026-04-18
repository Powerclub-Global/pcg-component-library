export interface ColorTokens {
  primary: string;
  primaryForeground: string;
  accent: string;
  accentForeground: string;
  background: string;
  foreground: string;
  card: string;
  cardForeground: string;
  border: string;
  input: string;
  ring: string;
  muted: string;
  mutedForeground: string;
  success: string;
  warning: string;
  error: string;
  info: string;
}

export interface NeutralScale {
  50: string; 100: string; 200: string; 300: string; 400: string;
  500: string; 600: string; 700: string; 800: string; 900: string;
}

export interface TypographyTokens {
  fontBody: string;
  fontDisplay: string;
  fontMono: string;
  textDisplay1: string;
  textDisplay2: string;
  textH1: string;
  textH2: string;
  textH3: string;
  textBodyLg: string;
  textBody: string;
  textCaption: string;
  textSmall: string;
}

export interface ShadowTokens {
  soft: string;
  medium: string;
  strong: string;
  glow: string;
}

export interface RadiusTokens {
  sm: string;
  md: string;
  lg: string;
  xl: string;
  full: string;
}

export interface ThemeConfig {
  name: string;
  colors: Partial<ColorTokens>;
  fontDisplay?: string;
}

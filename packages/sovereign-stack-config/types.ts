export interface EcosystemProject {
  id: string;
  name: string;
  shortName: string;
  description: string;
  url: string;
  color: string;
  colorVar: string;
}

export interface NavItem {
  label: string;
  href: string;
}

export interface CTAButton {
  label: string;
  href: string;
  variant?: "primary" | "outline" | "ghost";
  isExternal?: boolean;
}

export interface SocialLink {
  name: string;
  href: string;
  icon: string;
}

export interface FooterLinkSection {
  title: string;
  links: Array<{ label: string; href: string; isExternal?: boolean }>;
}

export interface EcosystemLink {
  name: string;
  url: string;
  color: string;
}

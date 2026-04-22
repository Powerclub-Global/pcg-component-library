import type { ComponentConfig } from "@/components/types";

export const footerConfig: ComponentConfig = {
  name: "Footer",
  slug: "footer",
  description: "Multi-column footer with brand, links, socials, and contact",
  category: "layout",
  sourcePath: "packages/pcg-ui/components/layout/footer.tsx",
  controls: [
    { name: "copyright", type: "text", label: "Copyright", defaultValue: "© 2026 PCG Global" },
  ],
  staticProps: {
    brand: {
      name: "PCG",
      description: "Building the future of connected commerce.",
    },
    linkSections: [
      {
        title: "Product",
        links: [
          { label: "Features", href: "#features" },
          { label: "Pricing", href: "#pricing" },
          { label: "Docs", href: "#docs" },
        ],
      },
      {
        title: "Company",
        links: [
          { label: "About", href: "#about" },
          { label: "Blog", href: "#blog" },
          { label: "Careers", href: "#careers" },
        ],
      },
      {
        title: "Legal",
        links: [
          { label: "Privacy", href: "#privacy" },
          { label: "Terms", href: "#terms" },
        ],
      },
    ],
    socialLinks: [
      { platform: "twitter", href: "https://twitter.com" },
      { platform: "instagram", href: "https://instagram.com" },
      { platform: "linkedin", href: "https://linkedin.com" },
    ],
    contact: {
      email: "hello@pcg.com",
      phone: "+1 555 000 0000",
    },
  },
};

// ── UI Primitives ──────────────────────────────────────────
export { Button, type ButtonProps, buttonVariants } from "./components/ui/button";
export { Skeleton } from "./components/ui/skeleton";
export { Section, type SectionProps } from "./components/ui/section";
export { ScrollReveal, type ScrollRevealProps } from "./components/ui/scroll-reveal";
export { ImageUpload, type ImageUploadProps } from "./components/ui/image-upload";
export { ShareButton, type ShareButtonProps } from "./components/ui/share-button";
export { CopyButton, type CopyButtonProps } from "./components/ui/copy-button";
export { JsonLd } from "./components/ui/json-ld";
export { ImageWithFallback, type ImageWithFallbackProps } from "./components/ui/image-with-fallback";
export { ImageRotator, type ImageRotatorProps } from "./components/ui/image-rotator";
export { Pagination, type PaginationProps } from "./components/ui/pagination";
export { DateRangePicker, type DateRangePickerProps } from "./components/ui/date-range-picker";
export { StatCard, type StatCardProps } from "./components/ui/stat-card";

// ── Layout ─────────────────────────────────────────────────
export { Navbar, type NavbarProps } from "./components/layout/navbar";
export { Footer, type FooterProps } from "./components/layout/footer";
export { Container, type ContainerProps } from "./components/layout/container";

// ── Blocks ─────────────────────────────────────────────────
export { HeroSection, type HeroSectionProps } from "./components/blocks/hero-section";
export { CTASection, type CTASectionProps } from "./components/blocks/cta-section";
export { FAQSection, type FAQSectionProps } from "./components/blocks/faq-section";
export { FeatureGrid, type FeatureGridProps } from "./components/blocks/feature-grid";
export { PricingSection, type PricingSectionProps } from "./components/blocks/pricing-section";
export { Testimonials, type TestimonialsProps } from "./components/blocks/testimonials";
export { ContactForm, type ContactFormProps } from "./components/blocks/contact-form";
export { NewsletterSignup, type NewsletterSignupProps } from "./components/blocks/newsletter-signup";
export { StatsSection, type StatsSectionProps } from "./components/blocks/stats-section";
export { ServicesGrid, type ServicesGridProps } from "./components/blocks/services-grid";
export { PartnerMarquee, type PartnerMarqueeProps } from "./components/blocks/partner-marquee";
export { TrustBadges, type TrustBadgesProps } from "./components/blocks/trust-badges";

// ── Commerce ───────────────────────────────────────────────
export { VariantManager, type VariantManagerProps } from "./components/commerce/variant-manager";

// ── Hooks ──────────────────────────────────────────────────
export { useScrollPosition } from "./hooks/use-scroll-position";
export { useBodyScrollLock } from "./hooks/use-body-scroll-lock";
export { useIntersection } from "./hooks/use-intersection";

// ── Utilities ──────────────────────────────────────────────
export { cn } from "./lib/cn";

import {
  Navbar,
  HeroSection,
  ServicesGrid,
  StatsSection,
  Testimonials,
  CTASection,
  Footer,
} from "@pcg/ui";
import { NAV_LINKS, CONTACT, SOCIAL_LINKS, CTA_PRIMARY, CTA_SECONDARY, SITE_NAME } from "@/lib/constants";

/*
  Homepage — composed entirely from @pcg/ui blocks.
  Each block accepts only the data that changes per client.
  Swap content here; don't edit the components in @pcg/ui.

  Blocks used (in order):
    Navbar → HeroSection → ServicesGrid → StatsSection
    → Testimonials → CTASection → Footer

  Add or remove blocks as needed. See /docs for the full list.
*/

export default function HomePage() {
  return (
    <>
      {/* ─── Navigation ────────────────────────────────── */}
      <Navbar
        logo={{ text: SITE_NAME }}
        links={NAV_LINKS}
        cta={CTA_PRIMARY}
        sticky
      />

      {/* ─── Hero ──────────────────────────────────────── */}
      <HeroSection
        eyebrow="Welcome"
        headline="Replace with a compelling headline"
        subheadline="One or two sentences that describe the core value proposition. Keep it short and benefit-focused."
        ctaPrimary={CTA_PRIMARY}
        ctaSecondary={CTA_SECONDARY}
        variant="centered"
      />

      {/* ─── Services ──────────────────────────────────── */}
      <ServicesGrid
        eyebrow="What We Do"
        headline="Our Services"
        services={[
          {
            title: "Service One",
            description: "Short description of this service. What problem does it solve?",
          },
          {
            title: "Service Two",
            description: "Short description of this service. What problem does it solve?",
          },
          {
            title: "Service Three",
            description: "Short description of this service. What problem does it solve?",
          },
          {
            title: "Service Four",
            description: "Short description of this service. What problem does it solve?",
          },
        ]}
      />

      {/* ─── Stats ─────────────────────────────────────── */}
      <StatsSection
        stats={[
          { value: 500, suffix: "+", label: "Clients Served" },
          { value: 10, suffix: "yr", label: "In Business" },
          { value: 98, suffix: "%", label: "Satisfaction Rate" },
          { value: 24, suffix: "/7", label: "Support" },
        ]}
      />

      {/* ─── Testimonials ──────────────────────────────── */}
      <Testimonials
        eyebrow="Reviews"
        headline="What Our Clients Say"
        testimonials={[
          {
            quote: "Replace with a real client quote. Specific results work best — numbers, before/after.",
            author: "Client Name",
            role: "Title, Company",
            rating: 5,
          },
          {
            quote: "Another genuine client testimonial. Ask clients for these — don't write them yourself.",
            author: "Client Name",
            role: "Title, Company",
            rating: 5,
          },
          {
            quote: "Third testimonial. Three is the minimum; five is ideal for the grid layout.",
            author: "Client Name",
            role: "Title, Company",
            rating: 5,
          },
        ]}
      />

      {/* ─── CTA ───────────────────────────────────────── */}
      <CTASection
        headline="Ready to get started?"
        description="One sentence that removes friction and tells them exactly what happens next."
        primaryCta={CTA_PRIMARY}
        variant="dark"
      />

      {/* ─── Footer ────────────────────────────────────── */}
      <Footer
        logo={{ text: SITE_NAME }}
        links={[
          {
            heading: "Services",
            items: NAV_LINKS,
          },
          {
            heading: "Contact",
            items: [
              { label: CONTACT.phone, href: `tel:${CONTACT.phone}` },
              { label: CONTACT.email, href: `mailto:${CONTACT.email}` },
            ],
          },
        ]}
        social={SOCIAL_LINKS}
        copyright={`© ${new Date().getFullYear()} ${SITE_NAME}. All rights reserved.`}
      />
    </>
  );
}

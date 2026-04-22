/*
  STEP 4: Populate site-wide constants.
  These are consumed by the Navbar, Footer, and any section that
  needs nav links, contact info, or social handles.
*/

export const SITE_NAME = "My Client";
export const SITE_URL = process.env.NEXT_PUBLIC_SITE_URL ?? "http://localhost:3200";

export const NAV_LINKS = [
  { label: "Services", href: "/services" },
  { label: "About", href: "/about" },
  { label: "Contact", href: "/contact" },
];

export const CONTACT = {
  phone: "+1 (305) 555-0100",
  email: "hello@myclient.com",
  address: "100 Brickell Ave, Miami FL 33131",
};

export const SOCIAL_LINKS = [
  { platform: "instagram" as const, href: "https://instagram.com/myclient" },
  { platform: "facebook" as const, href: "https://facebook.com/myclient" },
];

export const CTA_PRIMARY = { label: "Get a Quote", href: "/contact" };
export const CTA_SECONDARY = { label: "View Services", href: "/services" };

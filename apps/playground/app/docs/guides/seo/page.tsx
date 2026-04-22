export const metadata = { title: "SEO — PCG Best Practices" };

export default function SeoPage() {
  return (
    <div className="px-10 py-14 max-w-3xl">
      <div className="mb-2 text-xs font-semibold uppercase tracking-wider text-neutral-500">Best Practices</div>
      <h1 className="text-5xl font-bold tracking-tight">SEO</h1>
      <p className="mt-4 text-lg text-neutral-400">
        Every PCG client site needs to rank. These are the non-negotiable SEO patterns — built into the starter and required in every project.
      </p>

      <Section title="Metadata (Next.js)">
        <p className="text-neutral-400 text-sm mb-4">
          Use Next.js <code className="text-white">generateMetadata</code> for dynamic pages and the <code className="text-white">metadata</code> export for static ones. Never write raw <code className="text-white">&lt;head&gt;</code> tags.
        </p>
        <Code>{`// src/app/layout.tsx — root metadata (site defaults)
import type { Metadata } from "next";

export const metadata: Metadata = {
  metadataBase: new URL("https://www.myclient.com"),
  title: {
    default: "My Client — Miami's Premier Service",
    template: "%s | My Client",
  },
  description: "...",
  openGraph: {
    type: "website",
    locale: "en_US",
    url: "https://www.myclient.com",
    siteName: "My Client",
    images: [{ url: "/og.jpg", width: 1200, height: 630 }],
  },
  twitter: {
    card: "summary_large_image",
    site: "@myclient",
  },
  robots: {
    index: true,
    follow: true,
  },
};`}</Code>
        <Code>{`// src/app/services/[slug]/page.tsx — per-page metadata
export async function generateMetadata({ params }) {
  const service = await getService(params.slug);
  return {
    title: service.name,
    description: service.excerpt,
    openGraph: {
      title: service.name,
      images: [{ url: service.ogImage }],
    },
  };
}`}</Code>
      </Section>

      <Section title="OG image">
        <p className="text-neutral-400 text-sm mb-4">
          Create a static <code className="text-white">public/og.jpg</code> (1200×630) for the site default. For dynamic pages, use Next.js <code className="text-white">ImageResponse</code>:
        </p>
        <Code>{`// src/app/og/route.tsx
import { ImageResponse } from "next/og";

export const runtime = "edge";

export async function GET(request: Request) {
  const { searchParams } = new URL(request.url);
  const title = searchParams.get("title") ?? "My Client";

  return new ImageResponse(
    (
      <div style={{ display: "flex", width: "100%", height: "100%",
        background: "#0f172a", alignItems: "center", justifyContent: "center" }}>
        <h1 style={{ color: "white", fontSize: 64 }}>{title}</h1>
      </div>
    ),
    { width: 1200, height: 630 }
  );
}`}</Code>
      </Section>

      <Section title="JSON-LD structured data">
        <p className="text-neutral-400 text-sm mb-4">
          Use the <code className="text-white">JsonLd</code> component from <code className="text-white">@pcg/ui</code>. At minimum, add <code className="text-white">LocalBusiness</code> schema to the homepage of every client site:
        </p>
        <Code>{`import { JsonLd } from "@pcg/ui";

// In your homepage or layout
<JsonLd
  data={{
    "@context": "https://schema.org",
    "@type": "LocalBusiness",
    name: "My Client",
    url: "https://www.myclient.com",
    telephone: "+1-305-555-0100",
    address: {
      "@type": "PostalAddress",
      streetAddress: "100 Brickell Ave",
      addressLocality: "Miami",
      addressRegion: "FL",
      postalCode: "33131",
      addressCountry: "US",
    },
    openingHoursSpecification: [...],
    sameAs: [
      "https://www.instagram.com/myclient",
      "https://www.facebook.com/myclient",
    ],
  }}
/>`}</Code>
        <p className="mt-4 text-neutral-400 text-sm">Also add <code className="text-white">Service</code>, <code className="text-white">FAQPage</code>, and <code className="text-white">Review</code> schema where applicable — these get rich snippets in SERPs.</p>
      </Section>

      <Section title="Sitemap and robots">
        <Code>{`// src/app/sitemap.ts
import type { MetadataRoute } from "next";

export default function sitemap(): MetadataRoute.Sitemap {
  return [
    { url: "https://www.myclient.com", lastModified: new Date(), changeFrequency: "monthly", priority: 1 },
    { url: "https://www.myclient.com/services", lastModified: new Date(), changeFrequency: "weekly", priority: 0.9 },
    // add all static routes
  ];
}`}</Code>
        <Code>{`// src/app/robots.ts
import type { MetadataRoute } from "next";

export default function robots(): MetadataRoute.Robots {
  return {
    rules: { userAgent: "*", allow: "/" },
    sitemap: "https://www.myclient.com/sitemap.xml",
  };
}`}</Code>
      </Section>

      <Section title="Core checklist">
        <ul className="space-y-2 text-sm">
          {[
            ["title + description on every page", "required"],
            ["OG image (1200×630)", "required"],
            ["JSON-LD LocalBusiness on homepage", "required"],
            ["sitemap.ts", "required"],
            ["robots.ts", "required"],
            ["metadataBase set in root layout", "required"],
            ["Canonical URLs (handled by Next.js automatically)", "automatic"],
            ["next/image for all images (alt text required)", "required"],
            ["Semantic HTML: h1 on every page, one per page", "required"],
            ["Google Search Console verified post-launch", "post-launch"],
          ].map(([item, status]) => (
            <li key={item} className="flex items-start gap-3">
              <span className={`mt-0.5 shrink-0 text-xs font-semibold px-1.5 py-0.5 rounded ${
                status === "required" ? "bg-white/10 text-white" :
                status === "automatic" ? "bg-green-500/20 text-green-400" :
                "bg-neutral-800 text-neutral-400"
              }`}>{status}</span>
              <span className="text-neutral-400">{item}</span>
            </li>
          ))}
        </ul>
      </Section>
    </div>
  );
}

function Section({ title, children }: { title: string; children: React.ReactNode }) {
  return (
    <section className="mt-12">
      <h2 className="text-2xl font-bold mb-4">{title}</h2>
      {children}
    </section>
  );
}

function Code({ children }: { children: string }) {
  return (
    <pre className="rounded-xl border border-neutral-800 px-4 py-3 text-sm font-mono text-neutral-200 overflow-x-auto leading-relaxed">
      <code>{children}</code>
    </pre>
  );
}

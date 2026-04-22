export const metadata = { title: "Performance — PCG Best Practices" };

export default function PerformancePage() {
  return (
    <div className="px-10 py-14 max-w-3xl">
      <div className="mb-2 text-xs font-semibold uppercase tracking-wider text-neutral-500">Best Practices</div>
      <h1 className="text-5xl font-bold tracking-tight">Performance</h1>
      <p className="mt-4 text-lg text-neutral-400">
        Core Web Vitals targets and the concrete patterns that hit them. Every PCG client site should
        score 90+ on PageSpeed before launch.
      </p>

      <Section title="Targets">
        <div className="grid grid-cols-3 gap-3">
          {[
            ["LCP", "< 2.5s", "Largest Contentful Paint"],
            ["INP", "< 200ms", "Interaction to Next Paint"],
            ["CLS", "< 0.1", "Cumulative Layout Shift"],
            ["FCP", "< 1.8s", "First Contentful Paint"],
            ["TTFB", "< 800ms", "Time to First Byte"],
            ["PageSpeed", "≥ 90", "Mobile score"],
          ].map(([metric, target, label]) => (
            <div key={metric} className="rounded-xl border border-neutral-800 px-4 py-3">
              <div className="text-white font-bold text-lg">{metric}</div>
              <div className="text-green-400 text-sm font-medium">{target}</div>
              <div className="text-neutral-500 text-xs mt-1">{label}</div>
            </div>
          ))}
        </div>
      </Section>

      <Section title="Images">
        <p className="text-neutral-400 text-sm mb-4">
          Images are the #1 LCP killer. Always use <code className="text-white">next/image</code> — never raw <code className="text-white">&lt;img&gt;</code> tags.
        </p>
        <Code>{`import Image from "next/image";

// Hero image — always priority + explicit size
<Image
  src="/hero.jpg"
  alt="Yacht charter in Miami"
  width={1440}
  height={900}
  priority              // Preloads — use for above-the-fold images only
  quality={85}
  className="w-full h-full object-cover"
/>

// Below-fold image — lazy loaded by default
<Image
  src="/service-1.jpg"
  alt="Premium detailing service"
  width={600}
  height={400}
  sizes="(max-width: 768px) 100vw, 50vw"
/>`}</Code>
        <ul className="mt-4 space-y-2 text-sm text-neutral-400">
          <li><span className="text-white font-medium">Use priority</span> only on the first visible image (hero). One per page max.</li>
          <li><span className="text-white font-medium">Always set sizes</span> for images in responsive grids — prevents 1440px images loading on mobile.</li>
          <li><span className="text-white font-medium">WebP is automatic</span> — next/image converts to WebP/AVIF. Don't manually convert source images.</li>
          <li><span className="text-white font-medium">Alt text is required</span> — both for accessibility and SEO. Describe the image, don't stuff keywords.</li>
        </ul>
      </Section>

      <Section title="Fonts">
        <p className="text-neutral-400 text-sm mb-4">
          Use <code className="text-white">next/font</code> — it zero-CLS, self-hosts automatically, and eliminates the external Google Fonts request.
        </p>
        <Code>{`// src/app/layout.tsx
import { Inter, Playfair_Display } from "next/font/google";

const inter = Inter({
  subsets: ["latin"],
  variable: "--font-body",
  display: "swap",
});

const playfair = Playfair_Display({
  subsets: ["latin"],
  variable: "--font-display",
  display: "swap",
});

export default function RootLayout({ children }) {
  return (
    <html lang="en" className={\`\${inter.variable} \${playfair.variable}\`}>
      <body>{children}</body>
    </html>
  );
}`}</Code>
        <p className="mt-4 text-neutral-400 text-sm">The CSS variable names must match <code className="text-white">--font-display</code> / <code className="text-white">--font-body</code> to plug into <code className="text-white">@pcg/tokens</code> correctly.</p>
      </Section>

      <Section title="Server vs client components">
        <p className="text-neutral-400 text-sm mb-4">
          Default to Server Components. Only add <code className="text-white">"use client"</code> when the component needs interactivity. More client components = more JS shipped = slower INP.
        </p>
        <table className="w-full text-sm rounded-xl border border-neutral-800 overflow-hidden">
          <thead className="text-xs uppercase tracking-wider text-neutral-500">
            <tr className="border-b border-neutral-800">
              <th className="px-4 py-3 text-left font-medium">Needs "use client"</th>
              <th className="px-4 py-3 text-left font-medium">Does NOT need it</th>
            </tr>
          </thead>
          <tbody className="divide-y divide-neutral-800/60">
            {[
              ["useState, useEffect, useRef", "Static content rendering"],
              ["onClick, onChange, onSubmit", "Data fetching (use async server component)"],
              ["Browser APIs (window, localStorage)", "next/image, next/link, next/font"],
              ["Animations (Framer Motion)", "JSON-LD, metadata"],
              ["Form validation (react-hook-form)", "SEO content sections"],
            ].map(([needs, doesnt]) => (
              <tr key={needs}>
                <td className="px-4 py-3 text-neutral-300 text-xs">{needs}</td>
                <td className="px-4 py-3 text-neutral-400 text-xs">{doesnt}</td>
              </tr>
            ))}
          </tbody>
        </table>
      </Section>

      <Section title="Lazy loading & code splitting">
        <Code>{`import dynamic from "next/dynamic";

// Heavy components (maps, video players, complex forms) — load on demand
const GoogleMap = dynamic(() => import("@/components/GoogleMap"), {
  loading: () => <div className="h-96 bg-muted animate-pulse rounded-xl" />,
  ssr: false,  // if it uses browser APIs
});

// Use in component — will only load when this section scrolls into view
// (combine with IntersectionObserver for true lazy load)`}</Code>
      </Section>

      <Section title="Pre-launch checklist">
        <ul className="space-y-2 text-sm">
          {[
            "Run Lighthouse in Chrome DevTools on mobile preset — target 90+",
            "All above-fold images have priority prop",
            "No raw <img> tags anywhere in the codebase",
            "Fonts loaded via next/font, not @import in CSS",
            "Heavy third-party scripts deferred (analytics, chat widgets)",
            "next/image domains configured in next.config.ts",
            "No layout shift on font load (font-display: swap)",
            "Bundle analyzer run — no unexpectedly large client chunks",
          ].map((item) => (
            <li key={item} className="flex items-start gap-2 text-neutral-400">
              <span className="text-neutral-600 mt-0.5">□</span>
              {item}
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

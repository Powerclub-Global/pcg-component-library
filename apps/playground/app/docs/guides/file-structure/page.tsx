export const metadata = { title: "File Structure — PCG Best Practices" };

export default function FileStructurePage() {
  return (
    <div className="px-10 py-14 max-w-3xl">
      <div className="mb-2 text-xs font-semibold uppercase tracking-wider text-neutral-500">Best Practices</div>
      <h1 className="text-5xl font-bold tracking-tight">File Structure</h1>
      <p className="mt-4 text-lg text-neutral-400">
        The standard folder layout for every PCG Next.js project. Consistency here means any dev can
        navigate any repo without a map.
      </p>

      <Section title="Canonical structure">
        <Code>{`my-site/
├── src/
│   ├── app/                    # Next.js App Router
│   │   ├── layout.tsx          # Root layout (fonts, metadata, providers)
│   │   ├── page.tsx            # Homepage
│   │   ├── globals.css         # Tailwind + @pcg/tokens imports
│   │   ├── (marketing)/        # Route group — no URL segment
│   │   │   ├── about/page.tsx
│   │   │   └── contact/page.tsx
│   │   └── api/                # API routes (if needed)
│   ├── components/
│   │   ├── ui/                 # Project-specific primitives not in @pcg/ui
│   │   ├── sections/           # Page sections (compose @pcg/ui blocks)
│   │   └── layout/             # Project-specific nav/footer overrides
│   ├── lib/
│   │   ├── utils.ts            # cn() and other pure helpers
│   │   └── constants.ts        # Site-wide constants (NAV_LINKS, etc.)
│   └── types/
│       └── index.ts            # Shared TypeScript types
├── public/
│   ├── images/                 # Static images (prefer next/image for everything)
│   └── fonts/                  # Self-hosted fonts (if not using Google)
├── .env.example                # Committed, redacted
├── .gitignore
├── next.config.ts
├── package.json
├── postcss.config.mjs
├── tsconfig.json
└── vercel.json`}</Code>
      </Section>

      <Section title="app/ conventions">
        <table className="w-full text-sm rounded-xl border border-neutral-800 overflow-hidden">
          <thead className="text-xs uppercase tracking-wider text-neutral-500">
            <tr className="border-b border-neutral-800">
              <th className="px-4 py-3 text-left font-medium">Pattern</th>
              <th className="px-4 py-3 text-left font-medium">When to use</th>
            </tr>
          </thead>
          <tbody className="divide-y divide-neutral-800/60">
            {[
              ["(group)/", "Group related routes without adding a URL segment. Use for (marketing), (auth), (dashboard)."],
              ["[slug]/page.tsx", "Dynamic routes. Always type params as Promise<{ slug: string }> in Next 15."],
              ["_components/", "Underscore prefix = co-located, not routable. For components only used by one route."],
              ["loading.tsx", "Suspense fallback for the route. Always add for data-fetching pages."],
              ["error.tsx", "Error boundary per segment. Add for any page with external data."],
              ["not-found.tsx", "Custom 404 per segment. Add at root level minimum."],
            ].map(([pat, note]) => (
              <tr key={pat}>
                <td className="px-4 py-3"><code className="text-white text-xs">{pat}</code></td>
                <td className="px-4 py-3 text-neutral-400 text-xs">{note}</td>
              </tr>
            ))}
          </tbody>
        </table>
      </Section>

      <Section title="components/ rules">
        <ul className="space-y-3 text-sm text-neutral-400">
          <li>
            <span className="text-white font-medium">Try @pcg/ui first.</span> Before creating a new component, check if it already exists in the library. If it's close but needs customization, extend via <code className="text-white">className</code> prop — don't fork.
          </li>
          <li>
            <span className="text-white font-medium">components/ui/</span> is for generic primitives that could eventually move into @pcg/ui. If you build something reusable here, flag it for library promotion.
          </li>
          <li>
            <span className="text-white font-medium">components/sections/</span> are page-specific compositions — a hero with the client's exact copy, a services block with hardcoded service list. These are intentionally NOT generic.
          </li>
          <li>
            <span className="text-white font-medium">One component per file.</span> Name the file after the component. <code className="text-white">ServiceCard.tsx</code>, not <code className="text-white">cards.tsx</code>.
          </li>
          <li>
            <span className="text-white font-medium">Named exports only.</span> No default exports from component files. Makes refactoring and barrel re-exports cleaner.
          </li>
        </ul>
      </Section>

      <Section title="Naming conventions">
        <table className="w-full text-sm rounded-xl border border-neutral-800 overflow-hidden">
          <thead className="text-xs uppercase tracking-wider text-neutral-500">
            <tr className="border-b border-neutral-800">
              <th className="px-4 py-3 text-left font-medium">Thing</th>
              <th className="px-4 py-3 text-left font-medium">Convention</th>
              <th className="px-4 py-3 text-left font-medium">Example</th>
            </tr>
          </thead>
          <tbody className="divide-y divide-neutral-800/60">
            {[
              ["Component files", "PascalCase.tsx", "ServiceCard.tsx"],
              ["Page files", "lowercase (Next.js convention)", "page.tsx, layout.tsx"],
              ["Route folders", "kebab-case", "yacht-charter/"],
              ["Hook files", "camelCase with use prefix", "useScrollPosition.ts"],
              ["Utility files", "camelCase", "utils.ts, formatDate.ts"],
              ["Type exports", "PascalCase + Props suffix", "ServiceCardProps"],
              ["CSS files", "kebab-case", "globals.css"],
              ["Constants", "SCREAMING_SNAKE_CASE", "NAV_LINKS, SITE_URL"],
            ].map(([thing, convention, example]) => (
              <tr key={thing}>
                <td className="px-4 py-3 text-neutral-300 text-xs">{thing}</td>
                <td className="px-4 py-3 text-neutral-400 text-xs">{convention}</td>
                <td className="px-4 py-3"><code className="text-white text-xs">{example}</code></td>
              </tr>
            ))}
          </tbody>
        </table>
      </Section>

      <Section title="lib/ and types/">
        <p className="text-neutral-400 text-sm mb-4">Keep these lean. If a helper is only used in one component, co-locate it in that file. Only promote to <code className="text-white">lib/</code> when it's genuinely shared.</p>
        <Code>{`// src/lib/utils.ts — the only thing that must always be here
import { clsx, type ClassValue } from "clsx";
import { twMerge } from "tailwind-merge";

export function cn(...inputs: ClassValue[]) {
  return twMerge(clsx(inputs));
}`}</Code>
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

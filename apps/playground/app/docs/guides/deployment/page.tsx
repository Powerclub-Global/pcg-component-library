export const metadata = { title: "Deployment — PCG Best Practices" };

export default function DeploymentPage() {
  return (
    <div className="px-10 py-14 max-w-3xl">
      <div className="mb-2 text-xs font-semibold uppercase tracking-wider text-neutral-500">Best Practices</div>
      <h1 className="text-5xl font-bold tracking-tight">Deployment</h1>
      <p className="mt-4 text-lg text-neutral-400">
        Standard deploy pipeline for all PCG web projects. Vercel for Next.js sites, committed
        config, zero manual steps after initial setup.
      </p>

      <Section title="Platform decision">
        <table className="w-full text-sm rounded-xl border border-neutral-800 overflow-hidden">
          <thead className="text-xs uppercase tracking-wider text-neutral-500">
            <tr className="border-b border-neutral-800">
              <th className="px-4 py-3 text-left font-medium">Project type</th>
              <th className="px-4 py-3 text-left font-medium">Platform</th>
              <th className="px-4 py-3 text-left font-medium">Notes</th>
            </tr>
          </thead>
          <tbody className="divide-y divide-neutral-800/60">
            {[
              ["Next.js marketing site", "Vercel", "Default. Zero config needed."],
              ["Next.js with heavy API routes", "Vercel", "Check function timeout limits (30s Hobby, 300s Pro)."],
              ["Full-stack (Rust backend)", "Docker on VPS / Render", "See pcg-cc-mcp deploy docs."],
              ["Static export", "Vercel or Cloudflare Pages", "output: 'export' in next.config.ts"],
            ].map(([type, platform, notes]) => (
              <tr key={type}>
                <td className="px-4 py-3 text-neutral-300 text-xs">{type}</td>
                <td className="px-4 py-3 text-white text-xs font-medium">{platform}</td>
                <td className="px-4 py-3 text-neutral-400 text-xs">{notes}</td>
              </tr>
            ))}
          </tbody>
        </table>
      </Section>

      <Section title="vercel.json">
        <p className="text-neutral-400 text-sm mb-4">
          Commit this file. It makes deploys reproducible and documents redirects/headers in the repo.
        </p>
        <Code>{`// vercel.json
{
  "framework": "nextjs",
  "buildCommand": "pnpm build",
  "installCommand": "pnpm install",
  "redirects": [
    { "source": "/home", "destination": "/", "permanent": true },
    { "source": "/old-service", "destination": "/services", "permanent": true }
  ],
  "headers": [
    {
      "source": "/(.*)",
      "headers": [
        { "key": "X-Content-Type-Options", "value": "nosniff" },
        { "key": "X-Frame-Options", "value": "SAMEORIGIN" },
        { "key": "Referrer-Policy", "value": "strict-origin-when-cross-origin" }
      ]
    },
    {
      "source": "/fonts/(.*)",
      "headers": [
        { "key": "Cache-Control", "value": "public, max-age=31536000, immutable" }
      ]
    }
  ]
}`}</Code>
      </Section>

      <Section title="Environment variables">
        <p className="text-neutral-400 text-sm mb-4">
          Set vars in the Vercel dashboard, not in config files. Commit a <code className="text-white">.env.example</code> with every key listed (values redacted) so the next dev knows what to set.
        </p>
        <Code>{`# .env.example — COMMIT THIS (redacted values)
# .env.local  — NEVER COMMIT (real values)

NEXT_PUBLIC_SITE_URL=https://www.myclient.com
NEXT_PUBLIC_GA_ID=

# Email
SMTP_HOST=
SMTP_PORT=587
SMTP_USER=
SMTP_PASS=

# CMS (if used)
CMS_API_URL=
CMS_API_TOKEN=`}</Code>
        <ul className="mt-4 space-y-2 text-sm text-neutral-400">
          <li><span className="text-white font-medium">NEXT_PUBLIC_</span> prefix = exposed to the browser. Never put secrets here.</li>
          <li>Set <code className="text-white">NEXT_PUBLIC_SITE_URL</code> in Vercel env vars — used by <code className="text-white">metadataBase</code> and sitemap.</li>
          <li>Add the same vars to Vercel's Preview and Development environments, not just Production.</li>
        </ul>
      </Section>

      <Section title="Custom domain setup">
        <ol className="space-y-3 text-sm text-neutral-400 list-none">
          {[
            ["1", "Add domain in Vercel → Project → Settings → Domains"],
            ["2", "Add DNS records at registrar: A record → 76.76.21.21, CNAME www → cname.vercel-dns.com"],
            ["3", "Wait for SSL (usually < 2 min on Vercel)"],
            ["4", "Set www as primary and add naked domain redirect (or vice versa — be consistent)"],
            ["5", "Verify in Google Search Console and update sitemap URL"],
          ].map(([n, step]) => (
            <li key={n} className="flex gap-3">
              <span className="inline-flex h-6 w-6 shrink-0 items-center justify-center rounded-full border border-neutral-700 text-white text-xs font-bold">{n}</span>
              <span>{step}</span>
            </li>
          ))}
        </ol>
      </Section>

      <Section title="Deploy process">
        <p className="text-neutral-400 text-sm mb-4">
          The standard flow after initial Vercel connection:
        </p>
        <Code>{`# Every deploy = a PR
git checkout -b feat/add-services-page
# ... make changes ...
git push origin feat/add-services-page
# Open PR → Vercel creates a Preview URL automatically
# Share Preview URL with client for review
# Merge PR → auto-deploys to Production`}</Code>
        <p className="mt-4 text-neutral-400 text-sm">
          Never push directly to <code className="text-white">main</code> for client projects. The PR Preview URL is how the client signs off before it goes live.
        </p>
      </Section>

      <Section title="Post-launch checklist">
        <ul className="space-y-2 text-sm">
          {[
            "Custom domain resolving with HTTPS",
            "www → naked redirect (or vice versa) consistent",
            "All environment variables set in Vercel Production",
            "Google Analytics / GA4 firing on production domain",
            "Google Search Console verified and sitemap submitted",
            "Test contact form / any transactional email on live domain",
            "Run Lighthouse one final time on production URL",
            "Share production URL + Search Console access with client",
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

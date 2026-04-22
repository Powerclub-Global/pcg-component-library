export const metadata = {
  title: "Installation — PCG UI Docs",
};

export default function InstallationPage() {
  return (
    <div className="px-10 py-14 max-w-3xl">
      <h1 className="text-5xl font-bold tracking-tight">Installation</h1>
      <p className="mt-4 text-lg text-neutral-400">
        Wire <span className="text-white">@powerclub-global/ui</span> and{" "}
        <span className="text-white">@powerclub-global/tokens</span> into any Next.js 15+ /
        Tailwind v4 repo. ~5 minutes.
      </p>

      <div className="mt-8 rounded-xl border border-neutral-800 p-4 text-sm text-neutral-400">
        Published privately to GitHub Packages under the{" "}
        <code className="text-white">@powerclub-global</code> scope. Consumers need a GitHub PAT
        with the <code className="text-white">read:packages</code> permission.
      </div>

      <Step n={1} title="Configure .npmrc for the scope">
        <p className="mb-3 text-neutral-400">
          In the consumer repo root, add a <code className="text-white">.npmrc</code> telling pnpm
          where to find the scope:
        </p>
        <Code>{`@powerclub-global:registry=https://npm.pkg.github.com
//npm.pkg.github.com/:_authToken=\${GITHUB_TOKEN}
always-auth=true`}</Code>
        <p className="mt-3 text-neutral-400">
          Commit this file. Locally, export{" "}
          <code className="text-white">GITHUB_TOKEN</code> in your shell. In CI/Vercel, set it as
          an env var — the PAT needs <code className="text-white">read:packages</code>.
        </p>
      </Step>

      <Step n={2} title="Install the packages">
        <Code>{`pnpm add @powerclub-global/ui @powerclub-global/tokens`}</Code>
        <p className="mt-3 text-neutral-400">
          Peer deps the library expects (install if not already present):
        </p>
        <Code>{`pnpm add @radix-ui/react-slot class-variance-authority clsx tailwind-merge`}</Code>
      </Step>

      <Step n={3} title="Enable transpilePackages in Next.js">
        <p className="mb-3 text-neutral-400">
          In <code className="text-white">next.config.ts</code>:
        </p>
        <Code>{`import type { NextConfig } from "next";

const nextConfig: NextConfig = {
  transpilePackages: ["@powerclub-global/ui", "@powerclub-global/tokens"],
};

export default nextConfig;`}</Code>
      </Step>

      <Step n={4} title="Wire tokens in globals.css">
        <Code>{`@import "tailwindcss";
@import "@powerclub-global/tokens/css/base.css";

/* Tailwind v4 doesn't scan node_modules by default */
@source "../../node_modules/@powerclub-global/ui";`}</Code>
      </Step>

      <Step n={5} title="Pick a brand theme">
        <p className="mb-3 text-neutral-400">
          19 themes ship in{" "}
          <code className="text-white">@powerclub-global/tokens/css/themes</code>. Import the one
          for this repo:
        </p>
        <Code>{`@import "@powerclub-global/tokens/css/themes/true-lux.css";`}</Code>
        <p className="mt-3 text-neutral-400">
          Themes override <code className="text-white">--color-primary</code>,{" "}
          <code className="text-white">--color-accent</code>,{" "}
          <code className="text-white">--font-display</code>, and radii. Or roll your own by
          setting the custom properties inline.
        </p>
      </Step>

      <Step n={6} title="Use it">
        <Code>{`import { Button, HeroSection, FAQSection } from "@powerclub-global/ui";

export default function Page() {
  return (
    <>
      <HeroSection
        headline="Build something real"
        ctaPrimary={{ label: "Get started", href: "/signup" }}
      />
      <Button variant="default" size="lg">
        Click me
      </Button>
    </>
  );
}`}</Code>
      </Step>

      <section className="mt-16">
        <h2 className="text-2xl font-bold mb-3">Local development (alternative)</h2>
        <p className="text-neutral-400 mb-4">
          For active library development, skip the registry and reference the source directly via{" "}
          <code className="text-white">file:</code>:
        </p>
        <Code>{`{
  "dependencies": {
    "@powerclub-global/tokens": "file:../../pcg-component-library/packages/pcg-tokens",
    "@powerclub-global/ui": "file:../../pcg-component-library/packages/pcg-ui"
  },
  "pnpm": {
    "overrides": {
      "@powerclub-global/tokens": "file:../../pcg-component-library/packages/pcg-tokens"
    }
  }
}`}</Code>
        <p className="mt-3 text-neutral-400 text-sm">
          Requires the <code className="text-white">pcg-component-library</code> repo to sit next
          to the consumer repo on disk. Not suitable for CI/deploy.
        </p>
      </section>

      <section className="mt-16">
        <h2 className="text-2xl font-bold mb-3">Troubleshooting</h2>
        <div className="rounded-xl border border-neutral-800 overflow-hidden">
          <table className="w-full text-sm">
            <thead className="text-xs uppercase tracking-wider text-neutral-500">
              <tr className="border-b border-neutral-800">
                <th className="px-4 py-3 text-left font-medium">Symptom</th>
                <th className="px-4 py-3 text-left font-medium">Fix</th>
              </tr>
            </thead>
            <tbody className="divide-y divide-neutral-800/60">
              <tr>
                <td className="px-4 py-3 text-neutral-300">
                  <code className="text-white">401 Unauthorized</code> on install
                </td>
                <td className="px-4 py-3 text-neutral-400">
                  <code className="text-white">GITHUB_TOKEN</code> missing or lacks{" "}
                  <code className="text-white">read:packages</code>. Regenerate PAT, export in
                  shell, retry.
                </td>
              </tr>
              <tr>
                <td className="px-4 py-3 text-neutral-300">
                  <code className="text-white">404 Not Found</code> on install
                </td>
                <td className="px-4 py-3 text-neutral-400">
                  Package not published yet. Check Actions tab — wait for the next tagged
                  release, or run the <code className="text-white">Publish</code> workflow
                  manually.
                </td>
              </tr>
              <tr>
                <td className="px-4 py-3 text-neutral-300">Classes missing at runtime</td>
                <td className="px-4 py-3 text-neutral-400">
                  Add the <code className="text-white">@source</code> directive. Tailwind v4
                  doesn&apos;t scan node_modules.
                </td>
              </tr>
              <tr>
                <td className="px-4 py-3 text-neutral-300">Theme colors don&apos;t apply</td>
                <td className="px-4 py-3 text-neutral-400">
                  Brand theme must be imported <em>after</em> the base tokens.
                </td>
              </tr>
            </tbody>
          </table>
        </div>
      </section>
    </div>
  );
}

function Step({
  n,
  title,
  children,
}: {
  n: number;
  title: string;
  children: React.ReactNode;
}) {
  return (
    <section className="mt-12">
      <div className="flex items-center gap-3 mb-4">
        <span className="inline-flex h-7 w-7 items-center justify-center rounded-full border border-neutral-700 text-white text-sm font-bold">
          {n}
        </span>
        <h2 className="text-2xl font-bold">{title}</h2>
      </div>
      {children}
    </section>
  );
}

function Code({ children }: { children: string }) {
  return (
    <pre className="rounded-xl border border-neutral-800 px-4 py-3 text-sm font-mono text-neutral-200 overflow-x-auto">
      <code>{children}</code>
    </pre>
  );
}

export const metadata = { title: "Project Setup — PCG Best Practices" };

export default function ProjectSetupPage() {
  return (
    <div className="px-10 py-14 max-w-3xl">
      <div className="mb-2 text-xs font-semibold uppercase tracking-wider text-neutral-500">Best Practices</div>
      <h1 className="text-5xl font-bold tracking-tight">Project Setup</h1>
      <p className="mt-4 text-lg text-neutral-400">
        How to scaffold a new PCG web project from scratch — the opinionated stack every new site starts on.
      </p>

      <Section title="Stack">
        <Grid>
          <Cell label="Framework" value="Next.js 15 (App Router)" />
          <Cell label="Styling" value="Tailwind CSS v4" />
          <Cell label="Components" value="@pcg/ui + @pcg/tokens" />
          <Cell label="Language" value="TypeScript strict" />
          <Cell label="Package manager" value="pnpm" />
          <Cell label="Deploy target" value="Vercel" />
        </Grid>
        <p className="mt-4 text-sm text-neutral-500">
          Don't deviate from this unless there's a hard client requirement. Consistency across repos is the point.
        </p>
      </Section>

      <Section title="Quickstart from the starter">
        <p className="mb-3 text-neutral-400">The fastest path is to copy <code className="text-white">apps/starter</code> from this monorepo:</p>
        <Code>{`# From the pcg-component-library root
cp -r apps/starter ../my-new-site
cd ../my-new-site
pnpm install
pnpm dev`}</Code>
        <p className="mt-4 text-neutral-400">Then swap in the brand theme (see <a href="/docs/guides/theming" className="text-white underline underline-offset-2">Theming guide</a>).</p>
      </Section>

      <Section title="From scratch">
        <Step n={1} title="Init Next.js">
          <Code>{`pnpm create next-app@latest my-site \\
  --typescript \\
  --tailwind \\
  --app \\
  --src-dir \\
  --import-alias "@/*"
cd my-site`}</Code>
        </Step>
        <Step n={2} title="Add @pcg packages">
          <p className="mb-3 text-neutral-400">If consuming from the monorepo via file path:</p>
          <Code>{`# package.json
{
  "dependencies": {
    "@pcg/ui": "file:../../pcg-component-library/packages/pcg-ui",
    "@pcg/tokens": "file:../../pcg-component-library/packages/pcg-tokens"
  }
}
pnpm install`}</Code>
          <p className="mt-4 mb-3 text-neutral-400">Peer deps:</p>
          <Code>{`pnpm add @radix-ui/react-slot class-variance-authority clsx tailwind-merge`}</Code>
        </Step>
        <Step n={3} title="Configure Next.js">
          <Code>{`// next.config.ts
import type { NextConfig } from "next";

const nextConfig: NextConfig = {
  transpilePackages: ["@pcg/ui", "@pcg/tokens"],
};

export default nextConfig;`}</Code>
        </Step>
        <Step n={4} title="Wire tokens into globals.css">
          <Code>{`/* src/app/globals.css */
@import "tailwindcss";
@import "@pcg/tokens/css/base.css";
@import "@pcg/tokens/css/themes/my-brand.css";  /* pick one */

/* Tailwind must scan the library's classes */
@source "../../node_modules/@pcg/ui";`}</Code>
        </Step>
        <Step n={5} title="Set up tsconfig paths">
          <p className="mb-3 text-neutral-400">Strict mode is required:</p>
          <Code>{`{
  "compilerOptions": {
    "strict": true,
    "target": "ES2017",
    "lib": ["dom", "dom.iterable", "esnext"],
    "paths": { "@/*": ["./src/*"] }
  }
}`}</Code>
        </Step>
      </Section>

      <Section title="Required config files">
        <table className="w-full text-sm rounded-xl border border-neutral-800 overflow-hidden">
          <thead className="text-xs uppercase tracking-wider text-neutral-500">
            <tr className="border-b border-neutral-800">
              <th className="px-4 py-3 text-left font-medium">File</th>
              <th className="px-4 py-3 text-left font-medium">Notes</th>
            </tr>
          </thead>
          <tbody className="divide-y divide-neutral-800/60">
            {[
              [".env.local", "Never commit. List all vars in .env.example instead."],
              [".env.example", "Commit this. Redacted values (KEY=). Documents what ops needs to set."],
              [".gitignore", "Include .env*, .next/, node_modules/, *.tsbuildinfo"],
              ["vercel.json", "Commit deploy config. See Deployment guide."],
              ["next.config.ts", "transpilePackages, redirects, headers"],
            ].map(([f, note]) => (
              <tr key={f}>
                <td className="px-4 py-3"><code className="text-white text-xs">{f}</code></td>
                <td className="px-4 py-3 text-neutral-400 text-xs">{note}</td>
              </tr>
            ))}
          </tbody>
        </table>
      </Section>

      <Section title="Git hygiene">
        <ul className="space-y-2 text-neutral-400 text-sm">
          <li><span className="text-white font-medium">Never commit .env files.</span> If it happens, rotate the credentials immediately — git history is public forever.</li>
          <li><span className="text-white font-medium">main = production.</span> Branch off main, PR back to main. No long-lived feature branches.</li>
          <li><span className="text-white font-medium">Commit messages:</span> <code className="text-white">feat:</code>, <code className="text-white">fix:</code>, <code className="text-white">style:</code>, <code className="text-white">chore:</code> prefixes.</li>
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

function Step({ n, title, children }: { n: number; title: string; children: React.ReactNode }) {
  return (
    <div className="mt-8">
      <div className="flex items-center gap-3 mb-3">
        <span className="inline-flex h-7 w-7 items-center justify-center rounded-full border border-neutral-700 text-white text-sm font-bold">{n}</span>
        <h3 className="text-lg font-semibold">{title}</h3>
      </div>
      {children}
    </div>
  );
}

function Grid({ children }: { children: React.ReactNode }) {
  return <div className="grid grid-cols-2 gap-3">{children}</div>;
}

function Cell({ label, value }: { label: string; value: string }) {
  return (
    <div className="rounded-xl border border-neutral-800 px-4 py-3">
      <div className="text-xs text-neutral-500 uppercase tracking-wider mb-1">{label}</div>
      <div className="text-white text-sm font-medium">{value}</div>
    </div>
  );
}

function Code({ children }: { children: string }) {
  return (
    <pre className="rounded-xl border border-neutral-800 px-4 py-3 text-sm font-mono text-neutral-200 overflow-x-auto leading-relaxed">
      <code>{children}</code>
    </pre>
  );
}

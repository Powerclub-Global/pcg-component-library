export const metadata = { title: "Theming & Tokens — PCG Best Practices" };

export default function ThemingPage() {
  return (
    <div className="px-10 py-14 max-w-3xl">
      <div className="mb-2 text-xs font-semibold uppercase tracking-wider text-neutral-500">Best Practices</div>
      <h1 className="text-5xl font-bold tracking-tight">Theming & Tokens</h1>
      <p className="mt-4 text-lg text-neutral-400">
        How the CSS custom property system works, how to pick a brand theme, and how to create a new one.
      </p>

      <Section title="How it works">
        <p className="text-neutral-400 text-sm mb-4">
          Every <code className="text-white">@pcg/ui</code> component uses CSS custom properties instead of hardcoded colors.
          Swapping a brand is a one-file import — no component changes needed.
        </p>
        <Code>{`/* The only two lines that determine a site's brand */
@import "@pcg/tokens/css/base.css";        /* global defaults */
@import "@pcg/tokens/css/themes/okb.css";  /* brand override */`}</Code>
        <p className="mt-4 text-neutral-400 text-sm">The theme file just overrides a handful of CSS variables:</p>
        <Code>{`/* packages/pcg-tokens/css/themes/okb.css */
:root {
  --color-primary: #0f172a;
  --color-accent: #B4914C;           /* OKB gold */
  --color-accent-foreground: #ffffff;
  --font-display: 'Playfair Display', serif;
}`}</Code>
      </Section>

      <Section title="Available tokens">
        <table className="w-full text-sm rounded-xl border border-neutral-800 overflow-hidden">
          <thead className="text-xs uppercase tracking-wider text-neutral-500">
            <tr className="border-b border-neutral-800">
              <th className="px-4 py-3 text-left font-medium">Variable</th>
              <th className="px-4 py-3 text-left font-medium">Purpose</th>
              <th className="px-4 py-3 text-left font-medium">Default</th>
            </tr>
          </thead>
          <tbody className="divide-y divide-neutral-800/60">
            {[
              ["--color-primary", "Primary surfaces and text", "#0f172a"],
              ["--color-accent", "CTAs, links, highlights", "#ae904c"],
              ["--color-accent-foreground", "Text on accent backgrounds", "#ffffff"],
              ["--color-background", "Page background", "#ffffff"],
              ["--color-foreground", "Body text", "#0f172a"],
              ["--color-card", "Card surface", "#ffffff"],
              ["--color-border", "Dividers and outlines", "#E2E8F0"],
              ["--color-muted", "Subtle backgrounds", "#F1F5F9"],
              ["--color-muted-foreground", "Secondary text", "#64748B"],
              ["--font-display", "Heading font family", "'Inter', system-ui"],
              ["--radius", "Default border radius", "12px"],
            ].map(([v, purpose, def]) => (
              <tr key={v}>
                <td className="px-4 py-3"><code className="text-white text-xs">{v}</code></td>
                <td className="px-4 py-3 text-neutral-400 text-xs">{purpose}</td>
                <td className="px-4 py-3"><code className="text-neutral-500 text-xs">{def}</code></td>
              </tr>
            ))}
          </tbody>
        </table>
      </Section>

      <Section title="Available themes">
        <div className="grid grid-cols-3 gap-2">
          {[
            "powerclub-global", "willrise", "cable-com", "skywalkerswings",
            "alchemy-water", "resonance", "prime-hospitality", "okb", "okb-ventures",
            "true-lux", "youseffs-yachts", "bgsc", "sirak-studios", "moonshine",
            "brg", "springcreekvillage", "fineartsociety", "jungleverse", "omega-wireless",
          ].map((t) => (
            <div key={t} className="rounded-lg border border-neutral-800 px-3 py-2">
              <code className="text-white text-xs">{t}</code>
            </div>
          ))}
        </div>
        <p className="mt-3 text-neutral-500 text-xs">All themes are at <code className="text-neutral-400">@pcg/tokens/css/themes/&lt;name&gt;.css</code></p>
      </Section>

      <Section title="Creating a new theme">
        <p className="text-neutral-400 text-sm mb-4">
          Create a file in <code className="text-white">packages/pcg-tokens/css/themes/</code>. You only need to override what changes from the defaults.
        </p>
        <Code>{`/* packages/pcg-tokens/css/themes/my-client.css */
:root {
  --color-primary: #1a1a2e;
  --color-primary-foreground: #ffffff;
  --color-accent: #e94560;
  --color-accent-foreground: #ffffff;
  --font-display: 'Bebas Neue', sans-serif;
  --radius: 4px;   /* sharper corners for this brand */
}`}</Code>
        <p className="mt-4 text-neutral-400 text-sm">Then add it to the theme list in <code className="text-white">packages/pcg-tokens/index.ts</code> and submit a PR.</p>
      </Section>

      <Section title="Dark mode">
        <p className="text-neutral-400 text-sm mb-4">
          Override surface tokens inside a <code className="text-white">.dark</code> class or <code className="text-white">[data-theme="dark"]</code>. The base token file already defines sensible dark defaults — you can extend them per-brand:
        </p>
        <Code>{`.dark, [data-theme="dark"] {
  --color-background: #0a0a0f;
  --color-foreground: #f8fafc;
  --color-card: #1a1a22;
  --color-border: #2a2a35;
  --color-muted: #16161d;
}`}</Code>
        <p className="mt-4 text-neutral-400 text-sm">
          Toggle by adding/removing the <code className="text-white">dark</code> class on <code className="text-white">&lt;html&gt;</code>. <code className="text-white">prefers-color-scheme</code> is handled automatically if no explicit class is set.
        </p>
      </Section>

      <Section title="Using tokens in custom components">
        <p className="text-neutral-400 text-sm mb-4">Always reference tokens, never hardcode hex values in component code:</p>
        <Code>{`/* Do this */
.my-component {
  background: var(--color-card);
  border-color: var(--color-border);
  color: var(--color-foreground);
}

/* Not this */
.my-component {
  background: #ffffff;
  border-color: #E2E8F0;
  color: #0f172a;
}`}</Code>
        <p className="mt-4 text-neutral-400 text-sm">In Tailwind v4, the tokens are mapped to utilities automatically via the <code className="text-white">@theme</code> block in <code className="text-white">@pcg/tokens/css/tailwind-theme.css</code>.</p>
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

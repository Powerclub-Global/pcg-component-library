import Link from "next/link";
import { TopNav } from "@/components/top-nav";
import { componentRegistry } from "@/configs/registry";

export default function HomePage() {
  return (
    <div className="min-h-screen bg-neutral-950 text-white overflow-hidden">
      <TopNav />

      <div className="relative">
        <div className="pointer-events-none absolute inset-0 -z-10">
          <div className="absolute left-1/2 top-32 h-[600px] w-[1200px] -translate-x-1/2 rounded-full bg-violet-600/20 blur-[160px]" />
          <div className="absolute bottom-0 left-1/3 h-[400px] w-[800px] rounded-full bg-fuchsia-600/20 blur-[140px]" />
        </div>

        <div className="mx-auto max-w-7xl px-8 pt-24 pb-32 grid grid-cols-1 lg:grid-cols-2 gap-16 items-center">
          <div>
            <div className="inline-flex items-center gap-2 rounded-md border border-violet-500/30 bg-violet-500/10 px-3 py-1 text-[11px] font-semibold uppercase tracking-wider text-violet-300">
              <span className="rounded bg-violet-500 px-1.5 py-0.5 text-[10px] text-white">
                New
              </span>
              {componentRegistry.length} Components Live
            </div>

            <h1 className="mt-6 text-6xl font-bold leading-[1.05] tracking-tight sm:text-7xl">
              React components
              <br />
              for <span className="bg-gradient-to-r from-violet-400 to-fuchsia-400 bg-clip-text text-transparent">PowerClub Global</span>
            </h1>

            <p className="mt-6 max-w-lg text-lg text-neutral-400">
              Highly customizable UI primitives, layout pieces, and landing blocks that drop into
              any @pcg repo — themed per brand, shared by design.
            </p>

            <div className="mt-10 flex items-center gap-3">
              <Link
                href="/docs"
                className="inline-flex items-center gap-2 rounded-lg bg-gradient-to-br from-violet-500 to-fuchsia-500 px-6 py-3 text-sm font-semibold text-white shadow-[0_0_40px_rgba(168,85,247,0.3)] transition-all hover:shadow-[0_0_50px_rgba(168,85,247,0.5)]"
              >
                Browse Components →
              </Link>
              <a
                href="https://github.com/Powerclub-Global/pcg-design-system"
                target="_blank"
                rel="noreferrer"
                className="inline-flex items-center gap-2 rounded-lg border border-neutral-800 bg-neutral-900/60 px-6 py-3 text-sm font-semibold text-neutral-300 transition-colors hover:border-neutral-700 hover:text-white"
              >
                GitHub
              </a>
            </div>
          </div>

          <div className="relative">
            <div className="absolute -inset-4 rounded-2xl bg-gradient-to-br from-violet-500/30 to-fuchsia-500/30 blur-2xl" />
            <div className="relative rounded-xl border border-neutral-800 bg-neutral-950/90 shadow-2xl backdrop-blur-xl">
              <div className="flex items-center gap-2 border-b border-neutral-800 px-4 py-3">
                <span className="h-3 w-3 rounded-full bg-neutral-800" />
                <span className="h-3 w-3 rounded-full bg-neutral-800" />
                <span className="h-3 w-3 rounded-full bg-neutral-800" />
                <span className="ml-auto text-xs text-neutral-500">HeroSection.tsx</span>
              </div>
              <pre className="overflow-x-auto p-6 text-sm font-mono leading-relaxed">
                <code>
                  <span className="text-neutral-500">import</span>{" "}
                  <span className="text-white">{"{ "}</span>
                  <span className="text-violet-300">HeroSection</span>
                  <span className="text-white">{" }"}</span>{" "}
                  <span className="text-neutral-500">from</span>{" "}
                  <span className="text-emerald-300">&apos;@pcg/ui&apos;</span>
                  <span className="text-neutral-500">;</span>
                  {"\n\n"}
                  <span className="text-neutral-500">function</span>{" "}
                  <span className="text-yellow-300">Page</span>
                  <span className="text-white">() {"{"}</span>
                  {"\n  "}
                  <span className="text-neutral-500">return</span> (
                  {"\n    "}
                  <span className="text-white">{"<"}</span>
                  <span className="text-violet-300">HeroSection</span>
                  {"\n      "}
                  <span className="text-fuchsia-300">variant</span>=
                  <span className="text-emerald-300">&quot;split&quot;</span>
                  {"\n      "}
                  <span className="text-fuchsia-300">headline</span>=
                  <span className="text-emerald-300">&quot;Ship faster&quot;</span>
                  {"\n      "}
                  <span className="text-fuchsia-300">accent</span>=
                  <span className="text-emerald-300">&quot;#A855F7&quot;</span>
                  {"\n    "}
                  <span className="text-white">{"/>"}</span>
                  {"\n  )"}
                  {"\n"}
                  <span className="text-white">{"}"}</span>
                </code>
              </pre>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}

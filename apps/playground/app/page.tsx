import Link from "next/link";
import { TopNav } from "@/components/top-nav";
import { componentRegistry } from "@/configs/registry";

export default function HomePage() {
  return (
    <div className="min-h-screen bg-black text-white overflow-hidden">
      <TopNav />

      <div className="relative">
        <div className="mx-auto max-w-7xl px-8 pt-24 pb-32 grid grid-cols-1 lg:grid-cols-2 gap-16 items-center">
          <div>
            <div className="inline-flex items-center gap-2 rounded-md border border-neutral-800 px-3 py-1 text-[11px] font-semibold uppercase tracking-wider text-neutral-300">
              <span className="rounded bg-white px-1.5 py-0.5 text-[10px] text-black">
                New
              </span>
              {componentRegistry.length} Components Live
            </div>

            <h1 className="mt-6 text-6xl font-bold leading-[1.05] tracking-tight sm:text-7xl">
              React components
              <br />
              for <span className="text-white">PowerClub Global</span>
            </h1>

            <p className="mt-6 max-w-lg text-lg text-neutral-400">
              Highly customizable UI primitives, layout pieces, and landing blocks that drop into
              any @pcg repo — themed per brand, shared by design.
            </p>

            <div className="mt-10 flex items-center gap-3">
              <Link
                href="/docs"
                className="inline-flex items-center gap-2 rounded-lg bg-white px-6 py-3 text-sm font-semibold text-black transition-all hover:bg-neutral-200"
              >
                Browse Components →
              </Link>
              <a
                href="https://github.com/Powerclub-Global/pcg-component-library"
                target="_blank"
                rel="noreferrer"
                className="inline-flex items-center gap-2 rounded-lg border border-neutral-800 px-6 py-3 text-sm font-semibold text-neutral-300 transition-colors hover:border-neutral-600 hover:text-white"
              >
                GitHub
              </a>
            </div>
          </div>

          <div className="relative">
            <div className="relative rounded-xl border border-neutral-800 bg-black shadow-2xl">
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
                  <span className="text-white font-semibold">HeroSection</span>
                  <span className="text-white">{" }"}</span>{" "}
                  <span className="text-neutral-500">from</span>{" "}
                  <span className="text-neutral-400">&apos;@pcg/ui&apos;</span>
                  <span className="text-neutral-500">;</span>
                  {"\n\n"}
                  <span className="text-neutral-500">function</span>{" "}
                  <span className="text-white">Page</span>
                  <span className="text-white">() {"{"}</span>
                  {"\n  "}
                  <span className="text-neutral-500">return</span> (
                  {"\n    "}
                  <span className="text-white">{"<"}</span>
                  <span className="text-white font-semibold">HeroSection</span>
                  {"\n      "}
                  <span className="text-neutral-300">variant</span>=
                  <span className="text-neutral-400">&quot;split&quot;</span>
                  {"\n      "}
                  <span className="text-neutral-300">headline</span>=
                  <span className="text-neutral-400">&quot;Ship faster&quot;</span>
                  {"\n      "}
                  <span className="text-neutral-300">accent</span>=
                  <span className="text-neutral-400">&quot;#FFFFFF&quot;</span>
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

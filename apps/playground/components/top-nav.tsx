import Link from "next/link";

export function TopNav() {
  return (
    <header className="sticky top-0 z-40 border-b border-neutral-800/60 bg-neutral-950/80 backdrop-blur-xl">
      <div className="flex h-14 items-center justify-between px-6">
        <div className="flex items-center gap-6">
          <Link href="/" className="flex items-center gap-2 text-sm font-semibold text-white">
            <span className="inline-flex h-7 w-7 items-center justify-center rounded-md bg-white text-black text-xs">
              ◈
            </span>
            <span>PCG UI</span>
          </Link>
          <span className="text-neutral-700">/</span>
          <nav className="flex items-center gap-1 text-xs font-semibold uppercase tracking-wider">
            <Link
              href="/docs"
              className="rounded-md border border-neutral-800 px-3 py-1.5 text-white hover:border-neutral-700 transition-colors"
            >
              Docs
            </Link>
          </nav>
        </div>
        <div className="flex items-center gap-3">
          <a
            href="https://github.com/Powerclub-Global/pcg-design-system"
            target="_blank"
            rel="noreferrer"
            className="rounded-md border border-neutral-800 px-3 py-1.5 text-xs text-neutral-400 hover:border-neutral-600 hover:text-white transition-colors"
          >
            GitHub
          </a>
        </div>
      </div>
    </header>
  );
}

import Link from "next/link";
import { componentRegistry } from "@/configs/registry";

export default function DocsIndex() {
  const first = componentRegistry[0];
  return (
    <div className="px-10 py-14">
      <h1 className="text-4xl font-bold tracking-tight">Docs</h1>
      <p className="mt-3 max-w-2xl text-neutral-400">
        Interactive component explorer for <span className="text-white">@pcg/ui</span>. Pick a
        component from the sidebar, tweak props, copy the JSX.
      </p>
      <div className="mt-6 flex items-center gap-3 text-sm text-neutral-500">
        <span>{componentRegistry.length} components</span>
      </div>
      {first && (
        <Link
          href={`/docs/${first.slug}`}
          className="mt-8 inline-flex items-center gap-2 rounded-lg bg-white px-5 py-2.5 text-sm font-semibold text-black transition-colors hover:bg-neutral-200"
        >
          Start with {first.name} →
        </Link>
      )}
    </div>
  );
}

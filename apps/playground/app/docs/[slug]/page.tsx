import { notFound } from "next/navigation";
import { readFile } from "node:fs/promises";
import path from "node:path";
import { codeToHtml } from "shiki";
import { componentRegistry, getConfig } from "@/configs/registry";
import { PlaygroundClient } from "./client";

export function generateStaticParams() {
  return componentRegistry.map((c) => ({ slug: c.slug }));
}

export function generateMetadata({ params }: { params: Promise<{ slug: string }> }) {
  return params.then(({ slug }) => {
    const config = getConfig(slug);
    return {
      title: config ? `${config.name} — PCG UI Docs` : "Not Found",
    };
  });
}

async function loadSource(sourcePath: string) {
  const abs = path.join(process.cwd(), "..", "..", sourcePath);
  const raw = await readFile(abs, "utf8");
  const highlighted = await codeToHtml(raw, {
    lang: "tsx",
    theme: "github-dark-default",
  });
  return { raw, highlighted };
}

export default async function DocsComponentPage({
  params,
}: {
  params: Promise<{ slug: string }>;
}) {
  const { slug } = await params;
  const config = getConfig(slug);
  if (!config) notFound();

  const { raw, highlighted } = await loadSource(config.sourcePath);

  return (
    <PlaygroundClient
      config={config}
      rawSource={raw}
      highlightedSource={highlighted}
    />
  );
}

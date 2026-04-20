import { redirect } from "next/navigation";

export default async function LegacyRedirect({
  params,
}: {
  params: Promise<{ slug: string }>;
}) {
  const { slug } = await params;
  redirect(`/docs/${slug}`);
}

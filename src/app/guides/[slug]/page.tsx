import type { Metadata } from "next";
import { notFound } from "next/navigation";
import { DocPage } from "@/components/doc-page";
import { guidePath, loadMeta, loadPage } from "@/lib/content";
import { GUIDE_SLUGS } from "@/lib/site";

export const dynamicParams = false;

export function generateStaticParams() {
  return GUIDE_SLUGS.map((slug) => ({ slug }));
}

export async function generateMetadata(props: PageProps<"/guides/[slug]">): Promise<Metadata> {
  const { slug } = await props.params;
  const meta = loadMeta(guidePath(slug));
  return { title: meta.title };
}

export default async function GuidePage(props: PageProps<"/guides/[slug]">) {
  const { slug } = await props.params;
  if (!(GUIDE_SLUGS as readonly string[]).includes(slug)) notFound();

  const page = await loadPage(guidePath(slug));
  return (
    <DocPage page={page} />
  );
}

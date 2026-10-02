import type { Metadata } from "next";
import { notFound } from "next/navigation";
import { DocPage } from "@/components/doc-page";
import { loadMeta, loadPage, resourcePath } from "@/lib/content";
import { RESOURCE_SLUGS } from "@/lib/site";

export const dynamicParams = false;

export function generateStaticParams() {
  return RESOURCE_SLUGS.map((slug) => ({ slug }));
}

export async function generateMetadata(props: PageProps<"/resources/[slug]">): Promise<Metadata> {
  const { slug } = await props.params;
  const meta = loadMeta(resourcePath(slug));
  return { title: meta.title };
}

export default async function ResourcePage(props: PageProps<"/resources/[slug]">) {
  const { slug } = await props.params;
  if (!(RESOURCE_SLUGS as readonly string[]).includes(slug)) notFound();

  const page = await loadPage(resourcePath(slug));
  return (
    <DocPage page={page} />
  );
}

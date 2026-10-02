import type { Metadata } from "next";
import { notFound } from "next/navigation";
import { DocPage } from "@/components/doc-page";
import { allResources, loadMeta, loadPage, resourcePath } from "@/lib/content";
import { RESOURCE_SLUGS } from "@/lib/site";

export const dynamicParams = false;

export function generateStaticParams() {
  return RESOURCE_SLUGS.map((slug) => ({ slug }));
}

export async function generateMetadata(props: PageProps<"/resources/[slug]">): Promise<Metadata> {
  const { slug } = await props.params;
  const meta = loadMeta(resourcePath(slug));
  return { title: meta.title, description: meta.summary };
}

export default async function ResourcePage(props: PageProps<"/resources/[slug]">) {
  const { slug } = await props.params;
  if (!(RESOURCE_SLUGS as readonly string[]).includes(slug)) notFound();

  const page = await loadPage(resourcePath(slug));
  const all = allResources();
  const i = all.findIndex((r) => r.slug === slug);
  const prev = all[i - 1];
  const next = all[i + 1];

  return (
    <DocPage
      page={page}
      crumbs={[
        { href: "/", label: "Home" },
        { href: "/resources/", label: "Resources" },
      ]}
      prevNext={{
        prev: prev ? { href: `/resources/${prev.slug}/`, title: prev.title } : undefined,
        next: next ? { href: `/resources/${next.slug}/`, title: next.title } : undefined,
      }}
    />
  );
}

import type { Metadata } from "next";
import { notFound } from "next/navigation";
import { DocPage } from "@/components/doc-page";
import { allGuides, guidePath, loadMeta, loadPage } from "@/lib/content";
import { GUIDE_SLUGS } from "@/lib/site";

export const dynamicParams = false;

export function generateStaticParams() {
  return GUIDE_SLUGS.map((slug) => ({ slug }));
}

export async function generateMetadata(props: PageProps<"/guides/[slug]">): Promise<Metadata> {
  const { slug } = await props.params;
  const meta = loadMeta(guidePath(slug));
  return { title: meta.title, description: meta.summary };
}

export default async function GuidePage(props: PageProps<"/guides/[slug]">) {
  const { slug } = await props.params;
  if (!(GUIDE_SLUGS as readonly string[]).includes(slug)) notFound();

  const page = await loadPage(guidePath(slug));
  const guides = allGuides();
  const i = guides.findIndex((g) => g.slug === slug);
  const prev = guides[i - 1];
  const next = guides[i + 1];

  return (
    <DocPage
      page={page}
      crumbs={[
        { href: "/", label: "Home" },
        { href: "/guides/", label: "Guides" },
      ]}
      prevNext={{
        prev: prev ? { href: `/guides/${prev.slug}/`, title: prev.title } : { href: "/procedures/", title: "Project Procedures" },
        next: next ? { href: `/guides/${next.slug}/`, title: next.title } : { href: "/resources/", title: "Resources" },
      }}
    />
  );
}

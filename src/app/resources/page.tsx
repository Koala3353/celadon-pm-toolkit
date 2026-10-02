import type { Metadata } from "next";
import Link from "next/link";
import { allResources } from "@/lib/content";
import { TOOLS } from "@/lib/site";
import { Container } from "@/components/ui/container";
import { PageHero } from "@/components/page-hero";

export const metadata: Metadata = {
  title: "Resources",
  description: "Leadership guides for managers and the Celadon tools, trackers, and templates PMs use every week.",
};

export default function ResourcesIndex() {
  const resources = allResources();
  return (
    <>
      <PageHero
        kicker="Resources"
        title="Resources and tools"
        summary="Guides to leading your core team, and the shared trackers and tools you'll open every week."
        crumbs={[{ href: "/", label: "Home" }]}
      />
      <Container className="pt-12 sm:pt-16" data-pagefind-body>
        <h2 className="display text-2xl text-navy sm:text-3xl">Leading your team</h2>
        <ul className="mt-6 grid gap-4 sm:grid-cols-2">
          {resources.map((r) => (
            <li key={r.slug}>
              <Link href={`/resources/${r.slug}/`} className="lift flex h-full flex-col gap-2 rounded-[1.5rem] bg-navy-tint p-6">
                <span className="text-xl font-extrabold text-navy">{r.title}</span>
                <span className="prose-body text-sm text-muted-foreground">{r.summary}</span>
              </Link>
            </li>
          ))}
        </ul>

        <h2 className="display mt-16 text-2xl text-navy sm:text-3xl">Tools and trackers</h2>
        <p className="prose-body mt-2 max-w-2xl text-sm text-muted-foreground">
          Google files open only for accounts they&rsquo;re shared with. Sign in with your Ateneo account first.
        </p>
        <ul className="mt-6 grid gap-3 sm:grid-cols-2 lg:grid-cols-3">
          {TOOLS.map((t) => (
            <li key={t.href}>
              <a
                href={t.href}
                target="_blank"
                rel="noopener noreferrer"
                className="group flex h-full flex-col gap-1.5 rounded-[1.25rem] border border-border bg-white p-5 transition-[border-color,box-shadow] duration-200 hover:border-navy/40 hover:shadow-[var(--shadow-md)]"
              >
                <span className="flex items-start justify-between gap-3 font-extrabold text-navy">
                  {t.title}
                  <span aria-hidden className="text-muted-foreground transition-transform duration-200 group-hover:-translate-y-0.5 group-hover:translate-x-0.5">
                    ↗
                  </span>
                </span>
                <span className="prose-body text-sm text-muted-foreground">{t.note}</span>
              </a>
            </li>
          ))}
        </ul>
      </Container>
    </>
  );
}

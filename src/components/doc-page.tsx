import Link from "next/link";
import { PageHero } from "@/components/page-hero";
import { Container } from "@/components/ui/container";
import { Toc } from "@/components/toc";
import { formatReviewed, type Page } from "@/lib/content";
import { DEPTS, WEBSITE_CONTACT } from "@/lib/site";
import { officersFor } from "@/data/directory";

/**
 * Every Markdown-backed page: navy hero, then a three-column reading layout
 * (on-this-page list · article · department contacts) that collapses to one
 * column on narrow screens.
 */
export function DocPage({
  page,
  crumbs,
  prevNext,
}: {
  page: Page;
  crumbs?: { href: string; label: string }[];
  prevNext?: { prev?: { href: string; title: string }; next?: { href: string; title: string } };
}) {
  const dept = page.meta.dept ? DEPTS[page.meta.dept] : undefined;
  const officers = dept ? officersFor(dept.slug) : [];
  const style = dept
    ? ({
        "--dept-accent": dept.accent.base,
        "--dept-tint": dept.accent.tint,
        "--dept-ink": dept.accent.ink,
      } as React.CSSProperties)
    : undefined;

  return (
    <div style={style}>
      <PageHero kicker={page.meta.kicker} title={page.meta.title} summary={page.meta.summary} dept={dept} crumbs={crumbs} />

      <Container className="grid gap-10 pt-10 sm:pt-14 lg:grid-cols-[14rem_minmax(0,1fr)] xl:grid-cols-[14rem_minmax(0,1fr)_15rem] xl:gap-12">
        <aside className="min-w-0 lg:row-span-2">
          <Toc items={page.toc} />
        </aside>

        <article className="min-w-0" data-pagefind-body>
          <div className="mb-8 flex flex-wrap items-center gap-x-4 gap-y-2 text-xs font-semibold text-muted-foreground" data-pagefind-ignore>
            <span>Last reviewed {formatReviewed(page.meta.lastReviewed)}</span>
            {page.confirmCount > 0 && (
              <span className="inline-flex items-center gap-1.5 rounded-full bg-[#fff6ec] px-2.5 py-1 font-bold text-accent-ink">
                <span aria-hidden className="h-1.5 w-1.5 rounded-full bg-current" />
                {page.confirmCount} {page.confirmCount === 1 ? "item needs" : "items need"} EBCB confirmation
              </span>
            )}
          </div>

          <div className="doc" dangerouslySetInnerHTML={{ __html: page.html }} />

          <footer className="mt-16 flex flex-col gap-6 border-t border-border pt-8" data-pagefind-ignore>
            {prevNext && (prevNext.prev || prevNext.next) && (
              <nav aria-label="More pages" className="grid gap-3 sm:grid-cols-2">
                {prevNext.prev ? (
                  <Link href={prevNext.prev.href} className="lift group rounded-2xl border border-border p-4">
                    <span className="eyebrow text-muted-foreground">Previous</span>
                    <span className="mt-1 block font-extrabold text-navy">← {prevNext.prev.title}</span>
                  </Link>
                ) : (
                  <span />
                )}
                {prevNext.next && (
                  <Link href={prevNext.next.href} className="lift group rounded-2xl border border-border p-4 text-right">
                    <span className="eyebrow text-muted-foreground">Next</span>
                    <span className="mt-1 block font-extrabold text-navy">{prevNext.next.title} →</span>
                  </Link>
                )}
              </nav>
            )}
            <div className="flex flex-col gap-1.5 text-sm text-muted-foreground">
              <p>
                Information out of date? Tell the {dept ? `${dept.short} EBCB` : "department that owns the process"}, or{" "}
                <a href={page.editUrl} className="font-semibold text-link underline underline-offset-2">
                  edit this page on GitHub
                </a>
                .
              </p>
              <p>
                Broken link or something not working on the site? Message {WEBSITE_CONTACT.name} at{" "}
                <a href={`mailto:${WEBSITE_CONTACT.email}`} className="font-semibold text-link underline underline-offset-2">
                  {WEBSITE_CONTACT.email}
                </a>{" "}
                or on{" "}
                <a href={WEBSITE_CONTACT.facebook} className="font-semibold text-link underline underline-offset-2">
                  Facebook
                </a>
                .
              </p>
            </div>
          </footer>
        </article>

        {dept && officers.length > 0 && (
          <aside className="min-w-0 xl:sticky xl:top-24 xl:self-start" aria-label={`${dept.short} EBCB contacts`} data-pagefind-ignore>
            <div className="rounded-[1.25rem] bg-dept-tint p-5">
              <p className="eyebrow text-dept-ink">{dept.short} EBCB</p>
              <ul className="mt-4 flex flex-col gap-4">
                {officers.map((o) => (
                  <li key={o.email} className="text-sm leading-snug">
                    <span className="block font-extrabold text-ink">{o.name}</span>
                    <span className="block text-xs text-muted-foreground">{o.role}</span>
                    <a href={`mailto:${o.email}`} className="mt-1 block break-all text-xs font-semibold text-link hover:underline">
                      {o.email}
                    </a>
                  </li>
                ))}
              </ul>
              <Link href="/directory/" className="mt-5 inline-block text-xs font-bold uppercase tracking-wider text-dept-ink hover:underline">
                Full directory →
              </Link>
            </div>
          </aside>
        )}
      </Container>
    </div>
  );
}

import Link from "next/link";
import { PageHero } from "@/components/page-hero";
import { Container } from "@/components/ui/container";
import { Toc } from "@/components/toc";
import type { Page } from "@/lib/content";
import { DEPTS, WEBSITE_CONTACT } from "@/lib/site";

/**
 * Every Markdown-backed page: navy hero with the page title, then the
 * Navigation list beside the article. One column on narrow screens.
 */
export function DocPage({ page }: { page: Page }) {
  const dept = page.meta.dept ? DEPTS[page.meta.dept] : undefined;
  const style = dept
    ? ({
        "--dept-accent": dept.accent.base,
        "--dept-tint": dept.accent.tint,
        "--dept-ink": dept.accent.ink,
      } as React.CSSProperties)
    : undefined;

  return (
    <div style={style}>
      <PageHero title={page.meta.title} dept={dept} />

      <Container className="grid gap-10 pt-10 sm:pt-14 lg:grid-cols-[15rem_minmax(0,1fr)] xl:gap-14">
        <aside className="min-w-0">
          <Toc items={page.toc} />
        </aside>

        <article className="min-w-0" data-pagefind-body>
          <div className="doc" dangerouslySetInnerHTML={{ __html: page.html }} />

          <footer className="mt-16 flex flex-col gap-1.5 border-t border-border pt-6 text-sm text-muted-foreground" data-pagefind-ignore>
            <p>
              Website issues: message the{" "}
              <Link href={WEBSITE_CONTACT.href} className="font-semibold text-link underline underline-offset-2">
                {WEBSITE_CONTACT.label}
              </Link>
              .
            </p>
            <p>
              <a href={page.editUrl} className="font-semibold text-link underline underline-offset-2">
                Edit this page on GitHub
              </a>
            </p>
          </footer>
        </article>
      </Container>
    </div>
  );
}

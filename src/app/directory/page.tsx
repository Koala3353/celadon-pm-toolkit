import type { Metadata } from "next";
import { DEPTS } from "@/lib/site";
import { DIRECTORY } from "@/data/directory";
import { Container } from "@/components/ui/container";
import { PageHero } from "@/components/page-hero";

export const metadata: Metadata = { title: "EBCB Directory" };

function initials(name: string) {
  return name
    .split(/\s+/)
    .map((p) => p[0])
    .slice(0, 2)
    .join("");
}

/** Same content as the Google Site's EBCB Directory. */
export default function DirectoryPage() {
  return (
    <>
      <PageHero title="EBCB Directory" />

      <Container className="flex flex-col gap-14 pt-12 sm:pt-16" data-pagefind-body>
        {DIRECTORY.map((g) => {
          const dept = DEPTS[g.dept];
          return (
            <section key={g.dept} id={g.dept} aria-labelledby={`${g.dept}-title`} className="scroll-mt-24">
              <h2 id={`${g.dept}-title`} className="display border-b border-border pb-4 text-2xl text-navy sm:text-3xl">
                {g.title}
              </h2>
              <ul className="mt-6 grid gap-3 sm:grid-cols-2 xl:grid-cols-3">
                {g.officers.map((o) => (
                  <li key={o.email} className="flex min-w-0 gap-4 rounded-[1.25rem] border border-border bg-white p-4">
                    <span
                      aria-hidden
                      className="grid h-12 w-12 shrink-0 place-items-center rounded-full text-sm font-black"
                      style={{ background: dept.accent.tint, color: dept.accent.ink }}
                    >
                      {initials(o.name)}
                    </span>
                    <div className="flex min-w-0 flex-1 flex-col gap-1">
                      <h3 className="font-extrabold text-ink">{o.name}</h3>
                      <p className="text-xs leading-snug text-muted-foreground">{o.role}</p>
                      {o.note && (
                        <p className="w-fit rounded-full bg-navy-tint px-2 py-0.5 text-[0.65rem] font-extrabold uppercase tracking-wider text-navy">
                          {o.note}
                        </p>
                      )}
                      <p className="mt-1 flex items-center gap-2 text-xs font-bold">
                        <a href={o.facebook} target="_blank" rel="noopener noreferrer" className="text-link hover:underline">
                          Facebook
                        </a>
                        <span aria-hidden className="text-muted-foreground">|</span>
                        <a href={`mailto:${o.email}`} title={o.email} className="text-link hover:underline">
                          Email
                        </a>
                      </p>
                    </div>
                  </li>
                ))}
              </ul>
            </section>
          );
        })}
      </Container>
    </>
  );
}

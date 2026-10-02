import type { Metadata } from "next";
import Image from "next/image";
import { asset } from "@/lib/asset";
import { DEPTS } from "@/lib/site";
import { DIRECTORY } from "@/data/directory";
import { Container } from "@/components/ui/container";
import { PageHero } from "@/components/page-hero";
import { CopyEmail } from "@/components/copy-email";

export const metadata: Metadata = {
  title: "EBCB Directory",
  description: "Contact details for every member of Ateneo Celadon's EBCB 2026–2027, by department.",
};

function initials(name: string) {
  return name
    .split(/\s+/)
    .map((p) => p[0])
    .slice(0, 2)
    .join("");
}

export default function DirectoryPage() {
  return (
    <>
      <PageHero
        kicker="EBCB 2026–2027"
        title="Directory"
        summary="Who to message for what. Start with the department that owns the process, and copy the address with one tap."
        crumbs={[{ href: "/", label: "Home" }]}
      >
        <nav aria-label="Departments" className="no-scrollbar -mx-1 flex gap-2 overflow-x-auto px-1 pt-2">
          {DIRECTORY.map((g) => (
            <a
              key={g.dept}
              href={`#${g.dept}`}
              className="shrink-0 rounded-full bg-white/10 px-4 py-2 text-xs font-extrabold uppercase tracking-wider text-white transition-colors hover:bg-white/20"
            >
              {DEPTS[g.dept].short}
            </a>
          ))}
        </nav>
      </PageHero>

      <Container className="flex flex-col gap-14 pt-12 sm:pt-16" data-pagefind-body>
        {DIRECTORY.map((g) => {
          const dept = DEPTS[g.dept];
          return (
            <section key={g.dept} id={g.dept} aria-labelledby={`${g.dept}-title`} className="scroll-mt-24">
              <div className="flex items-end gap-4 border-b border-border pb-4">
                <Image src={asset(dept.ayi)} alt="" width={200} height={200} className="h-16 w-auto" />
                <div className="min-w-0">
                  <p className="text-xs font-extrabold uppercase tracking-[0.14em]" style={{ color: dept.accent.ink }}>
                    {dept.short}
                  </p>
                  <h2 id={`${g.dept}-title`} className="display text-2xl text-navy sm:text-3xl">
                    {g.title}
                  </h2>
                </div>
              </div>
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
                      <span className="font-extrabold text-ink">{o.name}</span>
                      <span className="text-xs leading-snug text-muted-foreground">{o.role}</span>
                      <CopyEmail email={o.email} />
                      <a
                        href={o.facebook}
                        target="_blank"
                        rel="noopener noreferrer"
                        className="w-fit text-xs font-bold text-link hover:underline"
                      >
                        Message on Facebook ↗
                      </a>
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

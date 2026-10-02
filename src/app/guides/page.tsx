import type { Metadata } from "next";
import Image from "next/image";
import Link from "next/link";
import { asset } from "@/lib/asset";
import { allGuides } from "@/lib/content";
import { DEPTS } from "@/lib/site";
import { Container } from "@/components/ui/container";
import { PageHero } from "@/components/page-hero";

export const metadata: Metadata = {
  title: "Department Guides",
  description: "What COMMPUB, EXREL, FIN, HR, OSR, and the Office of the President need from every project manager.",
};

export default function GuidesIndex() {
  const guides = allGuides();
  return (
    <>
      <PageHero
        kicker="Department guides"
        title="Guides"
        summary="Each department's processes, deadlines, and contacts for project managers. Read the ones your project touches before your first IC."
        crumbs={[{ href: "/", label: "Home" }]}
      />
      <Container className="pt-12 sm:pt-16">
        <ul className="grid gap-4 md:grid-cols-2">
          {guides.map((g) => {
            const dept = DEPTS[g.dept ?? "op"];
            return (
              <li key={g.slug}>
                <Link
                  href={`/guides/${g.slug}/`}
                  className="lift group grid h-full grid-cols-[minmax(0,1fr)_6.5rem] items-center gap-4 overflow-hidden rounded-[1.5rem] border border-border bg-white p-5 sm:grid-cols-[minmax(0,1fr)_8rem] sm:p-6"
                >
                  <div className="flex min-w-0 flex-col gap-2">
                    <span className="text-xs font-extrabold uppercase tracking-[0.14em]" style={{ color: dept.accent.ink }}>
                      {dept.name}
                    </span>
                    <span className="display text-2xl text-navy sm:text-3xl">{g.title}</span>
                    <span className="prose-body text-sm text-muted-foreground">{g.summary}</span>
                  </div>
                  <span className="grid aspect-square place-items-center rounded-full" style={{ background: dept.accent.tint }}>
                    <Image
                      src={asset(dept.ayi)}
                      alt=""
                      width={300}
                      height={300}
                      className="h-auto w-[85%] transition-transform duration-300 ease-[var(--ease-out)] group-hover:-rotate-3"
                    />
                  </span>
                </Link>
              </li>
            );
          })}
        </ul>

        <aside className="mt-6 rounded-[1.5rem] border border-dashed border-border p-6 text-sm text-muted-foreground">
          <strong className="text-ink">Cultural Affairs</strong> doesn&rsquo;t have a PM guide yet. For CUL processes, contact Therese Yap, VP
          for Cultural Affairs, through the{" "}
          <Link href="/directory/#cul" className="font-semibold text-link underline underline-offset-2">
            Directory
          </Link>
          .
        </aside>
      </Container>
    </>
  );
}

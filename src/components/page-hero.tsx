import Image from "next/image";
import { asset } from "@/lib/asset";
import { cn } from "@/lib/cn";
import { Container } from "@/components/ui/container";
import type { Dept } from "@/lib/site";

/**
 * The navy band every interior page opens with, as on ateneoceladon.com.
 * Department guides add their Ayi mascot and a stripe of the department's
 * accent colour along the bottom edge.
 */
export function PageHero({
  kicker,
  title,
  summary,
  dept,
  crumbs,
  children,
}: {
  kicker?: string;
  title: string;
  summary?: string;
  dept?: Dept;
  crumbs?: { href: string; label: string }[];
  children?: React.ReactNode;
}) {
  return (
    <section className="navy-field relative overflow-hidden text-on-navy">
      <div className="navy-grid">
        <Container
          className={cn(
            "relative grid gap-8 py-14 sm:py-20",
            dept && "md:grid-cols-[minmax(0,1fr)_14rem] md:items-end lg:grid-cols-[minmax(0,1fr)_17rem]"
          )}
        >
          <div className="flex min-w-0 flex-col gap-5">
            {crumbs && crumbs.length > 0 && (
              <nav aria-label="Breadcrumb">
                <ol className="flex flex-wrap items-center gap-1.5 text-xs font-bold uppercase tracking-wider text-on-navy/80">
                  {crumbs.map((c) => (
                    <li key={c.href} className="flex items-center gap-1.5">
                      <a href={asset(c.href)} className="hover:text-white">
                        {c.label}
                      </a>
                      <span aria-hidden>/</span>
                    </li>
                  ))}
                </ol>
              </nav>
            )}
            {kicker && <p className="eyebrow text-link-navy">{kicker}</p>}
            <h1 className="display max-w-4xl text-4xl text-white sm:text-6xl lg:text-7xl">{title}</h1>
            {summary && <p className="prose-body max-w-2xl text-lg text-on-navy">{summary}</p>}
            {children}
          </div>

          {dept && (
            <Image
              src={asset(dept.ayi)}
              alt={`Ayi, Celadon's panda, dressed for ${dept.short}`}
              width={600}
              height={600}
              priority
              className="mx-auto hidden h-auto w-44 drop-shadow-[0_24px_40px_rgba(0,0,0,0.35)] sm:block md:mx-0 md:-mb-14 md:w-full"
            />
          )}
        </Container>
      </div>
      {dept && <div aria-hidden className="h-1.5 w-full" style={{ background: dept.accent.base }} />}
    </section>
  );
}

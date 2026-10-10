import { cn } from "@/lib/cn";
import { Container } from "@/components/ui/container";
import type { Dept } from "@/lib/site";

/**
 * The navy band each page opens with, as on ateneoceladon.com. It carries the
 * page title only, like the Google Site's banner. Department guides add a
 * stripe of the department's colour.
 */
export function PageHero({ title, dept, children }: { title: string; dept?: Dept; children?: React.ReactNode }) {
  return (
    <section className="navy-field relative overflow-hidden text-on-navy">
      <div className="navy-grid">
        <Container
          className={cn(
            "relative grid gap-8 py-14 sm:py-20",
            dept && "md:items-end"
          )}
        >
          <div className="flex min-w-0 flex-col gap-5">
            <h1 className="display max-w-4xl text-4xl text-white sm:text-6xl lg:text-7xl">{title}</h1>
            {children}
          </div>
        </Container>
      </div>
      {dept && <div aria-hidden className="h-1.5 w-full" style={{ background: dept.accent.base }} />}
    </section>
  );
}

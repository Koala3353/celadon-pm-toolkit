import Image from "next/image";
import { asset } from "@/lib/asset";
import { cn } from "@/lib/cn";
import { Container } from "@/components/ui/container";
import type { Dept } from "@/lib/site";

/**
 * The navy band each page opens with, as on ateneoceladon.com. It carries the
 * page title only, like the Google Site's banner. Department guides add their
 * Ayi mascot and a stripe of the department's colour.
 */
export function PageHero({ title, dept, children }: { title: string; dept?: Dept; children?: React.ReactNode }) {
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
            <h1 className="display max-w-4xl text-4xl text-white sm:text-6xl lg:text-7xl">{title}</h1>
            {children}
          </div>

          {dept && (
            <Image
              src={asset(dept.ayi)}
              alt=""
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

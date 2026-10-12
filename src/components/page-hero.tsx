import Image from "next/image";
import { cn } from "@/lib/cn";
import { asset } from "@/lib/asset";
import { Container } from "@/components/ui/container";
import type { Dept } from "@/lib/site";

/**
 * The band each page opens with. It carries the page title only, like the
 * Google Site's banner. Plain pages get the navy field as on ateneoceladon.com;
 * department guides pair the department's colour with its panda, the same way
 * the home page cards do, over a stripe of the department's colour.
 */
export function PageHero({ title, dept, children }: { title: string; dept?: Dept; children?: React.ReactNode }) {
  if (dept) {
    return (
      <section className="relative overflow-hidden" style={{ background: dept.accent.tint }}>
        <Container className="relative flex items-end justify-between gap-6 pt-12 sm:pt-16">
          <div className="flex min-w-0 flex-1 flex-col gap-5 pb-12 sm:pb-16">
            <h1 className="display max-w-4xl text-4xl sm:text-6xl lg:text-7xl" style={{ color: dept.accent.ink }}>
              {title}
            </h1>
            {children}
          </div>
          <Image
            src={asset(dept.ayi)}
            alt=""
            width={300}
            height={300}
            priority
            className="-mb-1 hidden h-36 w-auto shrink-0 sm:block md:h-48 lg:h-60"
          />
        </Container>
        <div aria-hidden className="h-1.5 w-full" style={{ background: dept.accent.base }} />
      </section>
    );
  }

  return (
    <section className="navy-field relative overflow-hidden text-on-navy">
      <div className="navy-grid">
        <Container className={cn("relative grid gap-8 py-14 sm:py-20")}>
          <div className="flex min-w-0 flex-col gap-5">
            <h1 className="display max-w-4xl text-4xl text-white sm:text-6xl lg:text-7xl">{title}</h1>
            {children}
          </div>
        </Container>
      </div>
    </section>
  );
}

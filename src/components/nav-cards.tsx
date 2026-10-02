import Image from "next/image";
import Link from "next/link";
import { asset } from "@/lib/asset";
import { DEPTS, type NavCard } from "@/lib/site";

/** The Google Site's "Explore Here >" card grid. */
export function NavCards({ cards }: { cards: NavCard[] }) {
  return (
    <ul className="grid gap-4 sm:grid-cols-2 lg:grid-cols-3">
      {cards.map((card) => {
        const dept = card.dept ? DEPTS[card.dept] : undefined;
        const inner = (
          <>
            {dept && (
              <div className="relative flex h-28 items-end justify-end px-5" style={{ background: dept.accent.tint }}>
                <Image
                  src={asset(dept.ayi)}
                  alt=""
                  width={300}
                  height={300}
                  className="-mb-2 h-24 w-auto transition-transform duration-300 ease-[var(--ease-out)] group-hover:-translate-y-1"
                />
              </div>
            )}
            {dept && <div aria-hidden className="h-1" style={{ background: dept.accent.base }} />}
            <div className="flex flex-1 flex-col justify-between gap-4 p-5">
              <span className="text-lg font-extrabold text-navy">{card.label}</span>
              <span className="text-sm font-bold text-link">Explore Here &gt;</span>
            </div>
          </>
        );
        const cls = "lift group flex h-full flex-col overflow-hidden rounded-[1.5rem] border border-border bg-white";
        return (
          <li key={card.href}>
            {card.external ? (
              <a href={card.href} target="_blank" rel="noopener noreferrer" className={cls}>
                {inner}
              </a>
            ) : (
              <Link href={card.href} className={cls}>
                {inner}
              </Link>
            )}
          </li>
        );
      })}
    </ul>
  );
}

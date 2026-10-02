"use client";

import { useEffect, useState } from "react";
import { cn } from "@/lib/cn";
import type { TocItem } from "@/lib/markdown";

/** Opens an accordion when a link targets it or something inside it. */
function openTarget(hash: string) {
  if (!hash) return;
  const el = document.getElementById(decodeURIComponent(hash.slice(1)));
  if (!el) return;
  const details = el.tagName === "DETAILS" ? el : el.closest("details");
  if (details && !(details as HTMLDetailsElement).open) {
    (details as HTMLDetailsElement).open = true;
    requestAnimationFrame(() => el.scrollIntoView({ block: "start" }));
  }
}

/**
 * The Google Site's "Navigation" list: sticky on wide screens, a dropdown at the top of the
 * article on narrow ones. Highlights the section currently in view.
 */
export function Toc({ items }: { items: TocItem[] }) {
  const [activeId, setActiveId] = useState<string | null>(items[0]?.id ?? null);

  useEffect(() => {
    openTarget(window.location.hash);
    const onHash = () => openTarget(window.location.hash);
    window.addEventListener("hashchange", onHash);

    const targets = items
      .map((i) => document.getElementById(i.id))
      .filter((el): el is HTMLElement => !!el);
    const observer = new IntersectionObserver(
      (entries) => {
        const visible = entries.filter((e) => e.isIntersecting).sort((a, b) => a.boundingClientRect.top - b.boundingClientRect.top);
        if (visible[0]) setActiveId(visible[0].target.id);
      },
      { rootMargin: "-96px 0px -65% 0px", threshold: 0 }
    );
    targets.forEach((t) => observer.observe(t));
    return () => {
      observer.disconnect();
      window.removeEventListener("hashchange", onHash);
    };
  }, [items]);

  if (items.length < 2) return null;

  return (
    <>
      <details className="toc-mobile group rounded-2xl border border-border bg-white lg:hidden">
        <summary className="flex cursor-pointer list-none items-center justify-between px-4 py-3 text-xs font-extrabold uppercase tracking-[0.14em] text-navy [&::-webkit-details-marker]:hidden">
          Navigation
          <span aria-hidden className="transition-transform duration-200 group-open:rotate-180">▾</span>
        </summary>
        <nav aria-label="Navigation" className="max-h-[50vh] overflow-y-auto border-t border-border px-2 py-2">
          <TocList items={items} activeId={activeId} onPick={(e) => (e.currentTarget.closest("details") as HTMLDetailsElement | null)?.removeAttribute("open")} />
        </nav>
      </details>

      <nav aria-label="Navigation" className="sticky top-24 hidden max-h-[calc(100vh-7rem)] overflow-y-auto pb-8 lg:block">
        <p className="eyebrow mb-3 px-3 text-muted-foreground">Navigation</p>
        <TocList items={items} activeId={activeId} />
      </nav>
    </>
  );
}

function TocList({
  items,
  activeId,
  onPick,
}: {
  items: TocItem[];
  activeId: string | null;
  onPick?: (e: React.MouseEvent<HTMLAnchorElement>) => void;
}) {
  return (
    <ul className="flex flex-col gap-0.5">
      {items.map((item) => {
        const active = item.id === activeId;
        return (
          <li key={item.id}>
            <a
              href={`#${item.id}`}
              onClick={onPick}
              aria-current={active ? "location" : undefined}
              className={cn(
                "block rounded-xl px-3 py-1.5 text-[0.82rem] leading-snug transition-colors",
                item.depth === 3 && "pl-6 text-[0.78rem]",
                active ? "bg-dept-tint font-bold text-dept-ink" : "text-muted-foreground hover:bg-muted hover:text-navy",
                item.depth === 2 && !active && "font-semibold text-ink"
              )}
            >
              {item.text}
            </a>
          </li>
        );
      })}
    </ul>
  );
}

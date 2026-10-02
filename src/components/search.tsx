"use client";

import { useCallback, useEffect, useRef, useState } from "react";
import { asset } from "@/lib/asset";
import { cn } from "@/lib/cn";

/**
 * Site search, backed by Pagefind's static index (built into /pagefind after
 * `next build`, so it works on GitHub Pages with no server). Opens from the
 * header button, ⌘K / Ctrl+K, or "/".
 */

interface PagefindResult {
  id: string;
  data: () => Promise<{
    url: string;
    excerpt: string;
    meta: { title?: string; section?: string };
    sub_results?: { title: string; url: string; excerpt: string }[];
  }>;
}

interface Pagefind {
  init?: () => Promise<void>;
  search: (q: string) => Promise<{ results: PagefindResult[] }>;
}

interface Hit {
  url: string;
  title: string;
  section?: string;
  excerpt: string;
}

let pagefindPromise: Promise<Pagefind | null> | null = null;

function loadPagefind(): Promise<Pagefind | null> {
  if (!pagefindPromise) {
    const url = asset("/pagefind/pagefind.js");
    // A runtime import the bundler must not try to resolve: the file only
    // exists in the built site.
    const dynamicImport = new Function("u", "return import(u)") as (u: string) => Promise<Pagefind>;
    pagefindPromise = dynamicImport(url)
      .then(async (pf) => {
        await pf.init?.();
        return pf;
      })
      .catch(() => null);
  }
  return pagefindPromise;
}

const OPEN_EVENT = "toolkit:open-search";

export function openSearch() {
  window.dispatchEvent(new Event(OPEN_EVENT));
}

export function SearchButton({ className }: { className?: string }) {
  return (
    <button
        type="button"
        onClick={openSearch}
        className={cn(
          "pressable flex h-10 items-center gap-2 rounded-full bg-navy-tint px-3 text-navy transition-colors hover:bg-navy/[0.12] focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-navy sm:px-4",
          className
        )}
        aria-label="Search the toolkit"
      >
        <SearchIcon className="h-4 w-4" />
        <span className="hidden text-xs font-bold uppercase tracking-wider sm:inline">Search</span>
        <kbd className="hidden rounded-md border border-navy/15 bg-white px-1.5 py-0.5 font-sans text-[0.65rem] font-bold text-muted-foreground md:inline">
          ⌘K
      </kbd>
    </button>
  );
}

/** Mounted once, in the root layout. Any SearchButton opens it. */
export function SearchDialog() {
  const dialogRef = useRef<HTMLDialogElement>(null);
  const inputRef = useRef<HTMLInputElement>(null);
  const [query, setQuery] = useState("");
  const [hits, setHits] = useState<Hit[]>([]);
  const [status, setStatus] = useState<"idle" | "loading" | "ready" | "unavailable">("idle");
  const [active, setActive] = useState(0);

  const open = useCallback(() => {
    const d = dialogRef.current;
    if (!d || d.open) return;
    d.showModal();
    requestAnimationFrame(() => inputRef.current?.select());
    setStatus((s) => (s === "idle" ? "loading" : s));
    loadPagefind().then((pf) => setStatus(pf ? "ready" : "unavailable"));
  }, []);

  useEffect(() => {
    const onKey = (e: KeyboardEvent) => {
      const target = e.target as HTMLElement | null;
      const typing = target?.closest("input, textarea, [contenteditable=true]");
      if ((e.key === "k" && (e.metaKey || e.ctrlKey)) || (e.key === "/" && !typing)) {
        e.preventDefault();
        open();
      }
    };
    window.addEventListener("keydown", onKey);
    window.addEventListener(OPEN_EVENT, open);
    return () => {
      window.removeEventListener("keydown", onKey);
      window.removeEventListener(OPEN_EVENT, open);
    };
  }, [open]);

  useEffect(() => {
    let cancelled = false;
    const q = query.trim();
    if (!q || status !== "ready") return;
    const t = window.setTimeout(async () => {
      const pf = await loadPagefind();
      if (!pf || cancelled) return;
      const res = await pf.search(q);
      const data = await Promise.all(res.results.slice(0, 8).map((r) => r.data()));
      if (cancelled) return;
      const flat: Hit[] = [];
      for (const d of data) {
        const sub = d.sub_results?.[0];
        flat.push({
          url: sub?.url ?? d.url,
          title: d.meta.title ?? "Untitled",
          section: sub && sub.title !== d.meta.title ? sub.title : undefined,
          excerpt: sub?.excerpt ?? d.excerpt,
        });
      }
      setHits(flat);
      setActive(0);
    }, 120);
    return () => {
      cancelled = true;
      window.clearTimeout(t);
    };
  }, [query, status]);

  // Results for an emptied query are stale; derive instead of clearing state.
  const shown = query.trim() ? hits : [];

  const close = () => dialogRef.current?.close();

  const go = (url: string) => {
    close();
    window.location.href = url;
  };

  return (
    <dialog
      ref={dialogRef}
      aria-label="Search the toolkit"
      onClick={(e) => {
        if (e.target === dialogRef.current) close();
      }}
      className="search-dialog m-0 mx-auto mt-[8vh] w-[min(40rem,calc(100vw-2rem))] max-w-none rounded-[1.5rem] bg-white p-0 text-ink shadow-[var(--shadow-lg)] backdrop:bg-ink/60 backdrop:backdrop-blur-sm"
    >
      <div className="flex items-center gap-3 border-b border-border px-5">
        <SearchIcon className="h-5 w-5 shrink-0 text-navy" />
        <input
          ref={inputRef}
          id="toolkit-search"
          type="search"
          value={query}
          onChange={(e) => setQuery(e.target.value)}
          onKeyDown={(e) => {
            if (e.key === "ArrowDown") {
              e.preventDefault();
              setActive((a) => Math.min(a + 1, shown.length - 1));
            } else if (e.key === "ArrowUp") {
              e.preventDefault();
              setActive((a) => Math.max(a - 1, 0));
            } else if (e.key === "Enter" && shown[active]) {
              e.preventDefault();
              go(shown[active].url);
            }
          }}
          placeholder="Search procedures, guides, people…"
          aria-label="Search"
          autoComplete="off"
          className="h-16 w-full bg-transparent text-base font-medium outline-none placeholder:text-muted-foreground"
        />
        <button
          type="button"
          onClick={close}
          className="rounded-md border border-border px-2 py-1 text-[0.65rem] font-bold uppercase tracking-wider text-muted-foreground hover:text-navy"
        >
          Esc
        </button>
      </div>

      <div className="max-h-[60vh] overflow-y-auto p-2">
        {status === "unavailable" && (
          <p className="px-4 py-8 text-center text-sm text-muted-foreground">
            Search isn&rsquo;t available in this preview. It works on the published site, where the index is built.
          </p>
        )}
        {status !== "unavailable" && !query.trim() && (
          <p className="px-4 py-8 text-center text-sm text-muted-foreground">
            Try <em>reimbursement</em>, <em>CFMO</em>, <em>leave of absence</em>, or <em>DRF</em>.
          </p>
        )}
        {status === "ready" && query.trim() && shown.length === 0 && (
          <p className="px-4 py-8 text-center text-sm text-muted-foreground">
            Nothing matches &ldquo;{query.trim()}&rdquo;. Try a shorter word, or check the{" "}
            <a href={asset("/directory/")} className="font-semibold text-link underline underline-offset-2">
              Directory
            </a>{" "}
            and ask the department.
          </p>
        )}
        <ul role="listbox" aria-label="Results" className="flex flex-col gap-1">
          {shown.map((h, i) => (
            <li key={h.url + i} role="option" aria-selected={i === active}>
              <a
                href={h.url}
                onMouseEnter={() => setActive(i)}
                onClick={(e) => {
                  e.preventDefault();
                  go(h.url);
                }}
                className={cn(
                  "block rounded-2xl px-4 py-3 transition-colors",
                  i === active ? "bg-navy-tint" : "hover:bg-muted"
                )}
              >
                <span className="block text-sm font-extrabold text-navy">
                  {h.title}
                  {h.section && <span className="font-semibold text-muted-foreground"> · {h.section}</span>}
                </span>
                <span
                  className="mt-1 block text-[0.85rem] leading-snug text-muted-foreground [&_mark]:text-ink"
                  dangerouslySetInnerHTML={{ __html: h.excerpt }}
                />
              </a>
            </li>
          ))}
        </ul>
      </div>
    </dialog>
  );
}

function SearchIcon({ className }: { className?: string }) {
  return (
    <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.2" strokeLinecap="round" className={className} aria-hidden>
      <circle cx="11" cy="11" r="7" />
      <path d="m20 20-3.5-3.5" />
    </svg>
  );
}

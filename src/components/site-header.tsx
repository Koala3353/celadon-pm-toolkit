"use client";

import { useEffect, useState } from "react";
import { createPortal } from "react-dom";
import Image from "next/image";
import Link from "next/link";
import { usePathname } from "next/navigation";
import { asset } from "@/lib/asset";
import { cn } from "@/lib/cn";
import { NAV, MAIN_SITE_URL } from "@/lib/site";
import { Container } from "@/components/ui/container";
import { SearchButton } from "@/components/search";

/**
 * Same header as ateneoceladon.com: sticky white bar, Dreagle mark, uppercase
 * pill nav with an underline on the active section, slide-in panel on mobile.
 * The right side swaps A-yi's Corner for site search.
 */
export function SiteHeader() {
  const pathname = usePathname() ?? "/";
  const [menuOpen, setMenuOpen] = useState(false);

  return (
    <header
      className="sticky top-0 border-b border-border bg-white/85 backdrop-blur-md"
      style={{ zIndex: "var(--z-nav)" }}
    >
      <Container className="flex h-16 items-center justify-between gap-3 sm:h-[4.5rem]">
        <div className="flex min-w-0 items-center gap-2 lg:gap-6">
          <Link
            href="/"
            aria-label="CLDN PM Toolkit — home"
            className="flex shrink-0 items-center gap-3 rounded-lg focus-visible:outline-2 focus-visible:outline-offset-4 focus-visible:outline-navy"
          >
            <Image
              src={asset("/brand/dreagle-mark.png")}
              alt=""
              width={775}
              height={775}
              priority
              className="h-12 w-auto sm:h-14"
            />
            <span className="flex flex-col leading-none">
              <span className="text-[0.95rem] font-black uppercase tracking-tight text-navy">PM Toolkit</span>
              <span className="mt-1 text-[0.62rem] font-bold uppercase tracking-[0.16em] text-muted-foreground">
                CLDN 2026–2027
              </span>
            </span>
          </Link>

          <nav aria-label="Main" className="hidden items-center gap-0.5 lg:flex">
            {NAV.map((item) => (
              <NavLink key={item.href} item={item} pathname={pathname} />
            ))}
          </nav>
        </div>

        <div className="flex items-center gap-1.5">
          <SearchButton />
          <button
            type="button"
            onClick={() => setMenuOpen(true)}
            aria-label="Open menu"
            aria-haspopup="dialog"
            aria-expanded={menuOpen}
            className="pressable flex h-10 w-10 items-center justify-center rounded-full text-navy transition-colors hover:bg-navy-tint focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-navy lg:hidden"
          >
            <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" className="h-5 w-5" aria-hidden>
              <path d="M4 6h16M4 12h16M4 18h16" />
            </svg>
          </button>
        </div>
      </Container>

      {menuOpen && <MobileMenu pathname={pathname} onClose={() => setMenuOpen(false)} />}
    </header>
  );
}

function isActive(pathname: string, href: string) {
  const base = href.replace(/\/$/, "");
  return pathname === href || pathname === base || pathname.startsWith(`${base}/`);
}

function NavLink({
  item,
  pathname,
  onClick,
  variant = "pill",
}: {
  item: { href: string; label: string };
  pathname: string;
  onClick?: () => void;
  variant?: "pill" | "block";
}) {
  const active = isActive(pathname, item.href);

  return (
    <Link
      href={item.href}
      onClick={onClick}
      aria-current={active ? "page" : undefined}
      className={cn(
        "relative font-bold uppercase tracking-wider transition-colors",
        "focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-navy",
        variant === "pill" &&
          cn("rounded-full px-3.5 py-2 text-[0.8rem]", active ? "text-navy" : "text-muted-foreground hover:text-navy"),
        variant === "block" &&
          cn(
            "rounded-2xl px-4 py-3 text-base",
            active ? "bg-navy-tint text-navy" : "text-muted-foreground hover:bg-navy-tint hover:text-navy"
          )
      )}
    >
      {item.label}
      {variant === "pill" && active && (
        <span aria-hidden className="absolute inset-x-3.5 -bottom-px h-0.5 rounded-full bg-navy" />
      )}
    </Link>
  );
}

const MENU_TRANSITION_MS = 300;

function MobileMenu({ pathname, onClose }: { pathname: string; onClose: () => void }) {
  const [visible, setVisible] = useState(false);

  useEffect(() => {
    const id = requestAnimationFrame(() => setVisible(true));
    return () => cancelAnimationFrame(id);
  }, []);

  const handleClose = () => {
    setVisible(false);
    window.setTimeout(onClose, MENU_TRANSITION_MS);
  };

  useEffect(() => {
    const onKeyDown = (e: KeyboardEvent) => {
      if (e.key === "Escape") handleClose();
    };
    document.addEventListener("keydown", onKeyDown);
    const previousOverflow = document.body.style.overflow;
    document.body.style.overflow = "hidden";
    return () => {
      document.removeEventListener("keydown", onKeyDown);
      document.body.style.overflow = previousOverflow;
    };
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  return createPortal(
    <div role="dialog" aria-modal="true" aria-label="Main menu" className="fixed inset-0 lg:hidden" style={{ zIndex: "var(--z-overlay)" }}>
      <div
        aria-hidden
        onClick={handleClose}
        className={cn(
          "absolute inset-0 bg-ink/80 backdrop-blur-sm transition-opacity duration-300 ease-[var(--ease-out)]",
          visible ? "opacity-100" : "opacity-0"
        )}
      />
      <div
        className={cn(
          "absolute inset-y-0 right-0 flex w-full max-w-xs flex-col bg-white p-6 shadow-[var(--shadow-lg)] transition-transform duration-300 ease-[var(--ease-out)]",
          visible ? "translate-x-0" : "translate-x-full"
        )}
      >
        <div className="flex items-center justify-between">
          <span className="eyebrow text-accent-ink">Menu</span>
          <button
            type="button"
            onClick={handleClose}
            aria-label="Close menu"
            className="pressable flex h-10 w-10 items-center justify-center rounded-full text-navy transition-colors hover:bg-navy-tint focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-navy"
          >
            <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" className="h-5 w-5" aria-hidden>
              <path d="M18 6 6 18M6 6l12 12" />
            </svg>
          </button>
        </div>

        <nav aria-label="Main" className="mt-8 flex flex-col gap-1">
          <NavLink item={{ href: "/", label: "Home" }} pathname={pathname === "/" ? "/" : "/__"} onClick={handleClose} variant="block" />
          {NAV.map((item) => (
            <NavLink key={item.href} item={item} pathname={pathname} onClick={handleClose} variant="block" />
          ))}
        </nav>

        <a
          href={MAIN_SITE_URL}
          className="mt-auto flex items-center gap-1.5 rounded-2xl px-4 py-3 text-sm font-bold uppercase tracking-wider text-muted-foreground transition-colors hover:bg-navy-tint hover:text-navy"
        >
          ateneoceladon.com <span aria-hidden>&rarr;</span>
        </a>
      </div>
    </div>,
    document.body
  );
}

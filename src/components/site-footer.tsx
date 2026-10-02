import Image from "next/image";
import Link from "next/link";
import { asset } from "@/lib/asset";
import { NAV, MAIN_SITE_URL, REPO_URL } from "@/lib/site";
import { Container } from "@/components/ui/container";

const SOCIALS = [
  { label: "Instagram", href: "https://www.instagram.com/ateneoceladon/" },
  { label: "Facebook", href: "https://www.facebook.com/celadonateneo" },
  { label: "TikTok", href: "https://www.tiktok.com/@achiceladon" },
];

export function SiteFooter() {
  return (
    <footer className="navy-field mt-24 text-on-navy">
      <Container className="grid gap-10 py-14 lg:grid-cols-[1.5fr_1fr_1fr]">
        <div className="flex flex-col gap-4">
          <Image
            src={asset("/brand/dreagle-mark-white.png")}
            alt=""
            width={5000}
            height={5000}
            className="h-16 w-auto self-start"
          />
          <h2 className="display text-2xl text-white sm:text-3xl">Have questions?</h2>
          <p className="prose-body max-w-sm text-sm">
            Message any member of the{" "}
            <Link href="/directory/" className="font-semibold text-white underline underline-offset-4 hover:no-underline">
              EBCB 2026–2027
            </Link>
            . For anything about a specific process, start with that department.
          </p>
        </div>

        <nav aria-label="Footer" className="flex flex-col gap-3">
          <h2 className="eyebrow text-white">Toolkit</h2>
          {NAV.map((item) => (
            <Link
              key={item.href}
              href={item.href}
              className="w-fit text-sm text-on-navy underline-offset-4 transition-colors hover:text-white hover:underline"
            >
              {item.label}
            </Link>
          ))}
        </nav>

        <div className="flex flex-col gap-3">
          <h2 className="eyebrow text-white">Ateneo Celadon</h2>
          <a href={MAIN_SITE_URL} className="w-fit text-sm text-on-navy underline-offset-4 hover:text-white hover:underline">
            ateneoceladon.com
          </a>
          {SOCIALS.map((s) => (
            <a key={s.label} href={s.href} className="w-fit text-sm text-on-navy underline-offset-4 hover:text-white hover:underline">
              {s.label}
            </a>
          ))}
        </div>
      </Container>

      <Container>
        <div className="flex flex-col gap-2 border-t border-white/10 py-5 text-xs text-on-navy/80 sm:flex-row sm:items-center sm:justify-between">
          <p>© 2026 Ateneo Celadon · Built by the OSR EBCB</p>
          <a href={REPO_URL} className="w-fit underline-offset-4 hover:text-white hover:underline">
            Suggest an edit on GitHub
          </a>
        </div>
      </Container>
    </footer>
  );
}

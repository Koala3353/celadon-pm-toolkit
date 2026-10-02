import Image from "next/image";
import Link from "next/link";
import { asset } from "@/lib/asset";
import { WEBSITE_CONTACT } from "@/lib/site";
import { Container } from "@/components/ui/container";

const SOCIALS = [
  { label: "Facebook", href: "https://www.facebook.com/celadonateneo", Icon: FacebookIcon },
  { label: "Instagram", href: "https://www.instagram.com/ateneoceladon/", Icon: InstagramIcon },
  { label: "TikTok", href: "https://www.tiktok.com/@achiceladon", Icon: TikTokIcon },
];

const FOOTER_LINKS = [
  { href: "/", label: "Home" },
  { href: "/guides/", label: "Guides" },
  { href: "/resources/", label: "Others" },
];

/** Same content as the Google Site's footer, plus the website contact. */
export function SiteFooter() {
  return (
    <footer className="navy-field mt-24 text-on-navy">
      <Container className="flex flex-col gap-8 py-14 md:flex-row md:items-end md:justify-between">
        <div className="flex flex-col gap-4">
          <Image
            src={asset("/brand/dreagle-mark-white.png")}
            alt=""
            width={5000}
            height={5000}
            className="h-16 w-auto self-start"
          />
          <h2 className="display text-2xl text-white sm:text-3xl">Have Questions?</h2>
          <p className="prose-body max-w-sm text-sm">
            Send a message to any member of the{" "}
            <Link href="/directory/" className="font-semibold text-white underline underline-offset-4 hover:no-underline">
              EBCB 2026 - 2027
            </Link>{" "}
            !
          </p>
          <p className="prose-body max-w-sm text-sm">
            Website issues: message the{" "}
            <Link href={WEBSITE_CONTACT.href} className="font-semibold text-white underline underline-offset-4 hover:no-underline">
              {WEBSITE_CONTACT.label}
            </Link>
            .
          </p>
        </div>

        <div className="flex flex-col gap-4 md:items-end">
          <div className="flex gap-5">
            {SOCIALS.map(({ label, href, Icon }) => (
              <a
                key={label}
                href={href}
                aria-label={label}
                className="text-on-navy transition-colors hover:text-white focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-white"
              >
                <Icon className="h-6 w-6" />
              </a>
            ))}
          </div>
          <nav aria-label="Footer" className="flex items-center gap-2 text-sm">
            {FOOTER_LINKS.map((item, i) => (
              <span key={item.href} className="flex items-center gap-2">
                {i > 0 && <span aria-hidden>|</span>}
                <Link href={item.href} className="text-on-navy underline-offset-4 hover:text-white hover:underline">
                  {item.label}
                </Link>
              </span>
            ))}
          </nav>
          <p className="text-xs text-on-navy/80">©2026 by Ateneo Celadon | Built by the OSR EBCB</p>
        </div>
      </Container>
    </footer>
  );
}

type IconProps = { className?: string };

function FacebookIcon({ className }: IconProps) {
  return (
    <svg viewBox="0 0 24 24" fill="currentColor" className={className} aria-hidden>
      <path d="M13.5 21v-7.5h2.5l.4-3h-2.9V8.6c0-.9.3-1.5 1.5-1.5h1.5V4.4c-.3 0-1.2-.1-2.2-.1-2.2 0-3.7 1.3-3.7 3.8v2.4H8v3h2.6V21h2.9Z" />
    </svg>
  );
}

function InstagramIcon({ className }: IconProps) {
  return (
    <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.75" strokeLinecap="round" strokeLinejoin="round" className={className} aria-hidden>
      <rect x="3" y="3" width="18" height="18" rx="5" />
      <circle cx="12" cy="12" r="4" />
      <circle cx="17.5" cy="6.5" r="0.75" fill="currentColor" stroke="none" />
    </svg>
  );
}

function TikTokIcon({ className }: IconProps) {
  return (
    <svg viewBox="0 0 24 24" fill="currentColor" className={className} aria-hidden>
      <path d="M16.6 3c.3 2.2 1.6 3.6 3.9 3.8v2.6c-1.4.1-2.6-.3-3.9-1.1v5.2c0 6.5-7.1 8.5-10 3.9-1.9-3-.7-8.2 5.4-8.4v2.7c-.5.1-1 .2-1.4.4-1.4.5-2.2 1.3-2 2.9.4 3 5.9 3.9 5.4-2V3h2.6Z" />
    </svg>
  );
}

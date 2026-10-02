import Link from "next/link";
import { Container } from "@/components/ui/container";
import { WEBSITE_CONTACT } from "@/lib/site";

export default function NotFound() {
  return (
    <Container className="flex flex-col items-start gap-5 py-24 sm:py-32">
      <h1 className="display text-4xl text-navy sm:text-6xl">Page not found</h1>
      <p className="prose-body max-w-xl text-muted-foreground">
        If a link on this site brought you here, message the{" "}
        <Link href={WEBSITE_CONTACT.href} className="font-semibold text-link underline underline-offset-2">
          {WEBSITE_CONTACT.label}
        </Link>
        .
      </p>
      <Link href="/" className="pressable rounded-full bg-navy px-6 py-3 text-sm font-extrabold uppercase tracking-wider text-white">
        Home
      </Link>
    </Container>
  );
}

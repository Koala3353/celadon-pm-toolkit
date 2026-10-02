import Link from "next/link";
import { Container } from "@/components/ui/container";

export default function NotFound() {
  return (
    <Container className="flex flex-col items-start gap-5 py-24 sm:py-32">
      <p className="eyebrow text-accent-ink">Page not found</p>
      <h1 className="display text-4xl text-navy sm:text-6xl">This page moved or never existed</h1>
      <p className="prose-body max-w-xl text-muted-foreground">
        Links from the old Google Site won&rsquo;t work here. Head to the home page and use the &ldquo;I need to…&rdquo; list or search
        to find what you were after.
      </p>
      <Link href="/" className="pressable rounded-full bg-navy px-6 py-3 text-sm font-extrabold uppercase tracking-wider text-white">
        Go to the toolkit home
      </Link>
    </Container>
  );
}

import Image from "next/image";
import Link from "next/link";
import { asset } from "@/lib/asset";
import { allGuides, allResources } from "@/lib/content";
import { DEPTS } from "@/lib/site";
import { Container } from "@/components/ui/container";
import { Reveal } from "@/components/motion/reveal";
import { SearchButton } from "@/components/search";

/**
 * THESIS: the toolkit is a task index, not a brochure. The first viewport
 * answers "what do I need to do?" and routes a PM straight to the section,
 * instead of the Google Site's wall of identical "Explore Here >" cards.
 * OWN-WORLD: ateneoceladon.com's navy field, Montserrat 900 caps, Ayi mascots
 * per department, one orange accent for things that need attention.
 */

const TASKS = [
  { label: "Submit a PPF", href: "/procedures/#internal-approval-steps", dept: "op" },
  { label: "Book a venue with CFMO", href: "/procedures/#cfmo-venue-reservations", dept: "op" },
  { label: "Get my brandbook and DRF approved", href: "/guides/commpub/#the-deliverable-request-form", dept: "commpub" },
  { label: "Post on Celadon's socials", href: "/guides/commpub/#posting-on-social-media", dept: "commpub" },
  { label: "Find and sign sponsors", href: "/guides/exrel/#how-partnerships-are-won", dept: "exrel" },
  { label: "Set up my FIN tracker", href: "/guides/fin/#the-fin-tracker", dept: "fin" },
  { label: "Get reimbursed", href: "/guides/fin/#option-2-reimbursement", dept: "fin" },
  { label: "Run core team applications", href: "/guides/osr/#core-team-applications-cta", dept: "osr" },
  { label: "Send an email blast", href: "/guides/osr/#email-blasts", dept: "osr" },
  { label: "File a leave of absence", href: "/guides/hr/#leave-of-absence", dept: "hr" },
  { label: "Plan my GA and meetings", href: "/resources/meeting-guide/#baseline-meetings", dept: "op" },
  { label: "Handle a conflict in my team", href: "/resources/conflict/", dept: "op" },
] as const;

export default function HomePage() {
  const guides = allGuides();
  const resources = allResources();

  return (
    <>
      <section className="navy-field relative overflow-hidden text-on-navy">
        <div className="navy-grid">
          <Container className="grid gap-12 pb-16 pt-14 sm:pb-20 sm:pt-20 lg:grid-cols-[minmax(0,1.15fr)_minmax(0,1fr)] lg:gap-16">
            <div className="flex min-w-0 flex-col gap-6">
              <p className="eyebrow text-link-navy">
                Project Manager Toolkit · 2026–2027
              </p>
              <h1 className="display text-5xl text-white sm:text-6xl xl:text-7xl">
                Run your project the Celadon way
              </h1>
              <div className="prose-body flex max-w-xl flex-col gap-3 text-[1.05rem] text-on-navy">
                <p>
                  This year, we&rsquo;re acting on member feedback to strengthen relationships and the systems behind
                  every project, so Celadon can be a home and a safe place for each of its members.
                </p>
                <p>
                  <strong className="text-white">You&rsquo;ve been entrusted with turning Celadon&rsquo;s vision into reality.</strong>{" "}
                  Everything you need to know about our internal and external processes is here.
                </p>
                <p className="text-sm font-semibold text-link-navy">— The EBCB 2026–2027</p>
              </div>
              <div className="flex flex-wrap items-center gap-3">
                <Link
                  href="/procedures/"
                  className="pressable rounded-full bg-white px-6 py-3 text-sm font-extrabold uppercase tracking-wider text-navy transition-colors hover:bg-navy-tint"
                >
                  Start with procedures
                </Link>
                <SearchButton className="h-[2.85rem] bg-white/10 px-5 text-white hover:bg-white/20 [&_kbd]:border-white/20 [&_kbd]:bg-white/10 [&_kbd]:text-on-navy" />
              </div>
            </div>

            <div className="min-w-0">
              <div className="rounded-[1.75rem] bg-white p-5 text-ink shadow-[var(--shadow-lg)] sm:p-6">
                <h2 className="text-xs font-extrabold uppercase tracking-[0.16em] text-accent-ink">I need to…</h2>
                <ul className="mt-4 grid gap-1.5 sm:grid-cols-2 lg:grid-cols-1 xl:grid-cols-2">
                  {TASKS.map((t) => (
                    <li key={t.href}>
                      <Link
                        href={t.href}
                        className="group flex items-center justify-between gap-3 rounded-xl px-3 py-2.5 text-sm font-bold text-navy transition-colors hover:bg-navy-tint"
                      >
                        <span className="flex min-w-0 items-center gap-2.5">
                          <span
                            aria-hidden
                            className="h-2 w-2 shrink-0 rounded-full"
                            style={{ background: DEPTS[t.dept].accent.base }}
                          />
                          {t.label}
                        </span>
                        <span aria-hidden className="text-muted-foreground transition-transform duration-200 group-hover:translate-x-0.5">
                          →
                        </span>
                      </Link>
                    </li>
                  ))}
                </ul>
              </div>
            </div>
          </Container>
        </div>
      </section>

      <Container className="pt-16 sm:pt-24">
        <Reveal className="grid gap-10 lg:grid-cols-[minmax(0,1fr)_minmax(0,2fr)] lg:gap-16">
          <div data-reveal className="flex flex-col gap-4">
            <p className="eyebrow text-accent-ink">Start here</p>
            <h2 className="display text-3xl text-navy sm:text-5xl">Every project, four stages</h2>
            <p className="prose-body max-w-md text-muted-foreground">
              From your first IC with your department EBCB to the sustainability report with OSR. Project Procedures walks
              through each stage and the campus offices you&rsquo;ll deal with.
            </p>
            <Link href="/procedures/" className="mt-1 w-fit text-sm font-extrabold uppercase tracking-wider text-link hover:underline">
              Read Project Procedures →
            </Link>
          </div>
          <ol data-reveal className="grid gap-3 sm:grid-cols-2">
            {[
              ["Initiation", "Vision, PPF, budget, brandbook and DRF, core team recruitment."],
              ["Planning", "General assembly, core heads meeting, trackers, presentations."],
              ["Executing", "Pre-event briefing, dry run, and the event itself."],
              ["Closure", "Partner obligations, evaluations, and the sustainability report."],
            ].map(([stage, body], i) => (
              <li key={stage} className="rounded-[1.25rem] bg-navy-tint p-5">
                <span className="tnum text-xs font-extrabold uppercase tracking-[0.14em] text-muted-foreground">Stage {i + 1}</span>
                <span className="mt-1 block text-xl font-black uppercase text-navy">{stage}</span>
                <span className="prose-body mt-2 block text-sm text-muted-foreground">{body}</span>
              </li>
            ))}
          </ol>
        </Reveal>
      </Container>

      <Container className="pt-20 sm:pt-28">
        <div className="flex flex-col gap-3">
          <p className="eyebrow text-accent-ink">Department guides</p>
          <h2 className="display text-3xl text-navy sm:text-5xl">What each department needs from you</h2>
        </div>
        <Reveal as="ul" className="mt-10 grid gap-4 sm:grid-cols-2 lg:grid-cols-3">
          {guides.map((g) => {
            const dept = DEPTS[g.dept ?? "op"];
            return (
              <li key={g.slug} data-reveal>
                <Link
                  href={`/guides/${g.slug}/`}
                  className="lift group relative flex h-full flex-col overflow-hidden rounded-[1.5rem] border border-border bg-white"
                >
                  <div className="relative flex h-36 items-end justify-between px-5 pb-0 pt-5" style={{ background: dept.accent.tint }}>
                    <span className="display text-4xl" style={{ color: dept.accent.ink }}>
                      {dept.short}
                    </span>
                    <Image
                      src={asset(dept.ayi)}
                      alt=""
                      width={300}
                      height={300}
                      className="-mb-3 h-32 w-auto transition-transform duration-300 ease-[var(--ease-out)] group-hover:-translate-y-1"
                    />
                  </div>
                  <div aria-hidden className="h-1" style={{ background: dept.accent.base }} />
                  <div className="flex flex-1 flex-col gap-2 p-5">
                    <span className="text-xs font-bold uppercase tracking-wider text-muted-foreground">{dept.name}</span>
                    <span className="text-lg font-extrabold text-navy">{g.title}</span>
                    <span className="prose-body text-sm text-muted-foreground">{g.summary}</span>
                  </div>
                </Link>
              </li>
            );
          })}
        </Reveal>
      </Container>

      <Container className="pt-20 sm:pt-28">
        <div className="grid gap-10 rounded-[2rem] bg-muted p-6 sm:p-10 lg:grid-cols-[minmax(0,1fr)_minmax(0,1.6fr)]">
          <div className="flex flex-col gap-3">
            <p className="eyebrow text-accent-ink">Leading your team</p>
            <h2 className="display text-3xl text-navy sm:text-4xl">The people side of the job</h2>
            <p className="prose-body text-muted-foreground">
              How to run meetings, give feedback, show appreciation, and work through conflict with your core team.
            </p>
            <Link href="/resources/" className="mt-1 w-fit text-sm font-extrabold uppercase tracking-wider text-link hover:underline">
              All resources and tools →
            </Link>
          </div>
          <ul className="grid gap-3 sm:grid-cols-2">
            {resources.map((r) => (
              <li key={r.slug}>
                <Link href={`/resources/${r.slug}/`} className="lift flex h-full flex-col gap-1.5 rounded-[1.25rem] bg-white p-5">
                  <span className="font-extrabold text-navy">{r.title}</span>
                  <span className="prose-body text-sm text-muted-foreground">{r.summary}</span>
                </Link>
              </li>
            ))}
          </ul>
        </div>
      </Container>
    </>
  );
}

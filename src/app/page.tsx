import { Container } from "@/components/ui/container";
import { PageHero } from "@/components/page-hero";
import { NavCards } from "@/components/nav-cards";
import { HOME_CARDS, SITE_NAME } from "@/lib/site";

/** Same content as the Google Site's home page. */
export default function HomePage() {
  return (
    <>
      <PageHero title={SITE_NAME} />

      <Container className="pt-14 sm:pt-20" data-pagefind-body>
        <section className="mx-auto flex max-w-3xl flex-col gap-5">
          <h2 className="display text-center text-3xl text-navy sm:text-5xl">Letter from the EBCB ✈️💙</h2>
          <div className="prose-body flex flex-col gap-4 text-[1.05rem] text-ink">
            <p>
              Good day! Welcome to <strong>Celadon&rsquo;s Project Manager Toolkit.</strong>
            </p>
            <p>
              This year, we aim to improve the Celadonean experience by acting on member feedback to strengthen
              interpersonal relationships and internal systems within the organization.
            </p>
            <p>
              With this, we hope for Celadon to be a home and a safe place for each and every one of its members. We want
              to build a Celadon where we can grow as people, true to ourselves.
            </p>
            <p>
              YOU, as a manager, have been entrusted with turning Celadon&rsquo;s <em>vision into reality</em>. Thus, this
              toolkit is filled with information on internal and external processes and systems that you may use to be
              the best manager that you can be!
            </p>
          </div>
        </section>

        <section className="pt-16 sm:pt-24">
          <h2 className="display mb-8 text-center text-3xl text-navy sm:text-4xl">Navigation</h2>
          <NavCards cards={HOME_CARDS} />
        </section>
      </Container>
    </>
  );
}

import type { Metadata } from "next";
import { Container } from "@/components/ui/container";
import { PageHero } from "@/components/page-hero";
import { NavCards } from "@/components/nav-cards";
import { GUIDE_CARDS } from "@/lib/site";

export const metadata: Metadata = { title: "Guides" };

/** Same content as the Google Site's Guides page. */
export default function GuidesIndex() {
  return (
    <>
      <PageHero title="Guides" />
      <Container className="pt-12 sm:pt-16">
        <h2 className="display mb-8 text-center text-3xl text-navy sm:text-4xl">Navigation</h2>
        <NavCards cards={GUIDE_CARDS} />
      </Container>
    </>
  );
}

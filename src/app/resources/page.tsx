import type { Metadata } from "next";
import { Container } from "@/components/ui/container";
import { PageHero } from "@/components/page-hero";
import { NavCards } from "@/components/nav-cards";
import { OTHERS_CARDS } from "@/lib/site";

export const metadata: Metadata = { title: "Others" };

/** Same content as the Google Site's Others page. */
export default function OthersPage() {
  return (
    <>
      <PageHero title="Others" />
      <Container className="pt-12 sm:pt-16">
        <h2 className="display mb-8 text-center text-3xl text-navy sm:text-4xl">Navigation</h2>
        <NavCards cards={OTHERS_CARDS} />
      </Container>
    </>
  );
}

import type { Metadata } from "next";
import { DocPage } from "@/components/doc-page";
import { loadPage } from "@/lib/content";

export const metadata: Metadata = {
  title: "About Celadon",
};

export default async function AboutPage() {
  const page = await loadPage("about");
  return <DocPage page={page} />;
}

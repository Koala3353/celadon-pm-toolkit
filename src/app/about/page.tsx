import type { Metadata } from "next";
import { DocPage } from "@/components/doc-page";
import { loadPage, loadMeta } from "@/lib/content";

export const metadata: Metadata = {
  title: "About Celadon",
  description: loadMeta("about").summary,
};

export default async function AboutPage() {
  const page = await loadPage("about");
  return <DocPage page={page} crumbs={[{ href: "/", label: "Home" }]} />;
}

import type { Metadata } from "next";
import { DocPage } from "@/components/doc-page";
import { loadPage, loadMeta } from "@/lib/content";

export const metadata: Metadata = {
  title: "Project Procedures",
  description: loadMeta("procedures").summary,
};

export default async function ProceduresPage() {
  const page = await loadPage("procedures");
  return (
    <DocPage
      page={page}
      crumbs={[{ href: "/", label: "Home" }]}
      prevNext={{ next: { href: "/guides/commpub/", title: "COMMPUB Guide" } }}
    />
  );
}

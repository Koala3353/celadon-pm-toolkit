import type { Metadata } from "next";
import { DocPage } from "@/components/doc-page";
import { loadPage } from "@/lib/content";

export const metadata: Metadata = {
  title: "Project Procedures",
};

export default async function ProceduresPage() {
  const page = await loadPage("procedures");
  return (
    <DocPage page={page} />
  );
}

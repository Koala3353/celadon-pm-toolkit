import type { MetadataRoute } from "next";
import { GUIDE_SLUGS, RESOURCE_SLUGS, SITE_URL } from "@/lib/site";

export const dynamic = "force-static";

export default function sitemap(): MetadataRoute.Sitemap {
  const paths = [
    "/",
    "/procedures/",
    "/guides/",
    ...GUIDE_SLUGS.map((s) => `/guides/${s}/`),
    "/resources/",
    ...RESOURCE_SLUGS.map((s) => `/resources/${s}/`),
    "/directory/",
    "/about/",
  ];
  return paths.map((p) => ({ url: `${SITE_URL}${p}` }));
}

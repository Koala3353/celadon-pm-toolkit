import fs from "node:fs";
import path from "node:path";
import matter from "gray-matter";
import { renderMarkdown, type TocItem } from "@/lib/markdown";
import { GUIDE_SLUGS, RESOURCE_SLUGS, REPO_URL, type DeptSlug } from "@/lib/site";

const CONTENT_DIR = path.join(process.cwd(), "content");

export interface PageMeta {
  title: string;
  dept?: DeptSlug;
  order: number;
}

export interface Page {
  meta: PageMeta;
  html: string;
  toc: TocItem[];
  /** Path inside the repo, for the "Edit this page" link. */
  file: string;
  editUrl: string;
}

const REQUIRED: (keyof PageMeta)[] = ["title", "order"];

function readMeta(file: string, data: Record<string, unknown>): PageMeta {
  for (const key of REQUIRED) {
    if (data[key] === undefined || data[key] === "") {
      throw new Error(`${file}: frontmatter is missing "${key}"`);
    }
  }
  return {
    title: String(data.title),
    dept: data.dept ? (String(data.dept) as DeptSlug) : undefined,
    order: Number(data.order),
  };
}

export async function loadPage(relPath: string): Promise<Page> {
  const file = `content/${relPath}.md`;
  const raw = fs.readFileSync(path.join(CONTENT_DIR, `${relPath}.md`), "utf8");
  const { data, content } = matter(raw);
  const meta = readMeta(file, data);
  const { html, toc } = await renderMarkdown(content);
  return {
    meta,
    html,
    toc,
    file,
    editUrl: `${REPO_URL}/edit/main/${file}`,
  };
}

/** Frontmatter only, for index cards. */
export function loadMeta(relPath: string): PageMeta {
  const raw = fs.readFileSync(path.join(CONTENT_DIR, `${relPath}.md`), "utf8");
  return readMeta(`content/${relPath}.md`, matter(raw).data);
}

export const guidePath = (slug: string) => `guides/${slug}`;
export const resourcePath = (slug: string) => `resources/${slug}`;

export function allGuides() {
  return GUIDE_SLUGS.map((slug) => ({ slug, ...loadMeta(guidePath(slug)) })).sort((a, b) => a.order - b.order);
}

export function allResources() {
  return RESOURCE_SLUGS.map((slug) => ({ slug, ...loadMeta(resourcePath(slug)) })).sort((a, b) => a.order - b.order);
}

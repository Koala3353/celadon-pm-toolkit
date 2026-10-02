import { unified } from "unified";
import remarkParse from "remark-parse";
import remarkGfm from "remark-gfm";
import remarkDirective from "remark-directive";
import remarkRehype from "remark-rehype";
import rehypeSlug from "rehype-slug";
import rehypeStringify from "rehype-stringify";
import GithubSlugger from "github-slugger";
import { visit, SKIP } from "unist-util-visit";
import { toString } from "hast-util-to-string";
import type { Root as MdRoot } from "mdast";
import type { Root as HRoot, Element, ElementContent, Text } from "hast";

/**
 * Markdown → HTML for toolkit pages.
 *
 * Authors write plain GitHub-flavoured Markdown plus a small set of `:::`
 * container blocks (see CONTENT.md for the full list). Each block becomes a
 * classed element styled in globals.css, so content files never carry HTML.
 */

export interface TocItem {
  id: string;
  text: string;
  depth: 2 | 3;
}

const CALLOUT_LABEL: Record<string, string> = {
  note: "Note",
  confirm: "Needs EBCB confirmation",
};

/** Containers that map 1:1 onto a classed <div>. */
const PLAIN_CONTAINERS = new Set([
  "steps",
  "stages",
  "links",
  "columns",
  "compare",
  "contacts",
  "flow",
  "times",
  "quotes",
  "offices",
  "meetings",
]);

type DirectiveNode = {
  type: "containerDirective" | "leafDirective" | "textDirective";
  name: string;
  attributes?: Record<string, string | null | undefined> | null;
  children: unknown[];
  data?: Record<string, unknown>;
};

function remarkToolkitBlocks() {
  return (tree: MdRoot) => {
    const slugger = new GithubSlugger();
    visit(tree, (node) => {
      const n = node as unknown as DirectiveNode;
      if (n.type !== "containerDirective") return;
      const attrs = n.attributes ?? {};
      const title = attrs.title ?? "";

      if (n.name === "note" || n.name === "confirm") {
        const head = {
          type: "paragraph",
          data: { hName: "p", hProperties: { className: ["callout-label"] } },
          children: [
            { type: "text", value: CALLOUT_LABEL[n.name] + (title ? ` · ${title}` : "") },
          ],
        };
        n.children = [head, ...n.children];
        n.data = {
          hName: "aside",
          hProperties: { className: ["callout", `callout-${n.name}`], role: "note" },
        };
        return;
      }

      if (n.name === "details") {
        const id = slugger.slug(title || "details");
        n.children = [
          {
            type: "paragraph",
            data: { hName: "summary" },
            children: [{ type: "text", value: title }],
          },
          {
            type: "wrapper",
            data: { hName: "div", hProperties: { className: ["acc-body"] } },
            children: n.children,
          },
        ];
        n.data = { hName: "details", hProperties: { className: ["acc"], id, "data-toc": title } };
        return;
      }

      if (n.name === "meeting") {
        const who = attrs.who ?? "";
        n.children = [
          {
            type: "paragraph",
            data: { hName: "h3", hProperties: { className: ["meeting-title"] } },
            children: [{ type: "text", value: title }],
          },
          {
            type: "paragraph",
            data: { hName: "p", hProperties: { className: ["meeting-who"] } },
            children: [{ type: "text", value: who }],
          },
          ...n.children,
        ];
        n.data = { hName: "article", hProperties: { className: ["meeting"] } };
        return;
      }

      if (n.name === "quote") {
        n.children = [
          { type: "wrapper", data: { hName: "blockquote" }, children: n.children },
          {
            type: "paragraph",
            data: { hName: "figcaption" },
            children: [{ type: "text", value: attrs.source ?? "" }],
          },
        ];
        n.data = { hName: "figure", hProperties: { className: ["quote"] } };
        return;
      }

      if (n.name === "pull") {
        n.data = { hName: "blockquote", hProperties: { className: ["pull"] } };
        return;
      }

      if (PLAIN_CONTAINERS.has(n.name)) {
        n.data = { hName: "div", hProperties: { className: ["blk", `blk-${n.name}`] } };
      }
    });
  };
}

function hasClass(el: Element, cls: string): boolean {
  const c = el.properties?.className;
  return Array.isArray(c) && c.includes(cls);
}

function isElement(n: unknown): n is Element {
  return !!n && (n as Element).type === "element";
}

/** A paragraph that is only a bold label ("**Pros**") starts a new group. */
function isGroupLabel(n: ElementContent): boolean {
  if (!isElement(n) || n.tagName !== "p") return false;
  const kids = n.children.filter((k) => !(k.type === "text" && !k.value.trim()));
  return kids.length >= 1 && isElement(kids[0]) && kids[0].tagName === "strong";
}

const EMAIL_RE = /[A-Za-z0-9._%+-]+@[A-Za-z0-9.-]+\.[A-Za-z]{2,}/g;

function linkKind(href: string): string | null {
  try {
    const u = new URL(href);
    const h = u.hostname;
    if (h === "docs.google.com") {
      if (u.pathname.startsWith("/spreadsheets")) return "Google Sheet";
      if (u.pathname.startsWith("/forms")) return "Google Form";
      if (u.pathname.startsWith("/file")) return "Drive file";
      return "Google Doc";
    }
    if (h === "forms.gle") return "Google Form";
    if (h === "drive.google.com") return u.pathname.includes("/folders/") ? "Drive folder" : "Drive file";
    if (h.startsWith("calendar.")) return "Calendar";
    if (h === "canva.link" || h.endsWith("canva.com")) return "Canva";
    if (h === "sites.google.com") return "Website";
    if (h === "m.me") return "Messenger";
    return h.replace(/^www\./, "");
  } catch {
    return null;
  }
}

function rehypeToolkit(options: { toc: TocItem[] }) {
  return (tree: HRoot) => {
    // Group label + following siblings into cards for columns/compare.
    visit(tree, "element", (el: Element) => {
      if (!(hasClass(el, "blk-columns") || hasClass(el, "blk-compare"))) return;
      const kids = el.children.filter((k) => !(k.type === "text" && !k.value.trim()));
      if (!kids.some(isGroupLabel)) {
        el.properties = { ...el.properties, className: ["blk", "blk-flatcols"] };
        return;
      }
      const groups: Element[] = [];
      for (const k of kids) {
        if (isGroupLabel(k) || groups.length === 0) {
          groups.push({ type: "element", tagName: "div", properties: { className: ["col"] }, children: [] });
        }
        groups[groups.length - 1].children.push(k);
      }
      el.children = groups;
    });

    // Office cards: each h3 and what follows it.
    visit(tree, "element", (el: Element) => {
      if (!hasClass(el, "blk-offices")) return;
      const kids = el.children.filter((k) => !(k.type === "text" && !k.value.trim()));
      const cards: Element[] = [];
      for (const k of kids) {
        if ((isElement(k) && k.tagName === "h3") || cards.length === 0) {
          cards.push({ type: "element", tagName: "section", properties: { className: ["office"] }, children: [] });
        }
        cards[cards.length - 1].children.push(k);
      }
      el.children = cards;
    });

    // Link cards: annotate each link with what it opens.
    visit(tree, "element", (el: Element) => {
      if (!hasClass(el, "blk-links")) return;
      const list = el.children.find((k): k is Element => isElement(k) && k.tagName === "ul");
      for (const li of list?.children ?? []) {
        if (!isElement(li) || li.tagName !== "li") continue;
        // A list item's content may be wrapped in a <p> in loose lists; unwrap it.
        if (li.children.length === 1 && isElement(li.children[0]) && li.children[0].tagName === "p") {
          li.children = li.children[0].children;
        }
        const first = li.children.find((k): k is Element => isElement(k) && k.tagName === "a");
        const kind = first ? linkKind(String(first.properties?.href ?? "")) : null;
        if (!kind) continue;
        li.children.unshift({
          type: "element",
          tagName: "span",
          properties: { className: ["kind"], ariaHidden: "true", dataPagefindIgnore: "" },
          children: [{ type: "text", value: kind }],
        });
      }
    });

    // Turn bare email addresses into mailto links (outside links and code).
    visit(tree, "text", (node: Text, index, parent) => {
      if (!parent || index === undefined) return;
      const p = parent as Element;
      if (p.tagName === "a" || p.tagName === "code") return;
      const value = node.value;
      EMAIL_RE.lastIndex = 0;
      if (!EMAIL_RE.test(value)) return;
      EMAIL_RE.lastIndex = 0;
      const out: ElementContent[] = [];
      let last = 0;
      for (const m of value.matchAll(EMAIL_RE)) {
        const at = m.index ?? 0;
        if (at > last) out.push({ type: "text", value: value.slice(last, at) });
        out.push({
          type: "element",
          tagName: "a",
          properties: { href: `mailto:${m[0]}`, className: ["email"] },
          children: [{ type: "text", value: m[0] }],
        });
        last = at + m[0].length;
      }
      if (last < value.length) out.push({ type: "text", value: value.slice(last) });
      p.children.splice(index, 1, ...out);
      return [SKIP, index + out.length];
    });

    // External links open in a new tab; collect the table of contents.
    visit(tree, "element", (el: Element) => {
      if (el.tagName === "a") {
        const href = String(el.properties?.href ?? "");
        if (/^https?:\/\//.test(href)) {
          el.properties = { ...el.properties, target: "_blank", rel: ["noopener", "noreferrer"] };
        }
      }
      if ((el.tagName === "h2" || el.tagName === "h3") && el.properties?.id) {
        const inMeeting = hasClass(el, "meeting-title");
        if (!inMeeting) {
          options.toc.push({
            id: String(el.properties.id),
            text: toString(el),
            depth: el.tagName === "h2" ? 2 : 3,
          });
        }
      }
      if (el.tagName === "details" && el.properties?.id && el.properties["data-toc"]) {
        options.toc.push({ id: String(el.properties.id), text: String(el.properties["data-toc"]), depth: 3 });
        delete el.properties["data-toc"];
      }
    });
  };
}

export async function renderMarkdown(source: string): Promise<{ html: string; toc: TocItem[] }> {
  const toc: TocItem[] = [];
  const file = await unified()
    .use(remarkParse)
    .use(remarkGfm)
    .use(remarkDirective)
    .use(remarkToolkitBlocks)
    .use(remarkRehype)
    .use(rehypeSlug)
    .use(rehypeToolkit, { toc })
    .use(rehypeStringify)
    .process(source);
  return { html: String(file), toc };
}

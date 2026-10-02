# Editing the toolkit

Every page is a Markdown file. To change a page, edit its file and commit to
`main`. The site rebuilds in about two minutes. On GitHub you can do this in
the browser: open the file and press the pencil icon, or use the
**Edit this page on GitHub** link at the bottom of any page.

| Page | File |
| --- | --- |
| Project Procedures | `content/procedures.md` |
| COMMPUB, EXREL, FIN, HR, OSR, OP guides | `content/guides/<dept>.md` |
| Meeting Guide, Performance, Rewards, Conflict | `content/resources/<name>.md` |
| About Celadon | `content/about.md` |
| EBCB Directory | `src/data/directory.ts` |
| Tools list on Resources | `TOOLS` in `src/lib/site.ts` |

Not comfortable editing on GitHub? Send the change to the department's EBCB,
or to the OSR EBCB for anything about the website itself.

## Frontmatter

Each file starts with:

```yaml
---
title: FIN Guide
summary: One sentence shown under the title and in search.
kicker: Financial Affairs      # small label above the title (optional)
dept: fin                      # op, commpub, exrel, fin, hr, osr, cul (optional)
order: 4                       # position in lists
lastReviewed: 2026-10-01       # update this whenever you check the page
---
```

## Writing

Use normal Markdown: `##` for sections (they appear in "On this page"), `###`
for subsections, `**bold**`, lists, `[links](https://…)`, and tables. Email
addresses become links automatically.

## Blocks

Wrap content in `:::name` … `:::` to get a styled block.

| Block | Use it for |
| --- | --- |
| `:::note` | A side note or tip. |
| `:::confirm{title="Short label"}` | Something the EBCB still needs to confirm. Shows as an orange callout and is counted at the top of the page. |
| `:::steps` | A numbered process. Put a numbered list inside; start each item with a **bold** action. |
| `:::stages` | A short sequence of phases shown as tiles. |
| `:::links` | A list of links shown as cards labelled Google Doc, Sheet, Form, Drive, Canva, and so on. |
| `:::details{title="Heading"}` | A collapsible section. It's listed in "On this page" and opens when linked to. |
| `:::columns` / `:::compare` | Side-by-side groups. Start each group with a **bold** line. |
| `:::contacts` | Lines of `Name — email`. |
| `:::flow` | A list shown as an arrow chain (approval flows). |
| `:::times` | Time slots. |
| `:::quote{source="Where it's from"}` | A quoted rule or passage. |
| `:::quotes` | Short example phrases, as speech bubbles. |
| `:::pull` | One large statement. |
| `:::offices` | Office contact cards; start each with `###`. |
| `::::meetings` with `:::meeting{title="…" who="…"}` inside | Meeting cards. |

**Nesting:** when a block contains another block, give the outer one more
colons, for example `::::details{title="…"}` around a `:::note`.

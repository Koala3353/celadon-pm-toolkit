# CLDN PM Toolkit

Ateneo Celadon's Project Manager Toolkit for 2026–2027, ported from the
Google Site to a static website.

**Live:** https://pm.ateneoceladon.com/

## How it works

```
content/*.md  ──next build──▶  out/  ──pagefind──▶  out/pagefind/  ──GitHub Actions──▶  GitHub Pages
```

- Every page is Markdown in [`content/`](content). Editing a page is editing
  one file; see [CONTENT.md](CONTENT.md).
- Site structure, departments, accent colours, and the tools list live in
  [`src/lib/site.ts`](src/lib/site.ts). The EBCB directory is
  [`src/data/directory.ts`](src/data/directory.ts).
- Search is [Pagefind](https://pagefind.app), a static index built after
  `next build`. It needs no server.
- The design is ateneoceladon.com's: tokens, header, motion, and brand assets
  are copied from `Koala3353/celadon-website`. See [DESIGN.md](DESIGN.md).

## Contacts

- **Website issues** (broken links, layout bugs, deploys): Keene Brigado,
  AVP for Organization Strategies and Research,
  keene.xander.brigado@student.ateneo.edu.
- **Content** (what a page says): the department that owns the guide.

## Local development

```bash
npm install
npm run dev     # http://localhost:3000 (search shows "unavailable" in dev)
npm run build   # static export to ./out, plus the search index
npm start       # serves ./out at http://localhost:4321, search included
npm run lint
```

`npm run build` passes `--webpack` for the same reason the main site does:
Turbopack can't load Tailwind v4's `lightningcss` binding yet.

## Deploying

[`.github/workflows/deploy-pages.yml`](.github/workflows/deploy-pages.yml)
builds and publishes on every push to `main`. It needs no secrets.

One-time setup:

1. In the repo, **Settings → Pages → Source: GitHub Actions**.
2. **Settings → Pages → Custom domain:** `pm.ateneoceladon.com`.
   `public/CNAME` already ships in every build.
3. In Cloudflare DNS for `ateneoceladon.com`, add
   `CNAME pm → koala3353.github.io`. Leave it **DNS only** (grey cloud) until
   GitHub has issued the HTTPS certificate, then proxy it like the main site
   if you want.
4. Once the certificate is issued, tick **Enforce HTTPS**.

## What changed from the Google Site

Ported on 2026-10-01 from
`sites.google.com/student.ateneo.edu/cldn-pm-toolkit-2026-2027`. The audit is
in [`docs/audit/`](docs/audit).

- **Fixed:** Reward Practices and Conflict Resolution had swapped content;
  the OSR checklist headings were swapped; COMMPUB email links pointed to the
  wrong people; about 30 paragraphs were accidentally hyperlinked; the FIN PPF
  block was duplicated; closed CFMO form links now point to CFMO's forms
  page; the FIN DSWS link now uses the working form; typos and acronyms.
- **Removed for a public site:** the President's and EVP's mobile numbers,
  a CSMO staff mobile number, the CFMO Zoom passcode, and the University TIN
  (PMs now ask FIN for it).
- **Flagged, not decided:** rules that conflict between or within guides are
  marked with a "Needs EBCB confirmation" callout. Search the content for
  `:::confirm` to find them all.
- **Not carried over:** the Google Site's images. They return 403 outside the
  editor's session. Images that only decorated the page were dropped; the ones
  that held information (FIN receipt rules, OSR CTA timeline) are flagged for
  the department to provide as text.

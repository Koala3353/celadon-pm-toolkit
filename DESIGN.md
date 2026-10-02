# Design

This site extends ateneoceladon.com's visual system; it does not define a new
one. Source of truth for tokens: `Koala3353/celadon-website`,
`src/app/globals.css`, copied into `src/app/globals.css` here.

## System (inherited)

- **Colour:** navy `#003078`, ink `#18182A`, white; on-navy `#C7D2E1`;
  links `#296BFF` on white, `#7BA4FF` on navy; orange accent `#F09B43`
  (`#B2620E` for text), used sparingly. Neutrals are navy-tinted.
- **Type:** Montserrat for everything. Titles are 900 weight, uppercase,
  1.0 leading (`.display`). Body is 1.6–1.7 leading.
- **Structure:** sticky white header → navy hero band with hairline grid →
  white body → navy footer.
- **Motion:** anime.js reveals with `cubic-bezier(0.23, 1, 0.32, 1)`, 620 ms;
  hovers gated to fine pointers; everything off under reduced motion.

## Toolkit additions

- **Mode:** reading. Guide pages render fully at rest; reveals are used only
  below the fold on the home page.
- **Department accent:** each guide sets `--dept-accent`, `--dept-tint`, and
  `--dept-ink` from the main site's department palette (COMMPUB orange,
  EXREL blue, FIN green, HR gold, OSR violet, OP navy, CUL red). The accent
  colours step numbers, list markers, the hero's bottom stripe, the active
  "On this page" item, and the contact panel. Nothing else.
- **Ayi:** the department's Ayi mascot appears in its guide hero and cards.
- **Reading column:** 68ch measure; `##` sections are uppercase 900 with a
  hairline above; `###` in the department ink.
- **Blocks:** callouts are tinted panels with a small label, never a coloured
  side border. "Needs EBCB confirmation" is the only orange panel, so open
  questions stand out.
- **Layout:** three columns on wide screens (on-this-page · article ·
  department contacts), one column on phones with "On this page" as a
  disclosure.

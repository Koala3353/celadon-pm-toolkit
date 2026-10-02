/**
 * Site structure: every page the toolkit has, in navigation order. Content
 * lives in /content as Markdown; this file only says where each page sits and
 * how its department is dressed (accent colours match ateneoceladon.com's
 * deputy-departments.ts, Ayi mascots come from its /public/ayi).
 */

export const SITE_URL = "https://pm.ateneoceladon.com";
export const SITE_NAME = "CLDN Project Manager ToolKit 2026-2027";
export const SITE_YEAR = "2026–2027";
export const REPO_URL = "https://github.com/Koala3353/celadon-pm-toolkit";
export const MAIN_SITE_URL = "https://ateneoceladon.com";

/** Who to message about anything wrong with the website itself. */
export const WEBSITE_CONTACT = { label: "OSR EBCB", href: "/directory/#osr" };

export type DeptSlug = "op" | "commpub" | "exrel" | "fin" | "hr" | "osr" | "cul";

export interface Dept {
  slug: DeptSlug;
  short: string;
  name: string;
  ayi: string;
  accent: { base: string; tint: string; ink: string };
}

export const DEPTS: Record<DeptSlug, Dept> = {
  op: {
    slug: "op",
    short: "OP",
    name: "Office of the President",
    ayi: "/ayi/ayi.png",
    accent: { base: "#003078", tint: "#EEF2F8", ink: "#003078" },
  },
  commpub: {
    slug: "commpub",
    short: "COMMPUB",
    name: "Communications and Publications",
    ayi: "/ayi/commpub.png",
    accent: { base: "#D97706", tint: "#FDF1E3", ink: "#7C3A0D" },
  },
  exrel: {
    slug: "exrel",
    short: "EXREL",
    name: "External Relations",
    ayi: "/ayi/exrel.png",
    accent: { base: "#2563EB", tint: "#EFF6FF", ink: "#1E3A8A" },
  },
  fin: {
    slug: "fin",
    short: "FIN",
    name: "Financial Affairs",
    ayi: "/ayi/fin.png",
    accent: { base: "#16A34A", tint: "#F0FDF4", ink: "#14532D" },
  },
  hr: {
    slug: "hr",
    short: "HR",
    name: "Human Resources",
    ayi: "/ayi/hr.png",
    accent: { base: "#CA8A04", tint: "#FEFCE8", ink: "#713F12" },
  },
  osr: {
    slug: "osr",
    short: "OSR",
    name: "Organization Strategies and Research",
    ayi: "/ayi/osr.png",
    accent: { base: "#7C3AED", tint: "#F5F3FF", ink: "#4C1D95" },
  },
  cul: {
    slug: "cul",
    short: "CUL",
    name: "Cultural Affairs",
    ayi: "/ayi/cul.png",
    accent: { base: "#DC2626", tint: "#FEF2F2", ink: "#7F1D1D" },
  },
};

/** Guide slugs in reading order; each maps to content/guides/<slug>.md. */
export const GUIDE_SLUGS = ["commpub", "exrel", "fin", "hr", "osr", "op"] as const;
export type GuideSlug = (typeof GUIDE_SLUGS)[number];

/** Resource pages in reading order; each maps to content/resources/<slug>.md. */
export const RESOURCE_SLUGS = ["meeting-guide", "performance", "rewards", "conflict"] as const;
export type ResourceSlug = (typeof RESOURCE_SLUGS)[number];

/** Top navigation, labelled as on the Google Site. */
export const NAV = [
  { href: "/", label: "Home" },
  { href: "/guides/", label: "Guides" },
  { href: "/resources/", label: "Others" },
  { href: "/directory/", label: "EBCB Directory" },
  { href: "/about/", label: "About Celadon" },
] as const;

export interface NavCard {
  label: string;
  href: string;
  /** Department whose Ayi and colour the card wears. */
  dept?: DeptSlug;
  external?: boolean;
}

/** Guides page cards, as on the Google Site. */
export const GUIDE_CARDS: NavCard[] = [
  { label: "📝Project Procedures", href: "/procedures/", dept: "op" },
  { label: "🎨 COMMPUB Guide", href: "/guides/commpub/", dept: "commpub" },
  { label: "💌 EXREL Guide", href: "/guides/exrel/", dept: "exrel" },
  { label: "💸 FIN Guide", href: "/guides/fin/", dept: "fin" },
  { label: "🀄 HR Guide", href: "/guides/hr/", dept: "hr" },
  { label: "📊 OSR Guide", href: "/guides/osr/", dept: "osr" },
  { label: "🎓OP Guide", href: "/guides/op/", dept: "op" },
];

/** Home page cards: the guides plus the rest of the site, as on the Google Site. */
export const HOME_CARDS: NavCard[] = [
  ...GUIDE_CARDS,
  { label: "➕ Others", href: "/resources/" },
  { label: "📞EBCB Directory", href: "/directory/" },
  { label: "💙 About Celadon", href: "/about/" },
];

/** Others page cards, as on the Google Site. */
export const OTHERS_CARDS: NavCard[] = [
  { label: "🌐Ateneo Celadon Website", href: "https://ateneoceladon.com/", external: true },
  { label: "📢 A-yi's Corner (Recruitment Portal)", href: "https://ateneoceladon.com/internal/", external: true },
  { label: "🔗 CLDN Custom URL Generator", href: "https://url.ateneoceladon.com/", external: true },
  {
    label: "✉︎ EBCB & Managers Directory",
    href: "https://docs.google.com/spreadsheets/d/1ZLK8s4bg4D9TIuSifEbTQPBQsR8AA-ZZuCMkuFVIXhc/edit",
    external: true,
  },
  {
    label: "🚀 Department Deployment Tracker",
    href: "https://docs.google.com/spreadsheets/d/1mGyQSVGlQlsjd3pYNvjW7AVTIenH6OErSBXN1A3nauM/edit",
    external: true,
  },
  {
    label: "👥 Core Team Committee Roles & Guide",
    href: "https://docs.google.com/document/d/1R8kzMhiiAjBp3W9wqUsi_l1z87PcpjkObgdiD_49LkM/edit",
    external: true,
  },
  {
    label: "💻 Project Presentation Guidelines",
    href: "https://docs.google.com/document/d/1dwh915AQJgqkzhG6XT0_kihYr2LOtP9JKBa3UdPvVGw/edit",
    external: true,
  },
  {
    label: "👨🏻‍🏫 Manager FormSem Presentations",
    href: "https://drive.google.com/drive/folders/1GRnECuN1XS4P6M9yxz3dGAnuhgxDilUN",
    external: true,
  },
  { label: "📑 Meeting Guide", href: "/resources/meeting-guide/" },
  { label: "💼 Performance Management", href: "/resources/performance/" },
  { label: "⭐ Reward Practices", href: "/resources/rewards/" },
  { label: "🫂 Conflict Resolution", href: "/resources/conflict/" },
];

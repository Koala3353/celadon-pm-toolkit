/**
 * Site structure: every page the toolkit has, in navigation order. Content
 * lives in /content as Markdown; this file only says where each page sits and
 * how its department is dressed (accent colours match ateneoceladon.com's
 * deputy-departments.ts, Ayi mascots come from its /public/ayi).
 */

export const SITE_URL = "https://pm.ateneoceladon.com";
export const SITE_NAME = "CLDN PM Toolkit";
export const SITE_YEAR = "2026–2027";
export const REPO_URL = "https://github.com/Koala3353/celadon-pm-toolkit";
export const MAIN_SITE_URL = "https://ateneoceladon.com";

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

export const NAV = [
  { href: "/procedures/", label: "Procedures" },
  { href: "/guides/", label: "Guides" },
  { href: "/resources/", label: "Resources" },
  { href: "/directory/", label: "Directory" },
  { href: "/about/", label: "About" },
] as const;

/** External tools from the old "Others" page. */
export const TOOLS = [
  {
    title: "Ateneo Celadon website",
    href: "https://ateneoceladon.com/",
    note: "The org's public site.",
  },
  {
    title: "A-yi's Corner",
    href: "https://ateneoceladon.com/internal/",
    note: "Recruitment portal for members. Sign in with your Ateneo account.",
  },
  {
    title: "CLDN custom URL generator",
    href: "https://url.ateneoceladon.com/",
    note: "Make short ateneoceladon.com links for forms and pubs.",
  },
  {
    title: "EBCB and Managers Directory 2627",
    href: "https://docs.google.com/spreadsheets/d/1ZLK8s4bg4D9TIuSifEbTQPBQsR8AA-ZZuCMkuFVIXhc/edit",
    note: "Every EBCB member and manager, by department.",
  },
  {
    title: "CLDN 2627 Deployment Tracker",
    href: "https://docs.google.com/spreadsheets/d/1mGyQSVGlQlsjd3pYNvjW7AVTIenH6OErSBXN1A3nauM/edit",
    note: "Which department staff are deployed to which project.",
  },
  {
    title: "Core Team Committee Roles Guide 2627",
    href: "https://docs.google.com/document/d/1R8kzMhiiAjBp3W9wqUsi_l1z87PcpjkObgdiD_49LkM/edit",
    note: "What each core team committee does.",
  },
  {
    title: "Project Presentation Guidelines",
    href: "https://docs.google.com/document/d/1dwh915AQJgqkzhG6XT0_kihYr2LOtP9JKBa3UdPvVGw/edit",
    note: "What the EBCB expects in your project presentation.",
  },
  {
    title: "Manager FormSem materials",
    href: "https://drive.google.com/drive/folders/1GRnECuN1XS4P6M9yxz3dGAnuhgxDilUN",
    note: "Slides from this year's Manager FormSem.",
  },
] as const;

import type { Metadata } from "next";
import { Montserrat } from "next/font/google";
import "./globals.css";
import { asset } from "@/lib/asset";
import { SITE_NAME, SITE_URL } from "@/lib/site";
import { SiteHeader } from "@/components/site-header";
import { SiteFooter } from "@/components/site-footer";
import { SearchDialog } from "@/components/search";

// Montserrat stands in for the brandbook's Gotham, as on ateneoceladon.com.
const montserrat = Montserrat({
  variable: "--font-body",
  subsets: ["latin"],
  display: "swap",
});

// Page titles follow the Google Site's: "<site name> - <page>".
export const metadata: Metadata = {
  metadataBase: new URL(SITE_URL),
  title: { default: SITE_NAME, template: `${SITE_NAME} - %s` },
  applicationName: SITE_NAME,
  robots: { index: false, follow: false },
  icons: { apple: asset("/brand/apple-touch-icon.png") },
};

export const viewport = { themeColor: "#003078" };

export default function RootLayout({ children }: LayoutProps<"/">) {
  return (
    <html lang="en" className={`${montserrat.variable} h-full antialiased`}>
      <body className="grain flex min-h-full flex-col bg-background">
        <a
          href="#main"
          className="sr-only rounded-full focus:not-sr-only focus:fixed focus:left-4 focus:top-4 focus:z-[60] focus:bg-navy focus:px-5 focus:py-3 focus:text-sm focus:font-bold focus:text-white"
        >
          Skip to content
        </a>
        <SiteHeader />
        <main id="main" className="flex-1">
          {children}
        </main>
        <SiteFooter />
        <SearchDialog />
      </body>
    </html>
  );
}

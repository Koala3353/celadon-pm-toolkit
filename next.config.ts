import type { NextConfig } from "next";

/**
 * Pure static export for GitHub Pages, same setup as ateneoceladon.com.
 *
 * `PAGES_BASE_PATH` is only non-empty when the site is served under a path
 * segment (koala3353.github.io/<repo>/). With pm.ateneoceladon.com mapped as
 * the custom domain it is served at the root, so the workflow sets it to "".
 */
const basePath = process.env.PAGES_BASE_PATH ?? "";

const nextConfig: NextConfig = {
  output: "export",
  basePath,
  env: { NEXT_PUBLIC_BASE_PATH: basePath },
  // GitHub Pages serves directories; without this, /guides/fin 404s.
  trailingSlash: true,
  images: { unoptimized: true },
};

export default nextConfig;

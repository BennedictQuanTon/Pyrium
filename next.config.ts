import type { NextConfig } from "next";

const nextConfig: NextConfig = {
  cacheComponents: true,
  partialPrefetching: true,
  // Every page is prerendered per language and prefetched; the default dev-time validation of
  // every navigation only re-renders each page a second time and floods the log.
  experimental: {
    instantInsights: { validationLevel: "manual-warning" },
  },
  turbopack: {
    rules: {
      "*.css": {
        loaders: ["@tailwindcss/turbopack"],
        as: "*.css",
      },
    },
  },
  // Every page lives under app/[lang]. English keeps clean URLs: after static files are
  // checked, any path that doesn't start with a language prefix is served from /en.
  // /_vercel/* (Web Analytics, Speed Insights) belongs to the platform and must pass through.
  async rewrites() {
    return {
      beforeFiles: [],
      afterFiles: [
        { source: "/:path((?!en(?:/|$)|vi(?:/|$)|_vercel/).*)", destination: "/en/:path" },
      ],
      fallback: [],
    };
  },
  // /en/... is the internal path; send visitors to the canonical one.
  async redirects() {
    return [
      { source: "/en", destination: "/", permanent: true },
      { source: "/en/:path*", destination: "/:path*", permanent: true },
    ];
  },
};

export default nextConfig;

import { MetadataRoute } from "next";
import { siteConfig } from "@/lib/seo-config";

export default function robots(): MetadataRoute.Robots {
  const baseUrl = siteConfig.url;

  return {
    rules: [
      {
        userAgent: "*",
        allow: "/",
        disallow: [
          "/admin/", // Don't index admin pages
          "/api/", // Don't index API routes
          "/_next/", // Don't index Next.js internal routes
          "/private/", // Any private content
        ],
      },
      {
        // Block bad bots (common spam/scraper bots)
        userAgent: [
          "AhrefsBot",
          "SemrushBot",
          "MJ12bot",
          "DotBot",
        ],
        disallow: "/",
      },
    ],
    sitemap: `${baseUrl}/sitemap.xml`,
    host: baseUrl,
  };
}


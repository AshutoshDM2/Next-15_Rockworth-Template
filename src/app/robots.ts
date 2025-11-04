import type { MetadataRoute } from "next";

export default function robots(): MetadataRoute.Robots {
  const siteUrl = process.env.SITE_URL || "https://www.rockworthindia.com";

  return {
    rules: {
      userAgent: "*",
      allow: "/",
      disallow: ["/account", "/admin"],
    },
    sitemap: `${siteUrl}/sitemap.xml`,
  };
}

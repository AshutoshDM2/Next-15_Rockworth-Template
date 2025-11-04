

import { getAllPages } from "@/lib/Sitemap/get-pages";
import getTotalCounts from "@/lib/Sitemap/getTotalCounts";
import { sitemapPerPage } from "@/utils/variable";

const URLS_PER_SITEMAP = 50000;

// Type definitions
interface TotalCount {
  total: number;
  name: string;
}

interface SitemapIndexItem {
  total: number;
  name: string;
}

function generateIndex(
  { total, name }: SitemapIndexItem,
  baseUrl: string
): string {
  const sitemaps: string[] = [];
  const perPage =
    typeof sitemapPerPage === "number" && !isNaN(sitemapPerPage)
      ? sitemapPerPage
      : 50000;

  for (let i = 1; i <= Math.ceil(total / perPage); i++) {
    const url = `${baseUrl}${name}_sitemap${i}.xml`;
    sitemaps.push(`
      <sitemap>
        <loc>${url}</loc>
      </sitemap>
    `);
  }
  return sitemaps.join("");
}

export async function GET(request: Request) {
  try {
    // Get existing pages data
    const pages = await getAllPages();

    // Get total counts for other content types
    const totalCounts: TotalCount[] = await getTotalCounts();

    // Calculate counts for pages
    const pageSitemapCount = Math.ceil(pages.length / URLS_PER_SITEMAP);

    const baseUrl =
      process.env.NEXT_PUBLIC_SITE_URL ||
      `${
        request.headers.get("x-forwarded-proto") || "https"
      }://${request.headers.get("host")}/`;

    // Generate sitemaps for pages (existing functionality)
    const pageSitemaps = Array.from(
      { length: pageSitemapCount },
      (_, i) => `
        <sitemap>
          <loc>${baseUrl}sitemap-${i}.xml</loc>
        </sitemap>
      `
    ).join("");

    // Generate sitemaps for other content types (new functionality)
    const otherSitemaps = totalCounts
      .map((item) => generateIndex(item, baseUrl))
      .join("");

    // Combine both sitemap types
    const sitemapContent = `<?xml version="1.0" encoding="UTF-8"?>
<sitemapindex xmlns="http://www.sitemaps.org/schemas/sitemap/0.9">
  ${pageSitemaps}
  ${otherSitemaps}
</sitemapindex>`;

    return new Response(sitemapContent, {
      status: 200,
      headers: {
        "Content-Type": "text/xml; charset=utf-8",
        "Cache-Control": "public, max-age=3600, s-maxage=3600",
      },
    });
  } catch (error) {
    console.error("Error generating sitemap index:", error);
    return new Response("Internal Server Error", { status: 500 });
  }
}

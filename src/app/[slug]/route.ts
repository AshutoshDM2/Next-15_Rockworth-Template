/* eslint-disable @typescript-eslint/no-explicit-any */
import { type NextRequest, NextResponse } from "next/server";
import type { MetadataRoute } from "next";
import { frontendUrl } from "@/utils/variable";
import getSitemapUrls from "@/lib/Sitemap/getSiteMapUrl";
import getTotalCounts from "@/lib/Sitemap/getTotalCounts";
import { getAllPages } from "@/lib/Sitemap/get-pages";

// Static sitemap configuration
const excludePatterns = ["/buy", "/payment", "/mkt1", "/mkt2", "/mkt3"];
const URLS_PER_SITEMAP = 50000;
const BASE_URL = "https://www.rockworthindia.com";

type Params = Promise<{ slug: string }>;

export async function GET(
  request: NextRequest,
  segmentData: { params: Params }
) {
  try {
    const params = await segmentData.params;
    const { slug } = params;

    // Check if this is a sitemap request
    if (!slug.includes("sitemap") || !slug.endsWith(".xml")) {
      return new NextResponse("Not Found", { status: 404 });
    }

    // Pattern 1: Static sitemap (sitemap-1.xml, sitemap-2.xml, etc.)
    const staticMatch = slug.match(/^sitemap-(\d+)\.xml$/);
    if (staticMatch) {
      return handleStaticSitemap(staticMatch[1]);
    }

    const dynamicMatch = slug.match(/^(.+)_sitemap(\d+)\.xml$/);

    if (dynamicMatch) {
      return handleDynamicSitemap(dynamicMatch[1], dynamicMatch[2]);
    }

    // If no pattern matches, return 404
    return new NextResponse("Invalid sitemap format", { status: 404 });
  } catch (error) {
    console.error("Sitemap generation error:", error);
    return new NextResponse("Internal Server Error", { status: 500 });
  }
}

// Handle static sitemap generation (your existing logic)
async function handleStaticSitemap(sitemapNumberStr: string) {
  const sitemapNumber = Number.parseInt(sitemapNumberStr);

  if (isNaN(sitemapNumber)) {
    return new NextResponse("Invalid sitemap index", { status: 400 });
  }

  const pages = await getAllPages();
  const filteredPages = pages.filter(
    (page) => !excludePatterns.some((pattern) => page.url.includes(pattern))
  );

  const start = sitemapNumber * URLS_PER_SITEMAP;
  const end = start + URLS_PER_SITEMAP;
  const sitemapPages = filteredPages.slice(start, end);

  if (sitemapPages.length === 0) {
    return new NextResponse("Not Found", { status: 404 });
  }

  const sitemap: MetadataRoute.Sitemap = sitemapPages.map((page) => ({
    url: `${BASE_URL}${page.url}`,
    lastModified: page.lastModified || new Date(),
    changeFrequency: "daily",
    priority: 0.7,
  }));

  const xmlContent = `<?xml version="1.0" encoding="UTF-8"?>
<urlset xmlns="http://www.sitemaps.org/schemas/sitemap/0.9"
        xmlns:news="http://www.google.com/schemas/sitemap-news/0.9"
        xmlns:xhtml="http://www.w3.org/1999/xhtml"
        xmlns:mobile="http://www.google.com/schemas/sitemap-mobile/1.0"
        xmlns:image="http://www.google.com/schemas/sitemap-image/1.1"
        xmlns:video="http://www.google.com/schemas/sitemap-video/1.1">
  ${sitemap
    .map(
      (entry) => `  <url>
    <loc>${entry.url}</loc>
    <lastmod>${
      entry.lastModified instanceof Date
        ? entry.lastModified.toISOString()
        : entry.lastModified
    }</lastmod>
    <changefreq>${entry.changeFrequency}</changefreq>
    <priority>${entry.priority}</priority>
  </url>`
    )
    .join("\n")}
</urlset>`;

  return new NextResponse(xmlContent, {
    status: 200,
    headers: {
      "Content-Type": "application/xml",
      "Cache-Control": "s-maxage=300, stale-while-revalidate=600",
    },
  });
}

// Handle dynamic sitemap generation (your original Pages Router logic)
async function handleDynamicSitemap(type: string, pageStr: string) {
  const pageNo = Number.parseInt(pageStr);

  if (isNaN(pageNo)) {
    return new NextResponse("Invalid page number", { status: 400 });
  }

  // Get total counts to validate the type
  const total = await getTotalCounts();
  if (!total.find((item) => item.name === type)) {
    return new NextResponse("Not Found", { status: 404 });
  }

  // Get sitemap URLs for this type and page
  const pageUrls = await getSitemapUrls({ type, pageNo });

  if (pageUrls.length === 0) {
    return new NextResponse("Not Found", { status: 404 });
  }

  // Generate XML sitemap
  const urls = pageUrls
    .map((item: { url: any; post_modified_date: string | number | Date }) => {
      let cleanUrl = item.url;

      // Remove date pattern (YYYY/MM/DD/) from anywhere in the URL
      cleanUrl = cleanUrl.replace(/\/\d{4}\/\d{2}\/\d{2}\//g, "/");

      // Decode URL encoding
      cleanUrl = decodeURIComponent(cleanUrl);
      const url = `${frontendUrl}${
        type === "project" ? "" : "/knowledge"
      }${cleanUrl}`;
      const lastmod = item?.post_modified_date
        ? `<lastmod>${
            new Date(item.post_modified_date).toISOString().split("T")[0]
          }</lastmod>`
        : "";

      return `  <url>
    <loc>${url}</loc>
    ${lastmod}
  </url>`;
    })
    .join("\n");

  const sitemap = `<?xml version="1.0" encoding="UTF-8"?>
<urlset xmlns="http://www.sitemaps.org/schemas/sitemap/0.9">
${urls}
</urlset>`;

  return new NextResponse(sitemap, {
    status: 200,
    headers: {
      "Content-Type": "text/xml; charset=utf-8",
      "Cache-Control": "s-maxage=300, stale-while-revalidate=600",
    },
  });
}

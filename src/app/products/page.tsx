import ProductsSkeleton from "@/components/SkeletonLoader/ProductsSkeleton";
import { siteUrl } from "@/constant/site";
import { fetchProductSpaces } from "@/lib/ProductsApi/ProductsApi";
import Products from "@/module/ProductsPage/ProductsPage";
import type { Metadata } from "next";
import { Suspense } from "react";

export const metadata: Metadata = {
  title: "Products | Rockworth - Transform Your Workplace",
  description:
    "Professional furniture solutions tailored for modern businesses. Discover our BOX acoustic pods and URBAN desk collections for enhanced workplace productivity.",
  keywords: [
    "Rockworth",
    "office furniture",
    "acoustic pods",
    "height adjustable desks",
    "workplace solutions",
    "business furniture",
    "BOX acoustic pods",
    "URBAN desk collection",
    "modern office design",
  ],
  authors: [{ name: "Rockworth India" }],
  creator: "Rockworth India",
  publisher: "Rockworth India",
  icons: {
    icon: [
      { url: "/favicon.svg", sizes: "32x32", type: "image/png" },
      { url: "/favicon.svg", sizes: "16x16", type: "image/png" },
    ],
    apple: [{ url: "/favicon.svg", sizes: "180x180", type: "image/png" }],
    shortcut: "/favicon.svg",
  },
  metadataBase: new URL(siteUrl),
  openGraph: {
    title: "Products | Rockworth - Transform Your Workplace",
    description:
      "Professional furniture solutions tailored for modern businesses.",
    url: `${siteUrl}/products`,
    siteName: "Rockworth India",
    locale: "en_US",
    type: "website",
    images: [
      {
        url: "/images/rockworth.webp",
        width: 1200,
        height: 630,
        alt: "Products Rockworth India",
      },
    ],
  },
  twitter: {
    card: "summary_large_image",
    site: "@RockworthIndia",
    creator: "@RockworthIndia",
    title: "Rockworth - Transform Your Workplace",
    description:
      "Professional furniture solutions tailored for modern businesses.",
    images: ["/images/rockworth.webp"],
  },
  alternates: {
    canonical: "https://www.rockworthIndia.com/products",
  },
  category: "Business & Industrial",
  classification: "Office Furniture & Equipment",
  robots: {
    index: true,
    follow: true,
    googleBot: {
      index: true,
      follow: true,
    },
  },
};

// Async component for data fetching
async function ProductsData() {
  const { data, meta } = await fetchProductSpaces({});
  return <Products productSpaces={data} imageMeta={meta} />;
}

export default function ProductsPage() {
  return (
    <div className="min-h-screen">
      <Suspense fallback={<ProductsSkeleton categoryCount={4} />}>
        <ProductsData />
      </Suspense>
    </div>
  );
}

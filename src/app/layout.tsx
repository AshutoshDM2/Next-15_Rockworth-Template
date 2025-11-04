import FooterItem from "@/common/FooterItem/FooterItem";
import { TopBanner } from "@/common/TopBanner/TopBanner";
import { Topbar } from "@/common/Topbar/Topbar";
import { SearchProvider } from "@/contexts/SearchContext";
import type { Metadata, Viewport } from "next";
import localFont from "next/font/local";
import type React from "react";
import { Suspense } from "react";
import "./globals.css";

// Custom CircularStd font family with multiple weights
const circularStd = localFont({
  src: [
    {
      path: "./font/CircularStd-Light.otf",
      weight: "300",
      style: "normal",
    },
    {
      path: "./font/CircularStd-Book.otf",
      weight: "400",
      style: "normal",
    },
    {
      path: "./font/CircularStd-Medium.otf",
      weight: "500",
      style: "normal",
    },
    {
      path: "./font/CircularStd-Bold.otf",
      weight: "700",
      style: "normal",
    },
  ],
  variable: "--font-circular",
  display: "swap",
  preload: true,
});

export const metadata: Metadata = {
  metadataBase: new URL("https://rockworthIndia.com"), // Removed trailing period
  title: "Rockworth - Transform Your Workplace",
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
  robots: {
    index: true,
    follow: true,
    googleBot: {
      index: true,
      follow: true,
    },
  },
  icons: {
    icon: [
      { url: "/favicon.svg", sizes: "32x32", type: "image/png" },
      { url: "/favicon.svg", sizes: "16x16", type: "image/png" },
    ],
    apple: [{ url: "/favicon.svg", sizes: "180x180", type: "image/png" }],
    shortcut: "/favicon.svg",
  },
  openGraph: {
    url: "https://www.rockworthIndia.com/",
    type: "website",
    title: "Rockworth - Transform Your Workplace",
    description:
      "Professional furniture solutions tailored for modern businesses. Discover our BOX acoustic pods and URBAN desk collections for enhanced workplace productivity.",
    siteName: "Rockworth India",
    locale: "en_US",
    images: [
      {
        url: "/images/rockworth.webp",
        width: 1200, // Recommended OG image size
        height: 630, // Recommended OG image size
        alt: "Rockworth - Professional office furniture solutions including acoustic pods and height-adjustable desks",
        type: "image/webp", // Fixed to match file extension
      },
    ],
  },
  twitter: {
    card: "summary_large_image",
    site: "@RockworthIndia", // Updated to match brand
    creator: "@RockworthIndia",
    title: "Rockworth - Transform Your Workplace",
    description:
      "Professional furniture solutions tailored for modern businesses.",
    images: ["/images/rockworth.webp"],
  },
  alternates: {
    canonical: "https://rockworthIndia.com", // Removed trailing period
  },
  category: "Business & Industrial",
  classification: "Office Furniture & Equipment",
};

// Viewport
export const viewport: Viewport = {
  width: "device-width",
  initialScale: 1,
  maximumScale: 1,
};

// JSON-LD structured data
const structuredData = {
  "@context": "https://schema.org",
  "@type": "WebSite",
  name: "easysupply.ai",
  url: "https://easysupply.ai",
  potentialAction: {
    "@type": "SearchAction",
    target: "https://easysupply.ai",
    "query-input": "required name=search_term_string",
  },
};

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html lang="en" suppressHydrationWarning className={circularStd.variable}>
      <head>
        {/* Structured data */}
        <script
          type="application/ld+json"
          dangerouslySetInnerHTML={{ __html: JSON.stringify(structuredData) }}
        />
      </head>
      <body className={`${circularStd.className} font-sans`}>
        <Suspense>
          <SearchProvider>
            <TopBanner />
            <Topbar />
            {children}
            <FooterItem />{" "}
          </SearchProvider>
        </Suspense>
      </body>
    </html>
  );
}

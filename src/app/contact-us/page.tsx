import type { Metadata } from "next";
import { Suspense } from "react";

const siteUrl = "https://www.rockworthindia.com";

export const metadata: Metadata = {
  title: "Contact Us | Rockworth - Transform Your Workplace",
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
  metadataBase: new URL(siteUrl),
  alternates: {
    canonical: `${siteUrl}/contact-us`,
  },
  openGraph: {
    url: "https://www.rockworthIndia.com/contact-us",
    type: "website",
    title: "Contact Us | Rockworth - Transform Your Workplace",
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
        type: "image/png", // Fixed to match file extension
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

  category: "Business & Industrial",
  classification: "Office Furniture & Equipment",
};

export default async function ContactUsPage() {
  return <Suspense>ContactUs</Suspense>;
}

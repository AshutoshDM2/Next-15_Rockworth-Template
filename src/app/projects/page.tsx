import { siteUrl } from "@/constant/site";
import { getProjectCategories, getProjects } from "@/lib/ProjectApi/ProjectApi";
import ProjectsPage from "@/module/ProjectsPage/ProjectsPage";
import { Metadata } from "next";
import { Suspense } from "react";
import Loading from "./loading";

export const metadata: Metadata = {
  title: "Projects | Rockworth - Transform Your Workplace",
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
  robots: {
    index: true,
    follow: true,
    googleBot: {
      index: true,
      follow: true,
    },
  },
  metadataBase: new URL(siteUrl),
  openGraph: {
    url: "https://www.rockworthIndia.com/projects",
    type: "website",
    title: "Projects | Rockworth - Transform Your Workplace",
    description:
      "Professional furniture solutions tailored for modern businesses. Discover our BOX acoustic pods and URBAN desk collections for enhanced workplace productivity.",
    siteName: "Rockworth India",
    locale: "en_US",
    images: [
      {
        url: "/images/rockworth.png",
        width: 1200, //* Recommended OG image size
        height: 630, //* Recommended OG image size
        alt: "Rockworth - Professional office furniture solutions including acoustic pods and height-adjustable desks",
        type: "image/png", //* Fixed to match file extension
      },
    ],
  },
  twitter: {
    card: "summary_large_image",
    site: "@RockworthIndia", //* Updated to match brand
    creator: "@RockworthIndia",
    title: "Projects | Rockworth - Transform Your Workplace",
    description:
      "Professional furniture solutions tailored for modern businesses.",
    images: ["/images/rockworth.png"],
  },
  alternates: {
    canonical: `${siteUrl}/projects`,
  },
  category: "Business & Industrial",
  classification: "Office Furniture & Equipment",
};

export default async function Project() {
  const { projects, pagination } = await getProjects(1, 9);
  const categories = await getProjectCategories();

  return (
    <Suspense fallback={<Loading />}>
      <ProjectsPage
        projects={projects}
        categories={categories}
        initialPagination={pagination}
      />
    </Suspense>
  );
}

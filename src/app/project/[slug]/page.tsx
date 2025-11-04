import { siteUrl } from "@/constant/site";
import { getProjectBySlug } from "@/lib/ProjectApi/ProjectApi";
import { projectMockDataList } from "@/lib/projects-mock-data";
import SingleProjectsPage from "@/module/SingleProjectsPage/SingleProjectsPage";
import type { Metadata } from "next";
import { notFound } from "next/navigation";
import { Suspense } from "react";
import Loading from "./loading";

type Props = {
  params: { slug: string };
};

// ✅ Metadata generation
export async function generateMetadata({ params }: Props): Promise<Metadata> {
  const slug = params.slug;
  const productSpace = await getProjectBySlug(slug);

  if (!productSpace) {
    return {
      title: "Service Not Found",
      description: "The service you're looking for does not exist.",
    };
  }

  return {
    title: `${productSpace.title} | Rockworth - Transform Your Workplace`,
    description: productSpace.excerpt,
    keywords: [
      "Rockworth",
      "office furniture",
      "AI",
      "business solutions",
      "logistics",
      "automation products",
      "services",
      "workplace solutions",
    ],
    icons: {
      icon: "/favicon.png",
      apple: "/favicon.png",
      shortcut: "/favicon.png",
    },
    metadataBase: new URL(siteUrl),
    alternates: {
      canonical: `${siteUrl}/service/${productSpace.slug}`,
    },
    openGraph: {
      title: `${productSpace.title} | Rockworth - Transform Your Workplace`,
      description: productSpace.excerpt,
      url: `${siteUrl}/service/${productSpace.slug}`,
      siteName: "Rockworth India",
      locale: "en_US",
      type: "website",
      images: [
        {
          url: `${siteUrl}/images/rockworth.png`, // ✅ Use full URL for OpenGraph
          width: 1200,
          height: 630,
          alt: `${productSpace.title} - Rockworth India`,
        },
      ],
    },
    twitter: {
      card: "summary_large_image",
      title: `${productSpace.title} | Rockworth - Transform Your Workplace`,
      description: productSpace.excerpt,
      images: [`${siteUrl}/img/meta/about-banner.jpg`],
      creator: "@rockworthIndia",
    },
    robots: {
      index: true,
      follow: true,
      nocache: false,
      googleBot: {
        index: true,
        follow: true,
        noimageindex: false,
      },
    },
    category: "Rockworth India",
  };
}

export async function generateStaticParams() {
  return projectMockDataList.map((space) => ({
    slug: space.slug,
  }));
}

export default async function SingleProjectPage({ params }: Props) {
  const slug = (await params).slug;
  const project = await getProjectBySlug(slug);

  if (!project) return notFound();

  return (
    <Suspense fallback={<Loading />}>
      <SingleProjectsPage projectsData={project} />
    </Suspense>
  );
}

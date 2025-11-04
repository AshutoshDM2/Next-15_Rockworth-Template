import { ProductSpaceSkeleton } from "@/components/SkeletonLoader/ProductSpaceSkeleton";
import { siteUrl } from "@/constant/site";
import { fetchProductSpaces } from "@/lib/ProductsApi/ProductsApi";
import { ProductSpacePage } from "@/module/ProductSpacePage/ProductSpacePage";
import type { Metadata } from "next";
import { notFound } from "next/navigation";
import { Suspense } from "react";

type Props = {
  params: Promise<{ slug: string }>;
};

//* ✅ generateMetadata
export async function generateMetadata({ params }: Props): Promise<Metadata> {
  const slugArray = (await params).slug;
  const [slug] = Array.isArray(slugArray) ? slugArray : [slugArray];

  const { data } = await fetchProductSpaces({
    pageNo: 1,
    itemPerPage: 10,
    product_space_slug: slug,
  });

  const space = data[0];

  if (!data || !space) {
    return {
      title: "Service Not Found",
      description: "The service you're looking for does not exist.",
    };
  }

  return {
    title: `${space.title} | Rockworth - Transform Your Workplace`,
    description: `${space.description}`,
    keywords:
      "Rockworth, office furniture, AI, business solutions, logistics, automation products, services, workplace solutions",
    icons: {
      icon: "/favicon.svg",
      apple: "/favicon.svg",
      shortcut: "/favicon.svg",
    },
    metadataBase: new URL(siteUrl),
    alternates: {
      canonical: `${siteUrl}/${space.slug}`,
    },
    openGraph: {
      title: `${space.title} | Rockworth - Transform Your Workplace`,
      description: `${space.description}`,
      url: `${siteUrl}/${space.slug}`,
      siteName: "Rockworth India",
      locale: "en_US",
      type: "website",
      images: [
        {
          url: "/images/rockworth.webp",
          width: 1200,
          height: 630,
          alt: "Contact Rockworth India",
        },
      ],
    },
    twitter: {
      card: "summary_large_image",
      title: `${space.title} | Rockworth - Transform Your Workplace`,
      description: `${space.description}`,
      images: [`${siteUrl}/img/meta/about-banner.webp`],
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
    category: "Rockworth india",
  };
}

//* ✅ Component itself
export default async function ProductSpace({ params }: Props) {
  const slugArray = (await params).slug;
  const [slug, CategorySlug] = Array.isArray(slugArray)
    ? slugArray
    : [slugArray];

  const { data, meta } = await fetchProductSpaces({
    pageNo: 1,
    itemPerPage: 10,
    product_space_slug: slug,
  });

  const productSpace = data[0];

  if (!productSpace) return notFound();

  return (
    <Suspense fallback={<ProductSpaceSkeleton />}>
      <ProductSpacePage
        productSpace={productSpace}
        imageMeta={meta}
        initialCategorySlug={CategorySlug}
      />
      <ProductSpaceSkeleton />
    </Suspense>
  );
}

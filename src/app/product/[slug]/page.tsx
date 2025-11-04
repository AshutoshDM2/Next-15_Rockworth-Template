import { siteUrl } from "@/constant/site";
import { stripHtmlTags } from "@/helpers/config/envConfig";
import { fetchSingleProduct } from "@/lib/ProductsApi/ProductsApi";
import { SingleProductPage } from "@/module/SingleProductPage/SingleProduct";
import type { Metadata } from "next";
import { notFound } from "next/navigation";

type Props = {
  params: Promise<{ slug: string }>;
};

//* ✅ generateMetadata - This MUST be exported and async
export async function generateMetadata({ params }: Props): Promise<Metadata> {
  try {
    const slug = (await params).slug;

    const { data } = await fetchSingleProduct({
      pageNo: 1,
      itemPerPage: 1,
      SingleProductslug: slug,
    });

    if (!data || !data.site_product_name) {
      return {
        title: "Service Not Found | Rockworth",
        description: "The service you're looking for does not exist.",
        robots: {
          index: false,
          follow: false,
        },
      };
    }

    // Strip HTML tags from description for meta tags
    const plainTextDescription = stripHtmlTags(data.description || "");
    const productTitle = data.site_product_name.trim();

    return {
      title: `${productTitle} | Rockworth - Transform Your Workplace`,
      description:
        plainTextDescription ||
        `Discover ${productTitle} at Rockworth. Professional office furniture and business solutions.`,
      keywords: [
        "Rockworth",
        "office furniture",
        "business solutions",
        productTitle.toLowerCase(),
        "workplace solutions",
      ].join(", "),

      metadataBase: new URL(siteUrl),

      alternates: {
        canonical: `${siteUrl}/service/${data.slug}`,
      },

      openGraph: {
        title: `${productTitle} | Rockworth`,
        description:
          plainTextDescription || `Discover ${productTitle} at Rockworth`,
        url: `${siteUrl}/service/${data.slug}`,
        siteName: "Rockworth India",
        locale: "en_US",
        type: "website",
        images: [
          {
            url: data.featured_image || "/images/rockworth.webp",
            width: 1200,
            height: 630,
            alt: `${productTitle} - Rockworth India`,
          },
        ],
      },

      twitter: {
        card: "summary_large_image",
        title: `${productTitle} | Rockworth`,
        description:
          plainTextDescription || `Discover ${productTitle} at Rockworth`,
        images: [
          data.featured_image || `${siteUrl}/img/meta/about-banner.webp`,
        ],
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

      icons: {
        icon: "/favicon.svg",
        apple: "/favicon.svg",
        shortcut: "/favicon.svg",
      },
    };
  } catch (error) {
    console.error("Error in generateMetadata:", error);
    return {
      title: "Service | Rockworth",
      description: "Professional office furniture and business solutions.",
      robots: {
        index: false,
        follow: false,
      },
    };
  }
}

//* ✅ Main component - This MUST be the default export
export default async function ServicePage({ params }: Props) {
  try {
    const slug = (await params).slug;

    const { data, meta } = await fetchSingleProduct({
      pageNo: 1,
      itemPerPage: 1,
      SingleProductslug: slug,
    });



    if (!data) {
      notFound();
    }

    return <SingleProductPage product={data} imageMeta={meta} />;
  } catch (error) {
    console.error("Error in ServicePage:", error);
    notFound();
  }
}

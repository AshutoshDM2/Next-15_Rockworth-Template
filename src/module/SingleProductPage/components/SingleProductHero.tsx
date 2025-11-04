/* eslint-disable @typescript-eslint/no-explicit-any */
import Section from "@/common/Section/Section";
import { HomeSlider } from "@/components/Common/HomeSlider";
import HtmlContentRenderer from "@/components/HtmlContentRenderer/HtmlContentRenderer";
import Breadcrumb from "@/components/Common/Breadcrumb";
import { IHeader } from "@/types/Products";
import Image from "next/image";

interface ProductHeroProps {
  headerSectionData: IHeader[] | any;
  imageUrl: string;
  productCategory?: string;
  productSpace?: string;
}

export function SingleProductHero({
  headerSectionData,
  imageUrl,
  productCategory,
  productSpace,
}: ProductHeroProps) {
  const handleSlideChange = () => {};

  //? Build breadcrumb items for single product page
  const breadcrumbItems: Array<{
    label: string;
    href: string;
    onClick?: () => void;
  }> = [{ label: "Products", href: "/products" }];

  //? Add product space if available
  if (productSpace) {
    // For now, we'll use a generic label since we only have UUID
    breadcrumbItems.push({
      label: "Office Spaces", // This could be made dynamic based on product space data
      href: `/products/office-spaces`,
    });
  }

  //? Add category if available
  if (productCategory) {
    const formattedCategory = productCategory
      .split("-")
      .map((word) => word.charAt(0).toUpperCase() + word.slice(1))
      .join(" ");
    breadcrumbItems.push({
      label: formattedCategory,
      href: `/products/office-spaces/${productCategory}`,
    });
  }

  //? Add current product title
  breadcrumbItems.push({
    label: headerSectionData[0].title,
    href: "",
  });

  return (
    <Section className="lg:py-0 -mt-10">
      <div className="grid lg:grid-cols-2 items-center">
        <div className="mt-10 flex flex-col items-start justify-between bg-white">
          <div className="flex items-center gap-4 w-full lg:w-auto">
            <Image
              src={`${imageUrl}${headerSectionData[0].featured_image_1}`}
              alt={headerSectionData[0].title}
              width={600}
              height={600}
              className="w-full h-80 object-contain"
              priority
            />
          </div>

          <div className="space-y-1">
            <h1 className="text-4xl lg:text-4xl font-medium text-black tracking-tight">
              {headerSectionData[0].title}
            </h1>
            {headerSectionData[0].heading && (
              <p className="text-gray-800 text-base font-normal">
                {headerSectionData[0].heading}
              </p>
            )}
            <div className="text-gray-500 font-light text-xs max-w-lg">
              <HtmlContentRenderer content={headerSectionData[0].description} />
            </div>
            <Breadcrumb textSize="sm" items={breadcrumbItems} />
          </div>
        </div>

        <div className="relative mt-4 lg:mt-20">
          <HomeSlider
            slides={headerSectionData[0].slider}
            imageUrl={imageUrl}
            autoPlay={true}
            autoPlayInterval={2000}
            showArrows={true}
            showDots={true}
            showCounter={true}
            aspectRatio="aspect-[4/3] lg:aspect-[3/2]"
            onSlideChange={handleSlideChange}
          />
        </div>
      </div>
    </Section>
  );
}

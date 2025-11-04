import Section from "@/common/Section/Section";
import Image from "next/image";
import HtmlContentRenderer from "../HtmlContentRenderer/HtmlContentRenderer";
import Breadcrumb from "../Common/Breadcrumb";

interface ProductHeroProps {
  title: string;
  description: string;
  heroImage: string;
  imageMeta: string;
  activeCategory?: string;
  onCategoryClick?: () => void;
}

export function ProductHero({
  title,
  description,
  heroImage,
  imageMeta,
  activeCategory,
  onCategoryClick,
}: ProductHeroProps) {
  
  //? Build breadcrumb items conditionally
  const breadcrumbItems: Array<{
    label: string;
    href: string;
    onClick?: () => void;
  }> = [{ label: "Products", href: "/products" }];

  //? Always add the current title first (clickable only when active category exists)
  breadcrumbItems.push({
    label: title,
    href: "",
    onClick: activeCategory ? onCategoryClick : undefined,
  });

  //? Add category if one is selected (after title) - not clickable
  if (activeCategory) {
    //? Convert kebab-case to title case (e.g., "desk-tables" -> "Desk Tables")
    const formattedCategory = activeCategory
      .split("-")
      .map((word) => word.charAt(0).toUpperCase() + word.slice(1))
      .join(" ");
    breadcrumbItems.push({
      label: formattedCategory,
      href: "",
    });
  }

  return (
    <div className="relative w-full bg-space-bg">
      <Section className="lg:py-0">
        <div className="grid lg:grid-cols-3 gap-2 lg:gap-12 items-center">
          <div className="space-y-3 my-2">
            <h1 className="text-3xl font-normal text-brand-color">{title}</h1>
            <HtmlContentRenderer
              content={description}
              defaultTagForPlainText="span"
            />
            <Breadcrumb textSize="sm" items={breadcrumbItems} />
          </div>
          <div className="relative col-span-2 h-64 lg:h-[400px]">
            <Image
              src={`${imageMeta}${heroImage}`}
              alt={title}
              width={800}
              height={500}
              className="w-full h-full"
              priority
            />
          </div>
        </div>
      </Section>
    </div>
  );
}

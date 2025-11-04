import Section from "@/common/Section/Section";
import HtmlContentRenderer from "@/components/HtmlContentRenderer/HtmlContentRenderer";
import type { MainSection } from "@/types/Products";
import Image from "next/image";

interface FeatureSectionProps {
  imageUrl: string;
  mainSectionData?: MainSection[] | null;
}

export function FeatureSection({
  imageUrl,
  mainSectionData,
}: FeatureSectionProps) {
  // If no data is provided, don't render anything
  if (!mainSectionData || mainSectionData.length === 0) {
    return null;
  }

  return (
    <div className="w-full">
      {mainSectionData.map((section, sectionIndex) => (
        <div key={sectionIndex}>
          {/* Left-aligned section: Image on Left, Text on Right */}
          {section.left && section.left.length > 0 && (
            <Section>
              <div className="w-full grid lg:grid-cols-2 items-center justify-between lg:gap-20">
                {/* Image on the left */}
                <div className="order-2 lg:order-1">
                  {section.left[0].image && (
                    <div className="relative rounded-xl">
                      <Image
                        src={`${imageUrl}${section.left[0].image}`}
                        alt={section.left[0].title || "Product feature"}
                        width={600}
                        height={400}
                        className="w-full h-[305px] lg:h-[405px] object-cover rounded-2xl"
                      />
                    </div>
                  )}
                </div>
                {/* Text content on the right */}
                <div className="order-1 lg:order-2 space-y-4 lg:max-w-md lg:pr-8">
                  {section.left[0].title && (
                    <h2 className="text-2xl font-medium text-gray-900 leading-tight">
                      {section.left[0].title}
                    </h2>
                  )}
                  {section.left[0].heading && (
                    <div>
                      <HtmlContentRenderer content={section.left[0].heading} />
                    </div>
                  )}
                  {section.left[0].description && (
                    <div>
                      <HtmlContentRenderer
                        content={section.left[0].description}
                      />
                    </div>
                  )}
                </div>
              </div>
            </Section>
          )}

          {/* Right-aligned section: Text on Left, Image on Right */}
          {section.right && section.right.length > 0 && (
            <Section className="lg:py-0">
              <div className="grid lg:grid-cols-2 items-center lg:gap-x-20">
                {/* Text content on the left */}
                <div className="space-y-6 lg:max-w-md lg:pl-8">
                  {section.right[0].title && (
                    <h2 className="text-2xl font-medium text-gray-900 leading-tight">
                      {section.right[0].title}
                    </h2>
                  )}
                  {section.right[0].heading && (
                    <div>
                      <HtmlContentRenderer content={section.right[0].heading} />
                    </div>
                  )}
                  {section.right[0].description && (
                    <div>
                      <HtmlContentRenderer
                        content={section.right[0].description}
                      />
                    </div>
                  )}
                </div>
                {/* Image on the right */}
                <div>
                  {section.right[0].image && (
                    <div className="relative rounded-xl">
                      <Image
                        src={`${imageUrl}${section.right[0].image}`}
                        alt={section.right[0].title || "Product feature"}
                        width={600}
                        height={400}
                        className="w-full h-[305px] lg:h-[405px] object-cover rounded-2xl"
                      />
                    </div>
                  )}
                </div>
              </div>
            </Section>
          )}
        </div>
      ))}
    </div>
  );
}

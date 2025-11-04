import Image from "next/image";
import { cn } from "@/lib/utils";
import Section from "@/common/Section/Section";
import MainHeading from "@/common/MainHeading/MainHeading";
import Mainparagraph from "@/common/MainParagraph/Mainparagraph";

interface ContentSectionProps {
  title: string;
  description: string;
  subtitle?: string;
  subdescription?: string;
  imageSrc: string;
  imageAlt: string;
  layout?: "text-left" | "text-right";
}

export function ContentSection({
  title,
  description,
  subtitle,
  subdescription,
  imageSrc,
  imageAlt,
  layout = "text-left",
}: ContentSectionProps) {
  return (
    <Section className="py-4 mb-4 lg:py-0 lg:mb-0">
      <div
        className={cn(
          "grid grid-cols-1 lg:grid-cols-2 gap-8 lg:gap-12 items-start",
          layout === "text-right" && "lg:grid-flow-col-dense"
        )}
      >
        {/* Content */}
        <div
          className={cn(
            "space-y-6 lg:mt-20",
            layout === "text-right" && "lg:col-start-2"
          )}
        >
          <div className="space-y-4">
            <MainHeading title={title} />
            <Mainparagraph paragraph={description} />
          </div>

          <div className="space-y-3">
            {subtitle && (
              <span className="text-lg md:text-xl font-normal text-black">
                {subtitle}
              </span>
            )}
            {subdescription && <Mainparagraph paragraph={subdescription} />}
          </div>
        </div>

        {/* Image */}
        <div
          className={cn(
            "order-first lg:order-none",
            layout === "text-right" && "lg:col-start-1"
          )}
        >
          <div className="relative aspect-[4/3] w-full rounded-lg overflow-hidden bg-gray-100 lg:mb-10">
            <Image
              src={imageSrc || "/placeholder.svg"}
              alt={imageAlt}
              fill
              className="object-cover"
              sizes="(max-width: 768px) 100vw, (max-width: 1024px) 50vw, 600px"
            />
          </div>
        </div>
      </div>
    </Section>
  );
}

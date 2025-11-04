"use client";
import { ProductSpaceResponse } from "@/types/Products";
import { MobileProductCard } from "./MobileProductCard";

interface MobileProductGridProps {
  productSpacesData: ProductSpaceResponse[];
  imageMeta: string;
  openAccordion: string | null;
  onAccordionToggle: (id: string | null) => void;
  linkPrefix?: string;
  columns?: "1" | "2";
}

export function MobileProductGrid({
  productSpacesData,
  imageMeta,
  openAccordion,
  onAccordionToggle,
  linkPrefix = "/products/",
  columns = "2",
}: MobileProductGridProps) {
  const gridCols =
    columns === "1" ? "grid-cols-1" : "grid-cols-1 sm:grid-cols-2";

  return (
    <div className={`grid ${gridCols} gap-4`}>
      {productSpacesData.map((product, index) => (
        <MobileProductCard
          key={product.product_space_uuid}
          category={product}
          imageMeta={imageMeta}
          isOpen={openAccordion === product.product_space_uuid}
          onToggle={() =>
            onAccordionToggle(
              openAccordion === product.product_space_uuid
                ? null
                : product.product_space_uuid
            )
          }
          index={index}
          linkPrefix={linkPrefix}
        />
      ))}
    </div>
  );
}

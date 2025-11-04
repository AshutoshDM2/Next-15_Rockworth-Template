"use client";
import { ProductSpaceResponse } from "@/types/Products";
import { MobileListCard } from "./MobileListCard";

interface MobileProductListProps {
  productSpacesData: ProductSpaceResponse[];
  imageMeta: string;
  openAccordion: string | null;
  onAccordionToggle: (id: string | null) => void;
  linkPrefix?: string;
}

export function MobileProductList({
  productSpacesData,
  imageMeta,
  openAccordion,
  onAccordionToggle,
  linkPrefix = "/products",
}: MobileProductListProps) {
  return (
    <div className="space-y-3">
      {productSpacesData.map((product, index) => (
        <MobileListCard
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

/* eslint-disable @typescript-eslint/no-explicit-any */
import { ProductGrid } from "@/components/Products/ProductGrid";
import { ProductVariants } from "@/components/Products/ProductVariants";

interface ProductSpaceContentProps {
  variants: string[];
  activeVariant: string;
  onVariantChange: (variant: string) => void;
  filteredProducts: any[];
  imageMeta: string;
}

export function ProductSpaceContent({
  variants,
  activeVariant,
  onVariantChange,
  filteredProducts,
  imageMeta,
}: ProductSpaceContentProps) {
  return (
    <div className="flex-1">
      <ProductVariants
        variants={variants}
        activeVariant={activeVariant}
        onVariantChange={onVariantChange}
      />

      <ProductGrid products={filteredProducts} imageMeta={imageMeta} />
    </div>
  );
}

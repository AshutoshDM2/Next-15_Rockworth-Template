
import { ProductSpaceResponse } from "@/types/Products";
import { DesktopProductCategoryContainer } from "./DesktopProductCategoryContainer";


interface DesktopProductGridProps {
  productSpacesData: ProductSpaceResponse[];
  imageMeta: string;
  columns?: "3" | "4" | "6";
  className?: string;
  linkPrefix: string;
}

export function DesktopProductGrid({
  productSpacesData,
  imageMeta,
  columns = "6",
  className = "",
  linkPrefix,
}: DesktopProductGridProps) {
  const gridCols = {
    "3": "md:grid-cols-3",
    "4": "md:grid-cols-3 lg:grid-cols-4",
    "6": "md:grid-cols-3 lg:grid-cols-6",
  };

  return (
    <div className={`hidden md:block ${className}`}>
      <div className={`hidden md:grid ${gridCols[columns]} gap-6`}>
        {productSpacesData.map((category, index) => (
          <div
            key={index}
            className="transform transition-all duration-300 hover:scale-105"
            style={{
              animationDelay: `${index * 100}ms`,
              animation: "fadeInUp 0.6s ease-out forwards",
            }}
          >
            <DesktopProductCategoryContainer
              category={category}
              imageMeta={imageMeta}
              linkPrefix={linkPrefix}
            />
          </div>
        ))}
      </div>
    </div>
  );
}

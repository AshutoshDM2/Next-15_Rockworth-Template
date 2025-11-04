import { Card } from "@/components/ui/Card/Card";
import {
  Collapsible,
  CollapsibleContent,
  CollapsibleTrigger,
} from "@/components/ui/Collapsible/Collapsible";
import { ChevronDown } from "lucide-react";
import { ProductSpaceResponse } from "@/types/Products";
import { ProductCategoryValue } from "./ProductCategoryValue";
import { MobileListProductImage } from "./MobileListProductImage";

interface MobileListCardProps {
  category: ProductSpaceResponse;
  imageMeta: string;
  isOpen: boolean;
  onToggle: () => void;
  index: number;
  linkPrefix?: string;
}

export function MobileListCard({
  category,
  imageMeta,
  isOpen,
  onToggle,
  index,
  linkPrefix = "/products/",
}: MobileListCardProps) {
  return (
    <Card
      className="overflow-hidden transition-all duration-300 border border-gray-400 shadow-xl rounded-2xl"
      style={{
        animationDelay: `${index * 100}ms`,
        animation: "fadeInUp 0.6s ease-out forwards",
      }}
    >
      <Collapsible open={isOpen} onOpenChange={onToggle}>
        <CollapsibleTrigger asChild>
          <div className="flex items-center p-4 hover:bg-gray-50 transition-colors cursor-pointer">
            <div className="relative w-16 h-16 rounded-lg overflow-hidden mr-4 flex-shrink-0">
              <MobileListProductImage
                image={`${imageMeta}${category.hero_image}`}
                title={category.title}
                spaceSlug={category.slug}
                linkPrefix={linkPrefix}
              />
            </div>
            <div className="flex-1 min-w-0">
              <h3 className="font-medium text-gray-900 truncate">
                {category.title}
              </h3>
              <p className="text-sm text-gray-500">
                {category.categories.length} categories
              </p>
            </div>
            <ChevronDown
              className={`h-5 w-5 text-gray-400 transition-transform duration-200 flex-shrink-0 ml-2 ${
                isOpen ? "rotate-180" : ""
              }`}
            />
          </div>
        </CollapsibleTrigger>
        <CollapsibleContent>
          <div className="px-4 pb-4 border-t border-gray-100">
            <div className="grid grid-cols-1 gap-1 pt-3">
              {category.categories.map((Cat, index) => {
                return (
                  <ProductCategoryValue
                    key={index}
                    category={Cat}
                    spaceSlug={category.slug}
                    linkPrefix={linkPrefix}
                  />
                );
              })}
            </div>
          </div>
        </CollapsibleContent>
      </Collapsible>
    </Card>
  );
}

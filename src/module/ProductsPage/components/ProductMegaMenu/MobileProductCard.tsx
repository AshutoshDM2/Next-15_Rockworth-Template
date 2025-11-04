import { Badge } from "@/components/ui/Badge/Badge";
import { Button } from "@/components/ui/Button/Button";
import { Card, CardContent } from "@/components/ui/Card/Card";
import {
  Collapsible,
  CollapsibleContent,
  CollapsibleTrigger,
} from "@/components/ui/Collapsible/Collapsible";
import { ProductCategoryValue } from "@/module/ProductsPage/components/ProductMegaMenu/ProductCategoryValue";
import { ProductSpaceResponse } from "@/types/Products";
import { ChevronDown } from "lucide-react";
import Link from "next/link";
import { MobileProductImage } from "./MobileProductImage";

interface MobileProductCardProps {
  category: ProductSpaceResponse;
  imageMeta: string;
  isOpen: boolean;
  onToggle: () => void;
  index: number;
  linkPrefix?: string;
}

export function MobileProductCard({
  category,
  imageMeta,
  isOpen,
  onToggle,
  index,
  linkPrefix = "/products/",
}: MobileProductCardProps) {
  return (
    <Card
      className="overflow-hidden transition-all duration-300 border border-gray-400 shadow-xl rounded-2xl"
      style={{
        animationDelay: `${index * 150}ms`,
        animation: "fadeInUp 0.6s ease-out forwards",
      }}
    >
      <Link href={`${linkPrefix}${category.slug}`}>
        <div className="relative h-44 overflow-hidden">
          <MobileProductImage
            image={`${imageMeta}${category.hero_image}`}
            title={category.title}
            spaceSlug={category.slug}
            linkPrefix={linkPrefix}
          />
          <div className="absolute inset-0 bg-gradient-to-t from-black/40 to-transparent" />
          <div className="absolute bottom-2 left-2">
            <Badge
              variant="secondary"
              className="text-xs backdrop-blur-sm bg-white/30 text-white font-light"
            >
              {category.categories.length} items
            </Badge>
          </div>
        </div>
      </Link>
      <CardContent className="p-2">
        <Collapsible open={isOpen} onOpenChange={onToggle}>
          <CollapsibleTrigger asChild>
            <Button
              variant="ghost"
              className="w-full justify-between p-2 h-auto text-left hover:bg-gray-50 text-xs"
            >
              <h2 className="font-medium text-gray-900 mb-2 text-sm">
                {category.title}
              </h2>
              <ChevronDown
                className={`h-4 w-4 transition-transform duration-200 ${
                  isOpen ? "rotate-180" : ""
                }`}
              />
            </Button>
          </CollapsibleTrigger>
          <CollapsibleContent>
            <div className="category-values space-y-1">
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
          </CollapsibleContent>
        </Collapsible>
      </CardContent>
    </Card>
  );
}

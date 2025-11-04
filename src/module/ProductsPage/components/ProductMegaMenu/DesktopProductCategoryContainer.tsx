import { ProductSpaceResponse } from "@/types/Products";
import { ProductCategoryValue } from "./ProductCategoryValue";
import { ProductCategoryTitle } from "./ProductCategoryTitle";
import { ProductCategoryImage } from "./ProductCategoryImage";

export const DesktopProductCategoryContainer = ({
  category,
  imageMeta,
  linkPrefix,
}: {
  category: ProductSpaceResponse;
  imageMeta: string;
  linkPrefix: string;
}) => {
  return (
    <div className="space-y-2">
      <ProductCategoryImage
        image={`${imageMeta}${category.hero_image}`}
        title={category.title}
        spaceSlug={category.slug}
        linkPrefix={linkPrefix}
      />
      <ProductCategoryTitle
        title={category.title}
        spaceSlug={category.slug}
        linkPrefix={linkPrefix}
      />
      <div className="space-y-1">
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
  );
};

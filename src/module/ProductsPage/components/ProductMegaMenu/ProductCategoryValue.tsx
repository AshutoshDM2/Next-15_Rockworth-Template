/* eslint-disable @typescript-eslint/no-explicit-any */
// import { Catgeories } from "@/types/Products";
import Link from "next/link";

export const ProductCategoryValue = ({
  category,
  spaceSlug,
  linkPrefix,
}: {
  category: any;
  spaceSlug?: string;
  linkPrefix?: string;
}) => {

  
  const href = category.slug
    ? `${linkPrefix}${spaceSlug}/${category.slug}`
    : "/";
  return (
    <div className="category-value">
      <Link
        href={href}
        className="block text-gray-500 hover:text-brand-color transition-all duration-300 py-2 px-3 rounded-md hover:bg-orange-50 text-sm font-normal transform hover:translate-x-2"
      >
        {category.category_name}
      </Link>
    </div>
  );
};

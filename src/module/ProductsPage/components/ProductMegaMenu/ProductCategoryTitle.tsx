import Link from "next/link";

export const ProductCategoryTitle = ({
  title,
  spaceSlug,
  linkPrefix,
}: {
  title: string;
  spaceSlug: string;
  linkPrefix: string;
}) => (
  <div className="category-title pt-2">
    <Link href={`${linkPrefix}${spaceSlug}`}>
      {" "}
      <h3 className="ml-2 uppercase text-sm font-medium text-gray-800 tracking-wide text-start hover:text-brand-color transition-colors duration-300 cursor-pointer">
        {title}
      </h3>
    </Link>
  </div>
);

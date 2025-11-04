"use client";

import type { ProductSpaceResponse } from "@/types/Products";
import CTASection from "../../components/Common/CTASection";
import ProductMegaMenu from "./components/ProductMegaMenu/ProductMegaMenu";
import { useEffect, useState } from "react";

export interface IProductProps {
  productSpaces: ProductSpaceResponse[];
  imageMeta: string;
}

export default function Products({ productSpaces, imageMeta }: IProductProps) {
  const [isLoaded, setIsLoaded] = useState(false);

  useEffect(() => {
    setIsLoaded(true);
  }, []);

  return (
    <div
      className={`transition-opacity duration-500 ${
        isLoaded ? "opacity-100" : "opacity-0"
      }`}
    >
      <ProductMegaMenu
        productSpacesData={productSpaces}
        imageMeta={imageMeta}
        title="Product Categories"
        linkPrefix="/products/"
        desktopColumns={productSpaces.length}
        mobileColumns="1"
      />
      <CTASection />
    </div>
  );
}

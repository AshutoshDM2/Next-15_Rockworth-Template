"use client";

import { IProduct } from "@/types/Products";
import { useEffect } from "react";
import { FeatureSection } from "./components/FeatureSection";
import PerformanceSection from "./components/PerformanceSection";
import { SingleProductHero } from "./components/SingleProductHero";
import ProductAboutSection from "./components/ProductAboutSection";

interface SingleProductPageProps {
  product: IProduct;
  imageMeta: string;
}

export function SingleProductPage({
  product,
  imageMeta,
}: SingleProductPageProps) {
  useEffect(() => {
    window.scrollTo(0, 0);
  }, []);

  return (
    <div className="bg-white">
      <SingleProductHero
        headerSectionData={product.header}
        imageUrl={imageMeta}
        productCategory={product.category?.[0]}
        productSpace={product.product_space?.[0]?.product_space_uuid}
      />
      <FeatureSection
        imageUrl={imageMeta}
        mainSectionData={product.main_section}
      />
      <PerformanceSection
        imageUrl={imageMeta}
        performance={product.performance}
      />

      <ProductAboutSection imageUrl={imageMeta} aboutData={product.about} />
      {/* <SingleSimilarProducts products={similarProducts} /> */}
    </div>
  );
}

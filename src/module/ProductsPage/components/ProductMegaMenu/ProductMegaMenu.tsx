/* eslint-disable @typescript-eslint/no-explicit-any */
/* eslint-disable @typescript-eslint/no-unused-vars */
"use client";

import { useEffect, useState } from "react";
import { DesktopProductGrid } from "./DesktopProductGrid";
import { MobileProductGrid } from "./MobileProductGrid";
import { MobileProductList } from "./MobileProductList";
import { ProductSpaceResponse, ViewMode } from "@/types/Products";
import { ProductMegaMenuHeader } from "./ProductMegaMenuHeader";
import { ViewToggle } from "./ViewToggle";
import Section from "@/common/Section/Section";

interface ProductMegaMenuProps {
  productSpacesData: ProductSpaceResponse[];
  imageMeta: string;
  title?: string;
  linkPrefix?: string;
  desktopColumns?: "3" | "4" | "6" | any;
  mobileColumns?: "1" | "2";
  className?: string;
}

export default function ProductMegaMenu({
  productSpacesData,
  imageMeta,
  title,
  linkPrefix = "/products/",
  desktopColumns = "6",
  mobileColumns = "2",
  className = "",
}: ProductMegaMenuProps) {
  const [openAccordion, setOpenAccordion] = useState<string | null>(null);
  const [isMobile, setIsMobile] = useState(false);
  const [viewMode, setViewMode] = useState<ViewMode>("grid");

  useEffect(() => {
    const checkMobile = () => {
      setIsMobile(window.innerWidth < 768);
    };
    checkMobile();
    window.addEventListener("resize", checkMobile);
    return () => window.removeEventListener("resize", checkMobile);
  }, []);

  const handleAccordionToggle = (categoryId: string | null) => {
    setOpenAccordion(openAccordion === categoryId ? null : categoryId);
  };

  return (
    <Section className={`${className}`}>
      <div className="space-y-4">
        <ProductMegaMenuHeader title={title} />
        <ViewToggle
          viewMode={viewMode}
          onViewModeChange={setViewMode}
          className="md:hidden"
        />

        <DesktopProductGrid
          productSpacesData={productSpacesData}
          imageMeta={imageMeta}
          columns={desktopColumns}
          linkPrefix={"/products/"}
        />

        <div className="md:hidden">
          {viewMode === "grid" ? (
            <MobileProductGrid
              productSpacesData={productSpacesData}
              imageMeta={imageMeta}
              openAccordion={openAccordion}
              onAccordionToggle={handleAccordionToggle}
              linkPrefix={linkPrefix}
              columns={mobileColumns}
            />
          ) : (
            <MobileProductList
              productSpacesData={productSpacesData}
              imageMeta={imageMeta}
              openAccordion={openAccordion}
              onAccordionToggle={handleAccordionToggle}
              linkPrefix={linkPrefix}
            />
          )}
        </div>
      </div>
    </Section>
  );
}

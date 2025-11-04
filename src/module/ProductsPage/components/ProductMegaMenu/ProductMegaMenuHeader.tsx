import RockworthMainTitle from "@/common/RockworthMainTitle/RockworthMainTitle";
import type React from "react";
interface ProductMegaMenuHeaderProps {
  title?: string;
  description?: string;
  children?: React.ReactNode;
}

export function ProductMegaMenuHeader({
  title = "Our Product Categories",
  children,
}: ProductMegaMenuHeaderProps) {
  return (
    <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between gap-4">
      <RockworthMainTitle title={title} className="mb-4" />
      {children}
    </div>
  );
}

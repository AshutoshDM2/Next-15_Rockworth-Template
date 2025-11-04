"use client";

import { Button } from "@/components/ui/Button/Button";
import { Filter } from "lucide-react";

interface MobileFilterButtonProps {
  onClick: () => void;
  activeFilterCount: number;
}

export function MobileFilterButton({
  onClick,
  activeFilterCount,
}: MobileFilterButtonProps) {
  return (
    <div className="lg:hidden mb-4">
      <Button
        variant="outline"
        size="sm"
        onClick={onClick}
        className="flex items-center gap-2 text-xs bg-transparent"
      >
        <Filter className="h-2 w-2" />
        Filters
        {activeFilterCount > 0 && (
          <span className="bg-primary text-primary-foreground text-xs rounded-full px-2 py-0.5 ml-1">
            {activeFilterCount}
          </span>
        )}
      </Button>
    </div>
  );
}

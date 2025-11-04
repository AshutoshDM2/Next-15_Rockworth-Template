"use client";

import { ViewMode } from "@/types/Products";
import { Grid3X3, List } from "lucide-react";

interface ViewToggleProps {
  viewMode: ViewMode;
  onViewModeChange: (mode: ViewMode) => void;
  className?: string;
}

export function ViewToggle({
  viewMode,
  onViewModeChange,
  className = "",
}: ViewToggleProps) {
  return (
    <div className={`relative inline-flex ${className}`}>
      {/* Background container */}
      <div className="relative flex bg-muted rounded-lg p-1 transition-all duration-200">
        {/* Sliding background indicator */}
        <div
          className={`absolute top-1 bottom-1 w-[calc(50%-4px)] bg-background rounded-md shadow-sm transition-all duration-300 ease-out ${
            viewMode === "grid" ? "left-1" : "left-[calc(50%+2px)]"
          }`}
        />

        {/* Grid button */}
        <button
          onClick={() => onViewModeChange("grid")}
          className={`relative z-10 flex items-center gap-2 px-3 py-2 text-vase font-medium rounded-md transition-all duration-200 ${
            viewMode === "grid"
              ? "text-brand-color"
              : "text-muted-foreground hover:text-foreground"
          }`}
        >
          <Grid3X3
            className={`h-4 w-4 transition-all duration-200 ${
              viewMode === "grid" ? "scale-110" : "scale-100"
            }`}
          />
          Grid
        </button>

        {/* List button */}
        <button
          onClick={() => onViewModeChange("list")}
          className={`relative z-10 flex items-center gap-2 px-3 py-2 text-base font-medium rounded-md transition-all duration-200 ${
            viewMode === "list"
              ? "text-brand-color"
              : "text-muted-foreground hover:text-foreground"
          }`}
        >
          <List
            className={`h-4 w-4 transition-all duration-200 ${
              viewMode === "list" ? "scale-110" : "scale-100"
            }`}
          />
          List
        </button>
      </div>
    </div>
  );
}

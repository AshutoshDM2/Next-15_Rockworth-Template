"use client";

import { ChevronDown, Square, CheckSquare } from "lucide-react";
import { useState } from "react";

interface CategoryItem {
  id: string;
}

interface CategorySelectorProps {
  categories: CategoryItem[];
  activeCategory: string;
  onCategoryChange: (categoryId: string) => void;
}

export function CategorySelector({
  categories,
  activeCategory,
  onCategoryChange,
}: CategorySelectorProps) {
  const [isOpen, setIsOpen] = useState(false);
  const activeItem = categories.find((cat) => cat.id === activeCategory);

  const handleCategorySelect = (categoryId: string) => {
    onCategoryChange(categoryId);
    setIsOpen(false);
  };

  return (
    <div className="mt-1.5 lg:mt-0 relative mb-8">
      <div className="border-t border-b border-brand-color overflow-hidden">
        <button
          onClick={() => setIsOpen(!isOpen)}
          className="flex items-center justify-between gap-4 w-full text-left bg-white transition-colors px-4 py-2"
        >
          <span className="capitalize text-base font-medium text-brand-color">
            {activeItem?.id || "Select Category"}
          </span>
          <ChevronDown
            className={`h-5 w-5 mt-1 text-brand-color transition-transform ${
              isOpen ? "rotate-180" : ""
            }`}
          />
        </button>
      </div>

      {isOpen && (
        <div className="absolute top-full left-0 mt-2 bg-white border border-gray-200 rounded-lg shadow-lg z-10 min-w-full overflow-hidden">
          {categories.map((category) => (
            <button
              key={category.id}
              onClick={() => handleCategorySelect(category.id)}
              className={`w-full capitalize text-base text-left font-light px-4 py-3 hover:bg-gray-50 transition-colors flex items-center gap-3 ${
                activeCategory === category.id
                  ? "bg-orange-50 text-brand-color"
                  : "text-gray-700"
              }`}
            >
              {activeCategory === category.id ? (
                <CheckSquare className="h-4 w-4 text-brand-color flex-shrink-0" />
              ) : (
                <Square className="h-4 w-4 text-gray-400 flex-shrink-0" />
              )}
              <span>{category.id}</span>
            </button>
          ))}
        </div>
      )}
    </div>
  );
}

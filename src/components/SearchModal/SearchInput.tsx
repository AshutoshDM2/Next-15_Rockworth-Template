"use client";

import { Search } from "lucide-react";
import { forwardRef } from "react";

interface SearchInputProps {
  value: string;
  onChange: (value: string) => void;
}

export const SearchInput = forwardRef<HTMLInputElement, SearchInputProps>(
  ({ value, onChange }, ref) => {
    return (
      <>
        <Search className="w-5 h-5 text-gray-400 mr-2 sm:mr-3 shrink-0" />
        <input
          ref={ref}
          type="text"
          value={value}
          onChange={(e) => onChange(e.target.value)}
          placeholder="Search products..."
          className="flex-1 text-base sm:text-lg outline-none placeholder-gray-400"
        />
      </>
    );
  }
);

SearchInput.displayName = "SearchInput";

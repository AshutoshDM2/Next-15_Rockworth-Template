"use client";

import { useSearch } from "@/contexts/SearchContext";
import { X } from "lucide-react";
import { useEffect, useRef, useState } from "react";
import { SearchInput } from "./SearchInput";
import { SearchContent } from "./SearchContent";

interface SearchModalProps {
  isOpen: boolean;
  onClose: () => void;
}

export function SearchModal({ isOpen, onClose }: SearchModalProps) {
  const [localQuery, setLocalQuery] = useState("");
  const [showResults, setShowResults] = useState(false);
  const inputRef = useRef<HTMLInputElement>(null);

  const { setQuery, search, resetSearch } = useSearch();

  // Focus input when modal opens
  useEffect(() => {
    if (isOpen && inputRef.current) {
      inputRef.current.focus();
    }
  }, [isOpen]);

  // Debounced search
  useEffect(() => {
    const timer = setTimeout(() => {
      if (localQuery.length > 2) {
        setQuery(localQuery);
        search(localQuery);
        setShowResults(true);
      } else {
        setShowResults(false);
      }
    }, 300);

    return () => clearTimeout(timer);
  }, [localQuery, setQuery, search]);

  const handleClose = () => {
    setLocalQuery("");
    setShowResults(false);
    resetSearch();
    onClose();
  };

  if (!isOpen) return null;

  return (
    <div className="fixed inset-0 z-50">
      {/* Backdrop */}
      <div
        className="absolute inset-0 bg-black/20 backdrop-blur-sm"
        onClick={handleClose}
      />

      {/* Modal */}
      <div className="relative max-w-2xl mx-auto mt-16 md:mt-24 px-4">
        <div className="bg-white rounded-xl sm:rounded-2xl shadow-2xl overflow-hidden max-h-[90vh] flex flex-col">
          {/* Header */}
          <div className="flex items-center p-3 sm:p-4 border-b border-gray-100 shrink-0">
            <SearchInput
              ref={inputRef}
              value={localQuery}
              onChange={setLocalQuery}
            />
            <button
              onClick={handleClose}
              className="p-2 rounded-full text-gray-400 hover:text-gray-600 hover:bg-gray-100 transition-colors ml-2 shrink-0"
            >
              <X className="w-5 h-5" />
            </button>
          </div>

          {/* Content */}
          <SearchContent
            showResults={showResults}
            onResultClick={handleClose}
          />
        </div>
      </div>
    </div>
  );
}

"use client";

import { Button } from "@/components/ui/Button/Button";
import { cn } from "@/lib/utils";

interface TabButtonsProps {
  activeTab: "catalogues" | "certificates";
  onTabChange: (tab: "catalogues" | "certificates") => void;
  className?: string;
}

export function TabButtons({
  activeTab,
  onTabChange,
  className,
}: TabButtonsProps) {
  return (
    <div className={cn("flex items-center justify-start gap-2 py-4", className)}>
      <Button
        variant={activeTab === "catalogues" ? "default" : "outline"}
        onClick={() => onTabChange("catalogues")}
        className={cn(
          "rounded-lg px-6 py-2 font-medium transition-all",
          activeTab === "catalogues"
            ? "bg-black text-white hover:bg-gray-800"
            : "bg-white text-black hover:text-black border-gray-300 hover:bg-gray-50"
        )}
      >
        Catalogues
      </Button>
      <Button
        variant={activeTab === "certificates" ? "default" : "outline"}
        onClick={() => onTabChange("certificates")}
        className={cn(
          "rounded-lg px-6 py-2 font-medium transition-all",
          activeTab === "certificates"
            ? "bg-black text-white hover:bg-gray-800"
            : "bg-white text-black hover:text-black border-gray-300 hover:bg-gray-50"
        )}
      >
        Certificates
      </Button>
    </div>
  );
}

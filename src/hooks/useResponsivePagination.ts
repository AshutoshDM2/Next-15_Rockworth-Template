import { useEffect, useState } from "react";

export const useResponsivePagination = () => {
  const [itemsPerPage, setItemsPerPage] = useState(9);

  const getItemsPerPage = () => {
    if (typeof window === "undefined") return 9; // SSR default
    const width = window.innerWidth;
    if (width >= 1024) return 9; // Desktop
    if (width >= 768) return 6; // Tablet
    return 6; // Mobile
  };

  useEffect(() => {
    const handleResize = () => {
      setItemsPerPage(getItemsPerPage());
    };

    // Set initial value
    setItemsPerPage(getItemsPerPage());

    window.addEventListener("resize", handleResize);
    return () => window.removeEventListener("resize", handleResize);
  }, []);

  return itemsPerPage;
};

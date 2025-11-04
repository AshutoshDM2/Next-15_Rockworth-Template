import { useEffect } from "react";

export function useMobileFilterManagement(
  isMobileFilterOpen: boolean,
  setIsMobileFilterOpen: (open: boolean) => void
) {
  // Close mobile filter when screen size changes to desktop
  useEffect(() => {
    const handleResize = () => {
      if (window.innerWidth >= 1024) {
        setIsMobileFilterOpen(false);
      }
    };

    window.addEventListener("resize", handleResize);
    return () => window.removeEventListener("resize", handleResize);
  }, [setIsMobileFilterOpen]);

  const closeMobileFilter = () => {
    setIsMobileFilterOpen(false);
  };

  return { closeMobileFilter };
}

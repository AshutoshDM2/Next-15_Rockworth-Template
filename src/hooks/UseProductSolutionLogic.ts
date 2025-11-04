import { fetchProductSpaces } from "@/lib/ProductsApi/ProductsApi";
import { ProductSpaceResponse } from "@/types/Products";
import { useCallback, useEffect, useRef, useState } from "react";

export function UseProductSolutionLogic() {
  const [currentIndex, setCurrentIndex] = useState(0);
  const [itemsPerView, setItemsPerView] = useState(3);
  const carouselRef = useRef<HTMLDivElement>(null);
  const hasFetched = useRef<boolean>(false);
  const [productSpaces, setProductSpaces] = useState<ProductSpaceResponse[]>(
    []
  );
  const [imageMeta, setImageMeta] = useState<string>("");
  const [hoveredCompany, setHoveredCompany] = useState<string | null>(null);
  const [isTransitioning, setIsTransitioning] = useState(false);
  const [isInitialized, setIsInitialized] = useState(false);

  // Touch handling states
  const [touchStart, setTouchStart] = useState<number | null>(null);
  const [touchEnd, setTouchEnd] = useState<number | null>(null);

  // Define a consistent gap for all screen sizes
  const gap = 24;
  const minSwipeDistance = 50;

  // Fetch productSpaces
  useEffect(() => {
    if (hasFetched.current) return;
    hasFetched.current = true;

    const loadSpaces = async () => {
      try {
        const { data, meta } = await fetchProductSpaces({});
        setProductSpaces(data || []);
        setImageMeta(meta || "");
      } catch (err) {
        console.error("Failed to fetch product spaces:", err);
      }
    };
    loadSpaces();
  }, []);

  // Create extended array for infinite loop - ensure proper cloning
  const extendedproductSpaces = [
    ...productSpaces.slice(-itemsPerView), // Clone last items at the beginning
    ...productSpaces,
    ...productSpaces.slice(0, itemsPerView), // Clone first items at the end
  ];

  // Calculate item width to show exact number of items without partial visibility
  const calculateItemWidth = useCallback(() => {
    if (carouselRef.current) {
      const containerWidth = carouselRef.current.offsetWidth;
      //* Subtract total gap space from container width, then divide by itemsPerView
      const calculatedWidth =
        (containerWidth - (itemsPerView - 1) * gap) / itemsPerView;
      //* Cap the width to a maximum desired size for larger screens
      return Math.min(calculatedWidth, 400); //* 382px is the desired max width
    }
    return 382; //* Fallback for SSR or if ref is not yet available
  }, [itemsPerView, gap]);

  const [itemWidth, setItemWidth] = useState(calculateItemWidth());

  //* Handle responsive items per view and recalculate item width on resize
  useEffect(() => {
    const handleResize = () => {
      const width = window.innerWidth;
      let newItemsPerView = 3; //* Default for desktop
      if (width < 640) {
        newItemsPerView = 1; //* Mobile: 1 item
      } else if (width < 1024) {
        newItemsPerView = 2; //* Tablet: 2 items
      } else {
        newItemsPerView = 3; //* Desktop: 3 items (or more)
      }
      setItemsPerView(newItemsPerView);
      //* Recalculate itemWidth after itemsPerView might have changed
      //* This will be called again in the next render cycle via `setItemWidth(calculateItemWidth())`
    };

    handleResize(); //* Initial call
    window.addEventListener("resize", handleResize);
    return () => window.removeEventListener("resize", handleResize);
  }, []);

  // Recalculate itemWidth when itemsPerView changes
  useEffect(() => {
    setItemWidth(calculateItemWidth());
  }, [itemsPerView, calculateItemWidth]);

  // Initialize currentIndex to start from the first real item (after cloned items)
  useEffect(() => {
    if (!isInitialized) {
      setCurrentIndex(itemsPerView);
      setIsInitialized(true);
    }
  }, [itemsPerView, isInitialized]);

  const goToNext = useCallback(() => {
    if (isTransitioning) return;
    setIsTransitioning(true);
    setCurrentIndex((prev) => prev + 1);
    setTimeout(() => {
      setIsTransitioning(false);
    }, 600);
  }, [isTransitioning]);

  const goToPrevious = useCallback(() => {
    if (isTransitioning) return;
    setIsTransitioning(true);
    setCurrentIndex((prev) => prev - 1);
    setTimeout(() => {
      setIsTransitioning(false);
    }, 600);
  }, [isTransitioning]);

  // Handle infinite loop reset
  useEffect(() => {
    if (!isTransitioning && isInitialized) {
      if (currentIndex >= extendedproductSpaces.length - itemsPerView) {
        // Reset to beginning (after the cloned items at start)
        setTimeout(() => {
          setCurrentIndex(itemsPerView);
        }, 50);
      } else if (currentIndex < itemsPerView) {
        // Reset to end (before the cloned items at end)
        setTimeout(() => {
          setCurrentIndex(extendedproductSpaces.length - itemsPerView * 2);
        }, 50);
      }
    }
  }, [
    currentIndex,
    isTransitioning,
    itemsPerView,
    extendedproductSpaces.length,
    isInitialized,
  ]);

  // Touch handlers
  const onTouchStart = (e: React.TouchEvent) => {
    setTouchEnd(null);
    setTouchStart(e.targetTouches[0].clientX);
  };

  const onTouchMove = (e: React.TouchEvent) => {
    setTouchEnd(e.targetTouches[0].clientX);
  };

  const onTouchEnd = () => {
    if (!touchStart || !touchEnd) return;
    const distance = touchStart - touchEnd;
    const isLeftSwipe = distance > minSwipeDistance;
    const isRightSwipe = distance < -minSwipeDistance;

    if (isLeftSwipe) {
      goToNext();
    } else if (isRightSwipe) {
      goToPrevious();
    }
  };

  // Calculate transform value for proper alignment
  const getTransformValue = () => {
    return -(currentIndex * (itemWidth + gap));
  };
  return {
    hoveredCompany,
    setHoveredCompany,
    onTouchStart,
    onTouchMove,
    onTouchEnd,
    getTransformValue,
    isInitialized,
    goToPrevious,
    goToNext,
    carouselRef,
    gap,
    itemWidth,
    extendedproductSpaces,
    isTransitioning,
    itemsPerView,
    imageMeta,
  };
}

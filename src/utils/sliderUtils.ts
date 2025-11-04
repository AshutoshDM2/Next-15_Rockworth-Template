export function createExtendedArray<T>(items: T[], slidesPerView: number): T[] {
  return [
    ...items.slice(-slidesPerView), // Add last items at the beginning
    ...items,
    ...items.slice(0, slidesPerView), // Add first items at the end
  ];
}

export function calculateTransform(
  currentIndex: number,
  slidesPerView: number,
  totalExtendedItems: number
): number {
  const itemWidth = 100 / totalExtendedItems;
  return -(currentIndex + slidesPerView) * itemWidth;
}

export function getActualCurrentIndex(
  currentIndex: number,
  totalItems: number
): number {
  return ((currentIndex % totalItems) + totalItems) % totalItems;
}

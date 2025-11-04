export const scrollToTopWithOffset = (offset: number = 100) => {
  const scrollToTop = () => {
    const scrollTop = window.pageYOffset || document.documentElement.scrollTop;
    if (scrollTop > offset) {
      window.scrollTo({
        top: offset,
        behavior: "smooth",
      });
    }
  };

  // Use requestAnimationFrame for smooth scrolling
  requestAnimationFrame(scrollToTop);
};

export const scrollToElementWithOffset = (
  elementId: string,
  offset: number = 100
) => {
  const element = document.getElementById(elementId);
  if (element) {
    const elementTop = element.offsetTop - offset;
    window.scrollTo({
      top: elementTop,
      behavior: "smooth",
    });
  }
};

export const scrollToTop = () => {
  window.scrollTo({
    top: 0,
    behavior: "smooth",
  });
};

export const getScrollPosition = () => {
  return window.pageYOffset || document.documentElement.scrollTop;
};

export const isElementInViewport = (element: HTMLElement) => {
  const rect = element.getBoundingClientRect();
  return (
    rect.top >= 0 &&
    rect.left >= 0 &&
    rect.bottom <=
      (window.innerHeight || document.documentElement.clientHeight) &&
    rect.right <= (window.innerWidth || document.documentElement.clientWidth)
  );
};

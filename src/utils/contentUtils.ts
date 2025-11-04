interface WordPressImage {
  src: string;
  alt: string;
  width: number;
  height: number;
  href?: string;
}

export const extractImagesFromContent = (content: string): WordPressImage[] => {
  const parser = new DOMParser();
  const doc = parser.parseFromString(content, "text/html");
  const images: WordPressImage[] = [];

  const galleryItems = doc.querySelectorAll(".gallery-item");
  galleryItems.forEach((item) => {
    const img = item.querySelector("img");
    if (img) {
      const src = img.getAttribute("src") || "";
      const alt = img.getAttribute("alt") || "";
      const width = Number.parseInt(img.getAttribute("width") || "0");
      const height = Number.parseInt(img.getAttribute("height") || "0");
      const href = item.querySelector("a")?.getAttribute("href") || undefined;

      images.push({ src, alt, width, height, href });
    }
  });

  return images;
};

export const removeImagesFromContent = (content: string): string => {
  // Remove gallery shortcode and associated divs
  let cleanedContent = content.replace(
    /<div id="gallery-.*?>[\s\S]*?<\/div>/g,
    ""
  );

  // Remove individual image links and images outside galleries
  cleanedContent = cleanedContent.replace(/<a.*?><img.*?><\/a>/g, "");
  cleanedContent = cleanedContent.replace(/<img.*?>/g, "");

  return cleanedContent;
};

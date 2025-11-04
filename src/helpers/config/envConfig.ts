export const getBaseUrl = (): string => {
  return process.env.NEXT_PUBLIC_BACKEND_API as string;
};

// Function to extract YouTube video ID from URL
export const getYouTubeVideoId = (url: string) => {
  const regExp = /^.*(youtu.be\/|v\/|u\/\w\/|embed\/|watch\?v=|&v=)([^#&?]*).*/;
  const match = url.match(regExp);
  return match && match[2].length === 11 ? match[2] : null;
};

// Function to get YouTube embed URL
export const getYouTubeEmbedUrl = (url: string) => {
  const videoId = getYouTubeVideoId(url);
  return videoId
    ? `https://www.youtube.com/embed/${videoId}?autoplay=1&rel=0`
    : "";
};

// Alternative: Create a separate utility file for HTML processing

/**
 * Strips HTML tags and decodes HTML entities from a string
 * @param html - HTML string to process
 * @param maxLength - Maximum length for the output (default: 160 for meta descriptions)
 * @returns Plain text string
 */
export function stripHtmlTags(html: string, maxLength = 160): string {
  if (!html) return "";

  // Remove HTML tags
  let text = html.replace(/<[^>]*>/g, "");

  // Decode HTML entities
  const entityMap: { [key: string]: string } = {
    "&amp;": "&",
    "&lt;": "<",
    "&gt;": ">",
    "&quot;": '"',
    "&#39;": "'",
    "&apos;": "'",
    "&nbsp;": " ",
    "&copy;": "©",
    "&reg;": "®",
    "&trade;": "™",
  };

  // Replace entities
  text = text.replace(/&[a-zA-Z0-9#]+;/g, (entity) => {
    return entityMap[entity] || entity;
  });

  // Clean up extra whitespace
  text = text.replace(/\s+/g, " ").trim();

  // Truncate if needed
  if (text.length > maxLength) {
    text = text.substring(0, maxLength - 3) + "...";
  }

  return text;
}

/**
 * Extracts plain text from HTML for use in meta descriptions
 * @param html - HTML string
 * @returns Plain text suitable for meta description
 */
export function getMetaDescription(html: string): string {
  return stripHtmlTags(html, 160);
}

/**
 * Extracts plain text from HTML for use in social media descriptions
 * @param html - HTML string
 * @returns Plain text suitable for social media
 */
export function getSocialDescription(html: string): string {
  return stripHtmlTags(html, 200);
}

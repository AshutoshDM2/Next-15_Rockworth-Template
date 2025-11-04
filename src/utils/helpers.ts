// Helper function to generate a slug
export const generateSlug = (name: string): string => {
  return name
    .toLowerCase()
    .replace(/[^a-z0-9\s-]/g, "") // Remove non-alphanumeric chars except space and hyphen
    .trim() // Trim leading/trailing whitespace
    .replace(/\s+/g, "-") // Replace spaces with single hyphens
    .replace(/-+/g, "-"); // Replace multiple hyphens with single hyphen
};

export interface Page {
  url: string;
  lastModified?: Date | string;
}

export async function getAllPages(): Promise<Page[]> {
  const now = new Date();

  return [
    { url: "/", lastModified: now },
    { url: "/about-us", lastModified: now },
    { url: "/careers", lastModified: now },
    { url: "/contact-us", lastModified: now },
    { url: "/knowledge", lastModified: now },
    { url: "/manufacturing", lastModified: now },
    { url: "/partner-with-us", lastModified: now },
    { url: "/privacy-policy", lastModified: now },
    { url: "/products", lastModified: now },
    { url: "/projects", lastModified: now },
    { url: "/resources", lastModified: now },
    { url: "/shop-now", lastModified: now },
    { url: "/sustainability", lastModified: now },
    { url: "/terms-of-use", lastModified: now },
    { url: "/knowledge", lastModified: now },
    { url: "/products/collab-spaces", lastModified: now },
    { url: "/products/office-spaces", lastModified: now },
    { url: "/products/acoustics-carpets", lastModified: now },
    { url: "/knowledge", lastModified: now },
  ];
}

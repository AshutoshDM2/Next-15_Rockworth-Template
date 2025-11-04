export interface Overview {
  title: string;
  description: string;
  tags: string[];
}
export interface Challenge {
  title: string;
  description: string;
  points: string[];
}

export interface Project {
  id: number;
  title: string;
  slug: string;
  featuredImage: string;
  excerpt: string;
  readingTime: string;
  date: string;
  categories: { id: number; name: string; slug: string }[];
  tags: { id: number; name: string; slug: string }[];
  content: string;
  seoData: {
    title: string;
    description: string;
    ogImage: string;
  };
}

export interface ProjectCategory {
  id: number;
  name: string;
  slug: string;
}

export interface ProjectTag {
  id: number;
  name: string;
  slug: string;
}

export interface ProjectSeoData {
  title: string;
  description: string;
  ogImage: string;
}

export interface ProjectItem {
  id: number;
  title: string | { rendered: string };
  content: string;
  excerpt: string;
  slug: string;
  date: string;
  featuredImage: string;
  categories: ProjectCategory[];
  tags: ProjectTag[];
  readingTime: string;
  seoData: ProjectSeoData;
}

export interface ProjectsGridSectionProps {
  project: ProjectItem[];
}

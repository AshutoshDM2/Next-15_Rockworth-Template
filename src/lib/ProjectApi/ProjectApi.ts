/* eslint-disable @typescript-eslint/no-explicit-any */
import { cache } from "react";
import DOMPurify from "isomorphic-dompurify";
import type { WordPressProject, ProcessedProject } from "@/types/project";

const WORDPRESS_API_URL =
  process.env.NEXT_PUBLIC_BLOG_URL ||
  "https://blogapi.rockworth.net/wp-json/wp/v2";

// Helper function to calculate reading time
function calculateReadingTime(content: string): string {
  const wordsPerMinute = 200;
  const textContent = content.replace(/<[^>]*>/g, "");
  const wordCount = textContent
    .split(/\s+/)
    .filter((word) => word.length > 0).length;
  const minutes = Math.ceil(wordCount / wordsPerMinute);
  return `${minutes} min read`;
}

// Helper function to process raw WordPress data
function processProjectData(project: WordPressProject): ProcessedProject {
  const featuredImage =
    project._embedded?.["wp:featuredmedia"]?.[0]?.source_url ||
    project.yoast_head_json?.og_image?.[0]?.url ||
    "/placeholder.svg?height=400&width=600";

  const categories =
    project._embedded?.["wp:term"]?.[0]
      ?.filter((term) => term.taxonomy === "category")
      ?.map((cat) => ({
        id: cat.id,
        name: cat.name,
        slug: cat.slug,
      })) || [];

  const tags =
    project._embedded?.["wp:term"]?.[1]
      ?.filter((term) => term.taxonomy === "post_tag")
      ?.map((tag) => ({
        id: tag.id,
        name: tag.name,
        slug: tag.slug,
      })) || [];

  // Extract excerpt from content (first paragraph)
  const contentText = project.content.rendered.replace(/<[^>]*>/g, "");
  const excerpt =
    contentText.substring(0, 200) + (contentText.length > 200 ? "..." : "");

  return {
    id: project.id,
    title: project.title.rendered,
    content: DOMPurify.sanitize(project.content.rendered),
    excerpt,
    slug: project.slug,
    date: project.date,
    featuredImage,
    categories,
    tags,
    readingTime: calculateReadingTime(project.content.rendered),
    seoData: {
      title: project.yoast_head_json?.title || project.title.rendered,
      description: project.yoast_head_json?.og_description || excerpt,
      ogImage: project.yoast_head_json?.og_image?.[0]?.url || featuredImage,
    },
  };
}

// Fetch all projects with pagination
export const getProjects = cache(
  async (page: number = 1, perPage: number = 9) => {
    try {
      const response = await fetch(
        `${WORDPRESS_API_URL}/project?page=${page}&per_page=${perPage}&orderby=title&order=asc&_embed`,
        {
          next: {
            revalidate: 300,
            tags: ["projects"],
          },
        }
      );

      if (!response.ok) {
        throw new Error(`Failed to fetch projects: ${response.status}`);
      }

      const projects: WordPressProject[] = await response.json();
      const totalPages = parseInt(
        response.headers.get("X-WP-TotalPages") || "1"
      );
      const total = parseInt(response.headers.get("X-WP-Total") || "0");
      const processedProjects = projects.map(processProjectData);

      return {
        projects: processedProjects,
        pagination: {
          currentPage: page,
          totalPages,
          total,
          hasNextPage: page < totalPages,
          hasPrevPage: page > 1,
        },
      };
    } catch (error) {
      console.error("Error fetching projects:", error);
      return {
        projects: [],
        pagination: {
          currentPage: 1,
          totalPages: 1,
          total: 0,
          hasNextPage: false,
          hasPrevPage: false,
        },
      };
    }
  }
);

// Fetch related projects from the same category, excluding current project
export const getRelatedProjects = cache(
  async (
    categorySlug: string,
    currentProjectSlug: string,
    perPage: number = 3
  ) => {
    try {
      // First, get the category ID by slug
      const categoryResponse = await fetch(
        `${WORDPRESS_API_URL}/categories?slug=${encodeURIComponent(
          categorySlug
        )}`,
        {
          next: {
            revalidate: 300,
            tags: [`category-${categorySlug}`],
          },
        }
      );

      if (!categoryResponse.ok) {
        throw new Error(`Failed to fetch category: ${categoryResponse.status}`);
      }

      const categories = await categoryResponse.json();
      if (!categories || categories.length === 0) {
        return { projects: [] };
      }

      const categoryId = categories[0].id;

      // Fetch projects from this category with a higher per_page to ensure we get enough after filtering
      const response = await fetch(
        `${WORDPRESS_API_URL}/project?categories=${categoryId}&per_page=${
          perPage + 5
        }&_embed`,
        {
          next: {
            revalidate: 300,
            tags: [`related-projects-${categorySlug}`],
          },
        }
      );

      if (!response.ok) {
        throw new Error(`Failed to fetch related projects: ${response.status}`);
      }

      const projects: WordPressProject[] = await response.json();

      // Filter out the current project and limit to requested number
      const filteredProjects = projects
        .filter((project) => project.slug !== currentProjectSlug)
        .slice(0, perPage);

      const processedProjects = filteredProjects.map(processProjectData);

      return {
        projects: processedProjects,
      };
    } catch (error) {
      console.error("Error fetching related projects:", error);
      return {
        projects: [],
      };
    }
  }
);

// Updated getSuggestCategoryProjects to use the new getRelatedProjects function
export const getSuggestCategoryProjects = cache(
  async (
    categorySlug: string,
    currentProjectSlug: string,
    perPage: number = 3
  ) => {
    return getRelatedProjects(categorySlug, currentProjectSlug, perPage);
  }
);

// Fetch single project by slug
export const getProjectBySlug = cache(
  async (slug: string): Promise<ProcessedProject | null> => {
    try {
      const response = await fetch(
        `${WORDPRESS_API_URL}/project?slug=${encodeURIComponent(slug)}&_embed`,
        {
          next: {
            revalidate: 3600, // 1 hour
            tags: [`project-${slug}`],
          },
        }
      );

      if (!response.ok) {
        throw new Error(`Failed to fetch project: ${response.status}`);
      }

      const projects: WordPressProject[] = await response.json();
      if (!projects || projects.length === 0) {
        return null;
      }

      return processProjectData(projects[0]);
    } catch (error) {
      console.error("Error fetching project:", error);
      return null;
    }
  }
);

// Fetch all categories for "project" post type
export const getProjectCategories = cache(async () => {
  try {
    const response = await fetch(
      `${WORDPRESS_API_URL}/categories?per_page=100`,
      {
        next: {
          revalidate: 300,
          tags: ["project-categories"],
        },
      }
    );

    if (!response.ok) {
      throw new Error(`Failed to fetch project categories: ${response.status}`);
    }

    const categories = await response.json();
    return categories.map((cat: any) => ({
      id: cat.id,
      name: cat.name,
      slug: cat.slug,
    }));
  } catch (error) {
    console.error("Error fetching project categories:", error);
    return [];
  }
});

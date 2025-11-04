import type {
  BlogApiResponse,
  BlogPost,
  RawWpPost,
  SingleBlogPost,
} from "@/module/KnowledgePage/IKnowledgeTypes";
import { cache } from "react";
import DOMPurify from "isomorphic-dompurify";

// Solution 1: Use ISR (Incremental Static Regeneration)
export async function getBlogPosts(
  page = 1
): Promise<{ posts: BlogPost[]; totalPages: number }> {
  const baseUrl = process.env.NEXT_PUBLIC_BLOG_URL;
  const postsUrl = `${baseUrl}/posts?per_page=6&page=${page}&_embed`;

  try {
    // Use revalidation instead of no-store for static generation with updates
    const response = await fetch(postsUrl, {
      next: {
        revalidate: 300, // Revalidate every 5 minutes
        tags: ["blog-posts"], // For on-demand revalidation
      },
    });

    if (!response.ok) throw new Error("Failed to fetch posts");

    const data: RawWpPost[] = await response.json();
    const totalPages = Number.parseInt(
      response.headers.get("x-wp-totalpages") || "0",
      10
    );

    const posts: BlogPost[] = data.map(
      (post): BlogPost => ({
        id: post.id,
        title: post.title.rendered,
        shortText: post.excerpt.rendered,
        rawDate: post.date,
        link: post.slug,
        image:
          post._embedded?.["wp:featuredmedia"]?.[0]?.media_details?.sizes?.full
            ?.source_url || "/images/blog/blog1.webp",
        readingTime: post.readingTime,
        categories: post._embedded?.["wp:term"]?.[0]
          ?.filter((term) => term.taxonomy === "category")
          ?.map((category) => ({
            id: category.id,
            name: category.name,
          })) || [{ id: null, name: "Uncategorized" }],
        yoast_head_json: post.yoast_head_json || null,
      })
    );

    return { posts, totalPages };
  } catch (error) {
    console.error("Error fetching blog posts:", error);
    return { posts: [], totalPages: 0 };
  }
}

export const getBlogPostBySlug = cache(
  async (slug: string): Promise<SingleBlogPost> => {
    if (!slug || typeof slug !== "string") {
      throw new Error("Invalid slug provided");
    }

    const blogUrl = process.env.NEXT_PUBLIC_BLOG_URL;
    if (!blogUrl) {
      throw new Error("Blog URL not configured");
    }

    try {
      const res = await fetch(
        `${blogUrl}/posts?slug=${encodeURIComponent(slug)}&_embed`,
        {
          next: {
            revalidate: 3600, // Cache for 1 hour
            tags: [`blog-post-${slug}`], // For on-demand revalidation
          },
        }
      );

      if (!res.ok) {
        if (res.status === 404) {
          throw new Error("Post not found");
        }
        throw new Error(`Failed to fetch post: ${res.status}`);
      }

      const posts: BlogApiResponse[] = await res.json();
      if (!posts || !posts.length) {
        throw new Error("Post not found");
      }

      const post = posts[0];

      // Calculate reading time (average 200 words per minute)
      const wordCount = post.content.rendered
        .replace(/<[^>]*>/g, "")
        .split(/\s+/).length;
      const readingTime = Math.ceil(wordCount / 200);

      return {
        id: post.id,
        title: post.title.rendered,
        content: DOMPurify.sanitize(post.content.rendered), // Sanitize HTML content
        shortText: post.excerpt?.rendered
          ? DOMPurify.sanitize(post.excerpt.rendered)
          : "",
        rawDate: post.date,
        link: post.slug,
        slug: post.slug,
        image:
          post._embedded?.["wp:featuredmedia"]?.[0]?.media_details?.sizes?.full
            ?.source_url || "/images/blog/default-blog-image.webp",
        categories: post._embedded?.["wp:term"]?.[0]
          ?.filter((term) => term.taxonomy === "category")
          ?.map((category) => ({
            id: category.id,
            name: category.name,
          })) || [{ id: null, name: "Uncategorized" }],
        tags:
          post._embedded?.["wp:term"]
            ?.flat()
            ?.filter((term) => term.taxonomy === "post_tag")
            ?.map((tag) => ({
              id: tag.id,
              name: tag.name,
              slug: tag.slug || "",
            })) || [],
        author: post._embedded?.author?.[0]
          ? {
              id: post._embedded.author[0].id,
              name: post._embedded.author[0].name,
              avatar: post._embedded.author[0].avatar_urls?.["96"],
              description: post._embedded.author[0].description || "",
            }
          : undefined,
        yoast_head_json: post.yoast_head_json || null,
        readingTime,
      };
    } catch (error) {
      console.error("Error fetching blog post:", error);
      throw error;
    }
  }
);

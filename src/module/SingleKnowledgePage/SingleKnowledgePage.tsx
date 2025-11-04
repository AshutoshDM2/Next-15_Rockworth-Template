/* eslint-disable @next/next/no-img-element */
"use client";

import Section from "@/common/Section/Section";
import Breadcrumb from "@/components/Common/Breadcrumb";
import FallbackImage from "@/components/Common/FallBackLogo";
import OptimizedImage from "@/components/OptimizedImage/OptimizedImage";
import { Badge } from "@/components/ui/Badge/Badge";
import { Button } from "@/components/ui/Button/Button";
import { BookOpen, Calendar, Clock, Share2 } from "lucide-react";
import { useState } from "react";
import { SingleBlogPost } from "../KnowledgePage/IKnowledgeTypes";
import { ShareButtons } from "./components/ShareButton";
import { TableOfContents } from "./components/TableOfContents";

interface BlogDetailPageProps {
  post: SingleBlogPost;
}

export default function BlogDetailPage({ post }: BlogDetailPageProps) {
  const [showShareMenu, setShowShareMenu] = useState(false);
  const [imageErrorMap, setImageErrorMap] = useState<
    Record<string | number, boolean>
  >({});
  const key = post.id;
  const hasError = imageErrorMap[key] || !post.image?.trim();

  const markImageError = (key: string | number) => {
    setImageErrorMap((prev) => ({ ...prev, [key]: true }));
  };

  const formatDate = (dateString: string) => {
    return new Date(dateString).toLocaleDateString("en-US", {
      year: "numeric",
      month: "long",
      day: "numeric",
    });
  };

  const structuredData = {
    "@context": "https://schema.org",
    "@type": "BlogPosting",
    headline: post.title,
    description: post.shortText.replace(/<[^>]*>/g, ""),
    image: post.image,
    datePublished: post.rawDate,
    dateModified: post.rawDate,
    author: post.author
      ? {
          "@type": "Person",
          name: post.author.name,
          description: post.author.description,
        }
      : undefined,
    publisher: {
      "@type": "Organization",
      name: "Your Blog",
    },
    mainEntityOfPage: {
      "@type": "WebPage",
      "@id": typeof window !== "undefined" ? window.location.href : "",
    },
  };

  return (
    <>
      {/* Structured Data */}
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(structuredData) }}
      />

      <div className="min-h-screen bg-gray-50">
        <Section>
          {/* Back Navigation */}
          <nav className="mb-6" aria-label="Breadcrumb">
            <Breadcrumb
              textSize="sm"
              items={[
                { label: "Knowledge", href: "/knowledge" },
                ...(post.categories.length > 0
                  ? [
                      {
                        label: post.categories[0].name,
                        href: `/knowledge?category=${encodeURIComponent(
                          post.categories[0].name
                        )}`,
                      },
                    ]
                  : post.tags.length > 0
                  ? [
                      {
                        label: post.tags[0].name,
                        href: `/knowledge?tag=${encodeURIComponent(
                          post.tags[0].name
                        )}`,
                      },
                    ]
                  : [{ label: "Blogs", href: "/knowledge" }]),
                { label: post.title, href: "" },
              ]}
            />
          </nav>

          {/* Featured Image */}
          {post.image && (
            <figure className="mb-8">
              <div className="w-full lg:h-[70vh] rounded-lg overflow-hidden shadow-lg">
                {hasError ? (
                  <FallbackImage rounded={true} />
                ) : (
                  <img
                    src={post.image}
                    alt={post.title}
                    className="w-full lg:h-full lg:object-cover object-bottom rounded-xl"
                    onError={() => markImageError(key)}
                  />
                )}
              </div>
            </figure>
          )}

          {/* Article Header */}
          <header className="mb-8">
            {/* Categories */}
            {post.categories.length > 0 && (
              <div className="flex flex-wrap gap-2 mb-4">
                {post.categories.map((category) => (
                  <Badge
                    key={category.id}
                    variant="secondary"
                    className="text-xs"
                  >
                    {category.name}
                  </Badge>
                ))}
              </div>
            )}

            {/* Title */}
            <h1 className="text-[1.8rem] md:text-[3rem] font-normal text-black mb-6 lg:leading-[4rem]">
              {post.title}
            </h1>

            {/* Meta Information */}
            <div className="flex flex-wrap items-center gap-6 text-sm text-gray-600 mb-6">
              <div className="flex items-center gap-2">
                <Calendar className="w-4 h-4" />
                <time dateTime={post.rawDate}>{formatDate(post.rawDate)}</time>
              </div>

              {post.readingTime && (
                <div className="flex items-center gap-2">
                  <Clock className="w-4 h-4" />
                  <span>{post.readingTime} min read</span>
                </div>
              )}

              <div className="flex items-center gap-2">
                <BookOpen className="w-4 h-4" />
                <span>Article</span>
              </div>
            </div>

            {/* Share Button */}
            <div className="relative">
              <Button
                variant="outline"
                size="sm"
                onClick={() => setShowShareMenu(!showShareMenu)}
                className="flex items-center gap-2 text-brand-color border-brand-color hover:bg-brand-color"
              >
                <Share2 className="w-4 h-4" />
                Share
              </Button>

              {showShareMenu && (
                <div className="absolute top-full left-0 mt-2 z-10">
                  <ShareButtons
                    url={
                      typeof window !== "undefined" ? window.location.href : ""
                    }
                    title={post.title}
                    onClose={() => setShowShareMenu(false)}
                  />
                </div>
              )}
            </div>
          </header>

          <div className="grid grid-cols-1 lg:grid-cols-4 gap-8">
            {/* Table of Contents - Desktop */}
            <aside className="hidden lg:block">
              <div className="sticky top-28">
                <TableOfContents content={post.content || ""} />
              </div>
            </aside>

            {/* Main Content */}
            <main className="lg:col-span-3">
              {/* Article Content */}
              <article
                className="prose prose-lg max-w-none text-gray-800 prose-headings:text-black prose-a:text-blue-600 prose-strong:text-black prose-p:text-base prose-p:text-gray-700 prose-p:leading-relaxed prose-p:font-light prose-h2:text-2xl prose-h2:lg:text-3xl prose-h2:font-normal prose-h2:text-black prose-h2:tracking-wide prose-h1:text-3xl prose-h1:lg:text-4xl prose-h1:font-semibold prose-h1:text-black prose-h3:text-xl prose-h3:lg:text-2xl prose-h3:font-medium prose-h3:text-black prose-h4:text-lg prose-h4:lg:text-xl prose-h4:font-medium prose-h4:text-black prose-h5:text-base prose-h5:lg:text-lg prose-h5:font-medium prose-h5:text-black prose-h6:text-sm prose-h6:lg:text-base prose-h6:font-medium prose-h6:text-black prose-ul:text-base prose-ul:text-gray-700 prose-ul:leading-relaxed prose-ul:font-light prose-li:text-base prose-li:text-gray-700 prose-li:leading-relaxed prose-li:font-light prose-ol:text-base prose-ol:text-gray-700 prose-ol:leading-relaxed prose-ol:font-light prose-blockquote:text-base prose-blockquote:text-gray-600 prose-blockquote:leading-relaxed prose-blockquote:font-light prose-code:text-sm prose-code:bg-gray-100 prose-code:px-1 prose-code:py-0.5 prose-code:rounded prose-pre:bg-gray-100 prose-pre:text-sm prose-pre:p-4 prose-pre:rounded-lg"
                dangerouslySetInnerHTML={{ __html: post.content || "" }}
              />

              {/* Tags */}
              {post.tags.length > 0 && (
                <section className="mt-12 pt-8 border-t border-gray-200">
                  <h3 className="text-lg font-semibold text-black mb-4">
                    Tags
                  </h3>
                  <div className="flex flex-wrap gap-2">
                    {post.tags.map((tag) => (
                      <Badge key={tag.id} variant="outline" className="text-sm">
                        #{tag.name}
                      </Badge>
                    ))}
                  </div>
                </section>
              )}

              {/* Author Bio */}
              {post.author && post.author.description && (
                <section className="mt-12 pt-8 border-t border-gray-200">
                  <div className="flex items-start gap-4">
                    {post.author.avatar && (
                      <OptimizedImage
                        src={post.author.avatar}
                        alt={post.author.name}
                        width={64}
                        height={64}
                        className="rounded-full"
                        rounded={true}
                      />
                    )}
                    <div>
                      <h3 className="text-lg font-semibold text-black mb-2">
                        About {post.author.name}
                      </h3>
                      <p className="text-gray-600 leading-relaxed">
                        {post.author.description}
                      </p>
                    </div>
                  </div>
                </section>
              )}
            </main>
          </div>
        </Section>
      </div>
    </>
  );
}

"use client";

import Section from "@/common/Section/Section";
import type { Project } from "@/types/projects";
import DOMPurify from "dompurify";
import { useState, useEffect } from "react";

interface OverviewOfProjectsProps {
  projectsData: Project;
}

export function OverviewOfProjects({ projectsData }: OverviewOfProjectsProps) {
  const [activeTag, setActiveTag] = useState<string | null>(null);
  const [sanitizedHtml, setSanitizedHtml] = useState("");

  useEffect(() => {
    if (typeof window !== "undefined") {
      const sanitized = DOMPurify.sanitize(projectsData.content);

      let processedHtml = sanitized;

      // Remove <p> and </p> tags while preserving the content inside
      processedHtml = processedHtml.replace(/<\/?p[^>]*>/gi, "");

      // Remove location content like "Location:Gurugram", "Location: Mumbai", etc.
      processedHtml = processedHtml.replace(/Location:\s*[^\s<]+/gi, "");

      // Also remove any standalone location text that might have spaces
      processedHtml = processedHtml.replace(/Location:\s*[^<\n\r]+/gi, "");

      setSanitizedHtml(processedHtml);
    }
  }, [projectsData.content]);

  const handleTagClick = (tagSlug: string) => {
    setActiveTag((prev) => (prev === tagSlug ? null : tagSlug));
  };

  return (
    <div className="relative overflow-hidden bg-white flex flex-col">
      <Section>
        <div className="space-y-2">
          {/* Title */}
          {/* <div className="overflow-hidden">
            <h2 className="text-2xl lg:text-3xl font-normal text-black tracking-wide">
              {projectsData.title}
            </h2>
          </div> */}

          {/* Description */}
          <div
            className="text-base leading-relaxed font-light text-gray-700 prose prose-sm lg:prose-base max-w-none"
            dangerouslySetInnerHTML={{ __html: sanitizedHtml }}
          />

          {/* Tags */}
          {projectsData.tags.length > 0 && (
            <div className="flex flex-wrap gap-2 lg:gap-3">
              {projectsData.tags.map((tag) => (
                <button
                  key={tag.id}
                  onClick={() => handleTagClick(tag.slug)}
                  className={`flex-shrink-0 px-3 py-1 lg:px-6 lg:py-2 rounded-full text-xs lg:text-sm font-normal transition-all duration-200 ${
                    activeTag === tag.slug
                      ? "bg-black text-white shadow-md"
                      : "bg-white text-black border border-gray-300 hover:bg-gray-50 hover:border-gray-400"
                  }`}
                  aria-pressed={activeTag === tag.slug}
                  type="button"
                >
                  {tag.name}
                </button>
              ))}
            </div>
          )}
        </div>
      </Section>
    </div>
  );
}

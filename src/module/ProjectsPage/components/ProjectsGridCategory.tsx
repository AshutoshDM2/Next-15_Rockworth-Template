"use client";

import { useEffect, useMemo, useRef, useState } from "react";
import Section from "@/common/Section/Section";
import { ChevronLeft, ChevronRight } from "lucide-react";
import { ProjectsGridSection } from "./ProjectsGridSection";
import { Project } from "@/types/projects";
import GridSkeletonLoading from "./GridSkeletonLoading";
import { getProjects } from "@/lib/ProjectApi/ProjectApi";
import { Pagination } from "@/components/Products/Pagination";
import { useResponsivePagination } from "@/hooks/useResponsivePagination";
import { scrollToTopWithOffset } from "@/utils/scrollUtils";

interface ProjectsGridCategoryProps {
  projects: Project[];
  categories: { id: number; name: string; slug: string }[];
  initialPagination: {
    currentPage: number;
    totalPages: number;
    total: number;
    hasNextPage: boolean;
    hasPrevPage: boolean;
  };
}

export function ProjectsGridCategory({
  projects,
  categories,
  initialPagination,
}: ProjectsGridCategoryProps) {
  const [page, setPage] = useState(1);
  const [posts, setPosts] = useState<Project[]>(projects);
  const [pagination, setPagination] = useState(initialPagination);
  const [loading, setLoading] = useState(false);
  const itemsPerPage = useResponsivePagination();

  const filteredCategories = categories.filter(
    (cat) => cat.name.toLowerCase() !== "uncategorized"
  );

  const [selectedCategory, setSelectedCategory] = useState(
    filteredCategories[0]?.name || ""
  );

  const scrollContainerRef = useRef<HTMLDivElement>(null);
  const previousPageRef = useRef(1);

  const filteredProjects = useMemo(() => {
    if (!selectedCategory) return posts;
    return posts.filter((project) =>
      project.categories.some((cat) => cat.name === selectedCategory)
    );
  }, [posts, selectedCategory]);

  const hasMounted = useRef(false);

  useEffect(() => {
    if (!hasMounted.current) {
      hasMounted.current = true;
      return; // Skip first load (SSR already gave page 1 data)
    }

    setLoading(true);
    getProjects(page, itemsPerPage).then(({ projects, pagination }) => {
      setPosts(projects);
      setPagination(pagination);
      setLoading(false);
      
      // Scroll to top with offset when page changes (but not on first load)
      if (previousPageRef.current !== page) {
        scrollToTopWithOffset(300); // Offset to account for header
      }
      previousPageRef.current = page;
    });
  }, [page, itemsPerPage]);

  const isSlider = filteredCategories.length > 5;

  const scroll = (direction: "left" | "right") => {
    if (scrollContainerRef.current) {
      const scrollAmount = 200;
      scrollContainerRef.current.scrollBy({
        left: direction === "left" ? -scrollAmount : scrollAmount,
        behavior: "smooth",
      });
    }
  };

  const handlePageChange = (newPage: number) => {
    setPage(newPage);
  };

  const getVisiblePages = () => {
    const current = pagination.currentPage;
    const total = pagination.totalPages;
    const delta = 2;

    const range = [];
    const rangeWithDots = [];

    for (
      let i = Math.max(2, current - delta);
      i <= Math.min(total - 1, current + delta);
      i++
    ) {
      range.push(i);
    }

    if (current - delta > 2) {
      rangeWithDots.push(1, "...");
    } else {
      rangeWithDots.push(1);
    }

    rangeWithDots.push(...range);

    if (current + delta < total - 1) {
      rangeWithDots.push("...", total);
    } else if (total > 1) {
      rangeWithDots.push(total);
    }

    return rangeWithDots;
  };

  if (!projects.length || !filteredCategories.length) {
    return <GridSkeletonLoading 
      itemsCount={itemsPerPage} 
      isLoading={true}
      message="Loading projects..."
    />;
  }

  return (
    <div id="project" className="scroll-mt-20">
      <Section className="py-0 lg:py-0">
        {isSlider ? (
          <div className="relative p-2 bg-transparent rounded-2xl">
            <div className="flex items-center">
              <button
                onClick={() => scroll("left")}
                className="flex-shrink-0 p-2 mr-2 shadow-2xl bg-white text-brand-color border border-brand-color rounded-full hover:bg-brand-color hover:text-white transition-colors"
              >
                <ChevronLeft className="w-4 h-4" />
              </button>
              <div
                ref={scrollContainerRef}
                className="flex gap-3 overflow-x-auto scrollbar-hide"
                style={{ scrollbarWidth: "none", msOverflowStyle: "none" }}
              >
                {filteredCategories.map((category) => (
                  <button
                    key={category.slug}
                    onClick={() => setSelectedCategory(category.name)}
                    className={`mx-1 flex-shrink-0 px-6 py-2 rounded-full text-sm font-normal transition-colors duration-500 ${
                      selectedCategory === category.name
                        ? "bg-black text-white"
                        : "bg-white border border-gray-300 text-black hover:bg-black hover:text-white"
                    }`}
                  >
                    {category.name}
                  </button>
                ))}
              </div>
              <button
                onClick={() => scroll("right")}
                className="flex-shrink-0 p-2 ml-2 shadow-2xl bg-white text-brand-color border border-brand-color rounded-full hover:bg-brand-color hover:text-white transition-colors"
              >
                <ChevronRight className="w-4 h-4" />
              </button>
            </div>
          </div>
        ) : (
          <div className="flex flex-wrap gap-3 rounded-2xl">
            {filteredCategories.map((category) => (
              <button
                key={category.slug}
                onClick={() => setSelectedCategory(category.name)}
                className={`flex-shrink-0 px-6 py-2 rounded-full text-sm font-normal transition-colors ${
                  selectedCategory === category.name
                    ? "bg-black text-white"
                    : "bg-white text-black border border-black hover:bg-black hover:text-white"
                }`}
              >
                {category.name}
              </button>
            ))}
          </div>
        )}

        {loading ? (
          <GridSkeletonLoading 
            itemsCount={itemsPerPage} 
            isLoading={loading}
            message={`Loading page ${page} of ${pagination.totalPages} (${itemsPerPage} projects)...`}
          />
        ) : (
          <ProjectsGridSection project={filteredProjects} />
        )}

        {/* Pagination Component */}
        <Pagination
          currentPage={pagination.currentPage}
          totalPages={pagination.totalPages}
          onPageChange={handlePageChange}
          getVisiblePages={getVisiblePages}
          hasNextPage={pagination.hasNextPage}
          hasPrevPage={pagination.hasPrevPage}
        />
      </Section>
    </div>
  );
}

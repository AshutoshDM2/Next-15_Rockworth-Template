import CTASection from "@/components/Common/CTASection";
import { ProjectsGridCategory } from "./components/ProjectsGridCategory";
import { ProjectsHero } from "./components/ProjectsHero";
import { Project } from "@/types/projects";
// import ReportsSection from "./components/ReportsSection";

interface ProjectsPageProps {
  projects: Project[];
  categories: {
    id: number;
    name: string;
    slug: string;
  }[];
  initialPagination: {
    currentPage: number;
    totalPages: number;
    total: number;
    hasNextPage: boolean;
    hasPrevPage: boolean;
  };
}

export default function ProjectsPage({
  projects,
  categories,
  initialPagination,
}: ProjectsPageProps) {
  return (
    <>
      <ProjectsHero />
      <ProjectsGridCategory
        projects={projects}
        categories={categories}
        initialPagination={initialPagination}
      />
      {/* <ReportsSection /> */}
      <CTASection />
    </>
  );
}

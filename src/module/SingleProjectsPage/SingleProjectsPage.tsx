import CTASection from "@/components/Common/CTASection";
import { Project } from "@/types/projects";
import ReportsSection from "../ProjectsPage/components/RelatedProjects";
import { OverviewOfProjects } from "./components/OverviewOfProjects";
import { SingleProjectsHero } from "./components/SingleProjectHero";

interface IOverviewProps {
  projectsData: Project;
}

export default function SingleProjectsPage({ projectsData }: IOverviewProps) {
  const primaryCategorySlug = projectsData.categories[0]?.slug;
  return (
    <>
      <SingleProjectsHero
        title={projectsData.title}
        category={projectsData.categories[0]?.name}
        date={projectsData.date}
        description={projectsData.excerpt}
        image={projectsData.featuredImage}
      />
      <OverviewOfProjects projectsData={projectsData} />
      {/* <ChallengesSolution challengeData={projectsData.challenge} />
      <Results resultsData={projectsData.results} /> */}
      {primaryCategorySlug && (
        <ReportsSection
          categorySlug={primaryCategorySlug}
          currentProjectSlug={projectsData.slug}
        />
      )}
      <CTASection />
    </>
  );
}

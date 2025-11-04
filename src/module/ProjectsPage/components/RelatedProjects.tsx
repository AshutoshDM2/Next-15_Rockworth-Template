import Section from "@/common/Section/Section";
import RelatedProjectsCard from "@/components/Common/RelatedProjectsCard";
import { getRelatedProjects } from "@/lib/ProjectApi/ProjectApi";
import type React from "react";

interface RelatedProjectsProps {
  categorySlug: string;
  currentProjectSlug: string;
}

const RelatedProjects: React.FC<RelatedProjectsProps> = async ({
  categorySlug,
  currentProjectSlug,
}) => {
  const { projects } = await getRelatedProjects(
    categorySlug,
    currentProjectSlug,
    3
  );

  if (!projects || projects.length === 0) {
    return null;
  }

  return (
    <Section className="bg-gray-50">
      <div className="text-start max-w-3xl mb-6">
        <h2 className="text-2xl lg:text-3xl font-normal mb-4">
          View Latest Projects
        </h2>
        <p className="text-gray-700 text-base leading-relaxed font-light">
          Whether you’re looking to design a new workspace, need support for an
          existing project, or simply want to learn more about our solutions,
          the Rockworth team is ready to assist you. Reach out and let’s start
          building the future of work, together.
        </p>
      </div>
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-2">
        {projects.map((project) => (
          <RelatedProjectsCard key={project.id} project={project} />
        ))}
      </div>
    </Section>
  );
};



export default RelatedProjects;

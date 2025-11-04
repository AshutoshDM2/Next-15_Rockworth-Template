import type { ProcessedProject } from "@/types/project";
import Image from "next/image";
import type React from "react";
import OutlineButton from "./OutlineButton";

interface RelatedProjectCardProps {
  project: ProcessedProject;
}

const RelatedProjectsCard: React.FC<RelatedProjectCardProps> = ({
  project,
}) => {
  const buttonText = "View Project";

  return (
    <div className="relative w-full aspect-[4/3] overflow-hidden group rounded-2xl">
      <Image
        src={project.featuredImage || "/placeholder.svg"}
        alt={project.title}
        fill
        sizes="100vw"
        className="group-hover:scale-105 transition-transform duration-500 object-cover"
      />
      <div className="absolute inset-0 bg-black/50 group-hover:bg-black/50 transition duration-300" />

      <div className="absolute inset-0 flex flex-col justify-end p-6 text-white z-10">
        {/* Content wrapper that moves up on hover */}
        <div className="transition-transform duration-300 group-hover:-translate-y-4">
          {/* Title */}
          <h3 className="text-xl font-bold mb-2 group-hover:mb-1">
            {project.title}
          </h3>

          {/* Excerpt - hidden by default, shows on hover with no margin when hidden */}
          <p className="text-sm font-light max-w-md opacity-0 max-h-0 overflow-hidden group-hover:opacity-100 group-hover:max-h-20  transition-all duration-500 ease-out">
            {project.excerpt}
          </p>
        </div>

        <OutlineButton
          href={`/project/${project.slug}`}
          className="border-white text-white w-32 h-10"
          icon={true}
        >
          {buttonText}
        </OutlineButton>
      </div>
    </div>
  );
};

export default RelatedProjectsCard;

"use client";

import Rockworthparagraph from "@/common/RockworthParagraph/RockworthParagraph";
import Section from "@/common/Section/Section";
import Breadcrumb from "@/components/Common/Breadcrumb";
import OutlineButton from "@/components/Common/OutlineButton";
import Image from "next/image";

export function ProjectsHero() {
  const scrollToJobs = () => {
    const jobsSection = document.getElementById("project");
    if (jobsSection) {
      const offsetTop = jobsSection.offsetTop - 130;
      window.scrollTo({
        top: offsetTop,
        behavior: "smooth",
      });
    }
  };
  return (
    <div className="relative overflow-hidden bg-white">
      <Section>
        <div className="grid lg:grid-cols-2 gap-12 items-center">
          {/* Left Content */}
          <div className="space-y-4">
            <div className="overflow-hidden">
              <h1 className="text-[2.25rem] lg:text-[3rem] font-medium text-black tracking-wide leading-[2.8rem] lg:leading-[3.7rem] max-w-xs lg:max-w-md">
                Bringing Your Vision To Life
              </h1>
            </div>

            <Rockworthparagraph
              paragraph="Rockworth has carved a niche in crafting inspirational workspaces
              through a series of thoughtfully executed projects that blend
              design, functionality, and employee well-being."
              className="max-w-lg lg:my-6"
            />

            <OutlineButton
              href=""
              className="px-4 hidden lg:flex"
              onClick={() => scrollToJobs()}
            >
              {" "}
              Read Case Studies
            </OutlineButton>

            <div className="lg:pt-2">
              {" "}
              <Breadcrumb
                items={[
                  { label: "Home", href: "/" },
                  { label: "Projects", href: "/projects" },
                ]}
              />
            </div>
          </div>
          <div className="relative hidden lg:block">
            <Image
              src="/images/projects/Project-Page-Banner.webp"
              alt="Rockworth office environment with professionals"
              width={600}
              height={400}
              className="rounded-lg shadow-lg w-full h-auto"
            />
          </div>
        </div>
      </Section>
    </div>
  );
}

"use client";

import Section from "@/common/Section/Section";
import { Challenge } from "@/types/projects";
import Image from "next/image";

interface ChallengesSolutionProps {
  challengeData: Challenge;
}

export function ChallengesSolution({ challengeData }: ChallengesSolutionProps) {
  return (
    <div className="relative overflow-hidden bg-white flex flex-col">
      <Section>
        <div className="space-y-2">
          <div className="overflow-hidden">
            <h2 className="text-2xl lg:text-3xl font-normal text-black tracking-wide">
              {challengeData.title}
            </h2>
          </div>
          {/* Description */}
          <p className="mt-2 text-base leading-relaxed font-light text-gray-700 ">
            {challengeData.description}
          </p>
        </div>
        <div className="mt-8 flex flex-wrap items-start justify-between gap-6">
          <div className="space-y-4 order-2 lg:order-1">
            {challengeData.points.map((point, index) => (
              <div key={index} className="flex items-start space-x-3">
                <div className="flex-shrink-0 w-8 h-8 rounded-full bg-black text-white flex items-center justify-center font-semibold text-sm">
                  {index + 1}
                </div>
                <p className="text-base leading-relaxed font-light text-gray-700 max-w-lg">
                  {point}
                </p>
              </div>
            ))}
          </div>
          <div className="order-1 lg:order-2">
            <Image
              src="/images/careers/careers_banner_image.webp"
              alt="Rockworth office environment with professionals"
              width={600}
              height={400}
              className="rounded-lg shadow-lg w-full h-[200px] lg:h-[330px]"
            />
          </div>
        </div>
      </Section>
    </div>
  );
}

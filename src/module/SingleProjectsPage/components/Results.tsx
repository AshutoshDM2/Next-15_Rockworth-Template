/* eslint-disable @next/next/no-img-element */
/* eslint-disable @typescript-eslint/no-explicit-any */

"use client";

import Section from "@/common/Section/Section";

interface ResultsProps {
  resultsData: {
    title: string;
    description: string;
    videos: {
      id: number;
      videoUrl: string;
      thumbnail: string;
    }[];
  };
}

export function Results({ resultsData }: ResultsProps) {
  return (
    <div className="relative overflow-hidden bg-white flex flex-col font-sans">
      <Section>
        <div className="space-y-2">
          <div className="overflow-hidden">
            <h2 className="text-2xl lg:text-3xl font-normal text-black tracking-wide">
              {resultsData.title}
            </h2>
          </div>
          {/* Description */}
          <p className="mt-2 text-base leading-relaxed font-light text-gray-700 ">
            {resultsData.description}
          </p>
        </div>

        {/* Video Grid */}
        <div className="mt-8 grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
          {resultsData.videos.map((video) => (
            <div
              key={video.id}
              className="relative w-full aspect-video bg-gray-200 rounded-lg overflow-hidden shadow-lg cursor-pointer transform transition-transform duration-300 hover:scale-105"
            >
              <img
                src={video.thumbnail}
                alt={"Video thumbnail"}
                className="absolute inset-0 w-full h-full object-cover"
                onError={(e: any) => {
                  e.target.onerror = null;
                  e.target.src = video.thumbnail;
                }}
              />
            </div>
          ))}
        </div>
      </Section>
    </div>
  );
}

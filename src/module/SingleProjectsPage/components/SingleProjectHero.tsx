/* eslint-disable @next/next/no-img-element */
"use client";

import Section from "@/common/Section/Section";
import Breadcrumb from "@/components/Common/Breadcrumb";
import { AiFillFolder } from "react-icons/ai";

interface SingleProjectProps {
  title: string;
  category: string;
  date?: string;
  description: string;
  image: string;
}

// Function to highlight Location and Locations words
// const highlightLocationWords = (text: string) => {
//   const regex = /\b(Location|Locations)\b/gi;
//   const parts = text.split(regex);

//   return parts.map((part, index) => {
//     if (regex.test(part)) {
//       return (
//         <span key={index} className="font-medium">
//           {part}
//         </span>
//       );
//     }
//     return part;
//   });
// };

export function SingleProjectsHero({
  title,
  category,
  description,
  image,
}: SingleProjectProps) {
  
  return (
    <div className="bg-white overflow-hidden">
      <Section>
        {/* Title and Breadcrumb */}
        <div className="mb-5">
          <h1 className="text-4xl md:text-5xl font-medium text-black mb-2">
            {title}
          </h1>
          <Breadcrumb
            items={[
              { label: "Home", href: "/" },
              { label: "Projects", href: "/projects" },
              { label: title, href: "#" },
            ]}
          />
        </div>

        {/* Description */}
        {/* <p className="text-gray-700 text-base md:text-lg leading-relaxed max-w-3xl mb-3">
          {description}
        </p> */}

        <div className="my-4 text-sm text-gray-500 text-left">
          <span className="mr-4">
            <AiFillFolder className="inline-block mr-1 text-lg" /> {category}
          </span>
        </div>

        {/* <p className="text-gray-700 text-base font-light leading-relaxed max-w-3xl mb-3">
          {highlightLocationWords(description)}
        </p> */}

        {/* Image */}
        <div className="w-full flex justify-center items-center">
          <div className="overflow-hidden rounded-xl shadow-lg w-full ">
            <img
              src={image}
              alt={title}
              className="w-full h-[400px] object-cover transition-transform duration-300 ease-in-out hover:scale-105"
              loading="eager"
            />
          </div>
        </div>
      </Section>
    </div>
  );
}

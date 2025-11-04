/* eslint-disable @typescript-eslint/no-explicit-any */
import HtmlContentRenderer from "@/components/HtmlContentRenderer/HtmlContentRenderer";
import { Play } from "lucide-react";
import Image from "next/image";
import Link from "next/link";

export function ProjectsGridSection({ project }: any) {
  return (
    <div className="bg-white relative overflow-hidden mt-6 py-2">
      <div className="absolute inset-0 bg-gradient-to-r from-gray-50/50 via-white to-gray-50/50" />
      <div className="relative z-10">
        <div className="space-y-6">
          {/* Flexbox Layout */}
          <div className="flex flex-wrap -mx-2">
            {project.map((work: any) => {
              const imageUrl =
                work.featuredImage || "/placeholder.svg?height=300&width=400";
              const title =
                typeof work.title === "string"
                  ? work.title
                  : work.title?.rendered || "Untitled";

              return (
                <div
                  key={work.id}
                  className="w-full sm:w-1/2 lg:w-1/3 px-2 mb-6"
                >
                  <Link href={`/project/${work.slug}`}>
                    <div className="cursor-pointer group transform transition-transform duration-300 hover:-translate-y-2">
                      <div className="relative aspect-[4/3] rounded-xl sm:rounded-2xl overflow-hidden shadow-md group-hover:shadow-xl transition-all duration-500">
                        <Image
                          src={imageUrl || "/placeholder.svg"}
                          alt={title}
                          fill
                          className="object-cover transition-transform duration-500"
                          sizes="(max-width: 640px) 100vw, (max-width: 1024px) 50vw, 33vw"
                        />
                        <div className="absolute inset-0 bg-gradient-to-t from-black/60 via-black/20 to-transparent" />
                        <div className="absolute inset-0 flex flex-row items-end justify-between p-3 sm:p-4">
                          <HtmlContentRenderer
                            content={title}
                            colors={{ h2: "text-white" }}
                            textStyling={{
                              size: "text-lg",
                              weight: "font-normal",
                            }}
                          />
                          <div className="w-7 h-7 sm:w-8 sm:h-8 bg-white/20 backdrop-blur-sm rounded-full flex items-center justify-center shadow-lg cursor-pointer hover:bg-brand-color transition-all duration-300">
                            <Play className="w-3 h-3 sm:w-3.5 sm:h-3.5 ml-0.5 text-white fill-white" />
                          </div>
                        </div>
                        <div
                          className="absolute bottom-12 sm:bottom-16 left-3 sm:left-4 right-3 sm:right-4 text-white/90 text-xs sm:text-sm opacity-0 group-hover:opacity-100 transition-opacity duration-300"
                          dangerouslySetInnerHTML={{
                            __html:
                              typeof work.content === "string"
                                ? work.content
                                    .replace(/\bLocations?:?\s*/gi, "")
                                    .replace(/<[^>]*>/g, "") // Remove HTML tags
                                    .replace(/[^\w\s.,!?-]/g, "") // Remove special characters except basic punctuation
                                    .replace(/\s+/g, " ") // Replace multiple spaces with single space
                                    .trim()
                                    .slice(0, 200)
                                : "",
                          }}
                        ></div>
                      </div>
                    </div>
                  </Link>
                </div>
              );
            })}
          </div>
        </div>
      </div>
    </div>
  );
}

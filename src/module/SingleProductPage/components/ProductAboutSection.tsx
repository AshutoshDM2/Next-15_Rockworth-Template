/* eslint-disable @next/next/no-img-element */
/* eslint-disable react-hooks/exhaustive-deps */
/* eslint-disable @typescript-eslint/no-unused-vars */
/* eslint-disable @typescript-eslint/ban-ts-comment */
/* eslint-disable @typescript-eslint/no-explicit-any */
"use client";

import Section from "@/common/Section/Section";
import FallbackImage from "@/components/Common/FallBackLogo";
import HtmlContentRenderer from "@/components/HtmlContentRenderer/HtmlContentRenderer";
import { Button } from "@/components/ui/Button/Button";
import { Card, CardContent } from "@/components/ui/Card/Card";
import type { AboutData } from "@/types/Products";
import { Award, ChevronDown, Download, FileText } from "lucide-react";
import Image from "next/image";
import { useState, useRef, useEffect } from "react";

interface ProductAboutSectionProps {
  imageUrl: string;
  aboutData: AboutData[];
}

export default function ProductAboutSection({
  imageUrl,
  aboutData,
}: ProductAboutSectionProps) {
  const [activeTab, setActiveTab] = useState("specifications");
  const [downloadingItems, setDownloadingItems] = useState<Set<string>>(
    new Set()
  );
  const [openAccordion, setOpenAccordion] = useState<string | null>(
    "specifications"
  );
  const [underlineWidths, setUnderlineWidths] = useState<
    Record<string, number>
  >({});
  const tabRefs = useRef<Record<string, HTMLSpanElement | null>>({});

  // Use the provided data or fallback to sample data
  const aboutSectionData = aboutData?.[0];

  const tabs = [
    { id: "specifications", label: "Specifications" },
    { id: "downloads", label: "Downloads" },
  ];

  // Helper function to check if download item is valid
  const isValidDownloadItem = (item: any) => {
    return item && item.link && item.link.trim() !== "";
  };

  // Filter valid download items
  const validProductInformation =
    aboutSectionData?.downloads?.product_information?.filter(
      isValidDownloadItem
    ) || [];
  const validCertificates =
    aboutSectionData?.downloads?.certificates?.filter(isValidDownloadItem) ||
    [];

  // Measure text widths on mount and when tabs change
  useEffect(() => {
    const newWidths: Record<string, number> = {};
    tabs.forEach((tab) => {
      const ref = tabRefs.current[tab.id];
      if (ref) {
        newWidths[tab.id] = ref.offsetWidth;
      }
    });
    setUnderlineWidths(newWidths);
  }, []);

  const handleDownload = (link: string, title: string) => {
    const fullUrl = `${imageUrl}${link}`;
    const fileExtension = link.split(".").pop() || "pdf";
    const fileName = `${title
      .replace(/[^a-z0-9]/gi, "_")
      .toLowerCase()}.${fileExtension}`;

    const a = document.createElement("a");
    a.href = fullUrl;
    a.download = fileName;
    a.style.display = "none";
    document.body.appendChild(a);
    a.click();
    document.body.removeChild(a);
  };

  const renderDownloadCard = (
    item: any,
    index: number,
    type: "product" | "certificate"
  ) => {
    const downloadKey = `${item.link}-${item.title}`;
    const isDownloading = downloadingItems.has(downloadKey);
    const hasThumbnail = item.thumbnail && item.thumbnail.trim() !== "";

    return (
      <Card
        key={`${type}-${index}`}
        className="hover:shadow-lg transition-all duration-200 cursor-pointer group border border-gray-200 rounded-lg"
      >
        <CardContent className="p-4">
          <div className="aspect-square mb-4 bg-gray-100 rounded-lg overflow-hidden relative">
            {hasThumbnail ? (
              <Image
                // src={`${item.thumbnail}`}
                src={`${imageUrl}${item.thumbnail}`}
                alt={item.title}
                width={200}
                height={200}
                className="w-full h-full object-contain group-hover:scale-105 transition-transform duration-200"
                onError={(e) => {
                  // Hide the image and show fallback if image fails to load
                  e.currentTarget.style.display = "none";
                  const fallback = e.currentTarget
                    .nextElementSibling as HTMLElement;
                  if (fallback) {
                    fallback.style.display = "flex";
                  }
                }}
              />
            ) : null}
            <FallbackImage />
            <div className="absolute inset-0 bg-black bg-opacity-0 group-hover:bg-opacity-80 transition-all duration-200 flex items-center justify-center">
              {type === "certificate" ? (
                <Award className="w-12 h-12 text-white opacity-0 group-hover:opacity-100 transition-opacity duration-200" />
              ) : (
                <img
                  src={"/pdf/icon/pdf.webp"}
                  alt="pdf icon"
                  className="w-16 h-16 text-red-400 opacity-0 group-hover:opacity-100 transition-opacity duration-200"
                />
              )}
            </div>
          </div>
          <h4 className="font-medium text-sm text-gray-900 mb-3 leading-tight min-h-[2.5rem] flex items-center">
            {item.title}
          </h4>
          <Button
            variant="outline"
            size="sm"
            className="w-full bg-transparent hover:bg-gray-50 transition-colors duration-200 border-brand-color text-brand-color hover:text-brand-color "
            onClick={() => handleDownload(item.link, item.title)}
            disabled={isDownloading}
          >
            <Download
              className={`w-4 h-4 mr-2 ${
                isDownloading ? "animate-bounce" : ""
              }`}
            />
            {isDownloading ? "Downloading..." : "Download"}
          </Button>
        </CardContent>
      </Card>
    );
  };

  const renderSpecifications = () => {
    const hasValidSpecs = aboutSectionData.specifications?.some(
      (spec) => spec.key && spec.value
    );

    return (
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8 lg:gap-12 mt-3 lg:mt-0">
        {hasValidSpecs ? (
          aboutSectionData.specifications.map((spec, index) => {
            // Access the key and value properties directly
            const title = spec.key;
            const content = spec.value;

            if (!title || !content) return null; // skip empty items

            return (
              <div key={index} className="space-y-4">
                <h3 className="font-bold text-gray-900 text-sm uppercase tracking-wide">
                  {title}
                </h3>
                <HtmlContentRenderer
                  content={content}
                  enableLocationMarkers={false}
                  colors={{
                    li: "text-gray-800", // Customizable text color
                    ul: "text-gray-800",
                  }}
                  textStyling={{
                    size: "text-sm", // Customizable text size
                    weight: "font-light",
                    lineHeight: "leading-relaxed",
                    letterSpacing: "tracking-wide",
                  }}
                />
              </div>
            );
          })
        ) : (
          <div className="col-span-full text-center py-16">
            <p className="text-gray-600">Specifications will be coming soon.</p>
          </div>
        )}
      </div>
    );
  };

  const renderDownloads = () => (
    <div className="space-y-12">
      {/* Product Information Section */}
      {validProductInformation.length > 0 && (
        <div>
          <h3 className="text-xl font-bold text-gray-900 mb-6 flex items-center">
            <FileText className="w-5 h-5 mr-2" />
            Product Information
          </h3>
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6 overflow-x-auto">
            <div className="flex gap-6 lg:contents">
              {validProductInformation.map((item, index) =>
                renderDownloadCard(item, index, "product")
              )}
            </div>
          </div>
        </div>
      )}

      {/* Sustainability & Certifications Section */}
      {validCertificates.length > 0 && (
        <div>
          <h3 className="text-xl font-bold text-gray-900 mb-6 flex items-center">
            <Award className="w-5 h-5 mr-2" />
            Sustainability & Certifications
          </h3>
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6 overflow-x-auto">
            <div className="flex gap-6 lg:contents">
              {validCertificates.map((item, index) =>
                renderDownloadCard(item, index, "certificate")
              )}
            </div>
          </div>
        </div>
      )}

      {/* No downloads available */}
      {validProductInformation.length === 0 &&
        validCertificates.length === 0 && (
          <div className="text-center py-16">
            <Download className="w-12 h-12 text-gray-400 mx-auto mb-4" />
            <p className="text-gray-600">
              No downloads available at this time.
            </p>
          </div>
        )}
    </div>
  );

  return (
    <Section>
      {/* Header Section */}
      <div className="mb-8">
        <h2 className="text-2xl lg:text-3xl font-medium mb-4">
          {aboutSectionData.title.charAt(0).toUpperCase() +
            aboutSectionData.title.slice(1).toLowerCase()}
        </h2>
        <HtmlContentRenderer
          content={aboutSectionData.description}
          enableLocationMarkers={false}
          colors={{
            p: "text-gray-700",
          }}
          textStyling={{
            size: "text-base", // Customizable text size
            weight: "font-light",
            lineHeight: "leading-relaxed",
            letterSpacing: "tracking-normal",
          }}
        />
      </div>

      {/* Desktop Tab Navigation */}
      <div className="hidden md:block">
        <div className="bg-[#595959] text-white rounded-t-lg">
          <div className="flex">
            {tabs.map((tab) => (
              <button
                key={tab.id}
                onClick={() => setActiveTab(tab.id)}
                className={`relative px-6 py-4 font-normal text-base tracking-wide transition-all duration-200 ${
                  activeTab === tab.id
                    ? "text-white bg-none"
                    : "text-white hover:text-white hover:bg-white hover:bg-opacity-10"
                }`}
              >
                <span
                  //@ts-ignore
                  ref={(el) => (tabRefs.current[tab.id] = el)}
                  className="relative z-10"
                >
                  {tab.label}
                </span>
                {activeTab === tab.id && (
                  <div
                    className="absolute bottom-2 left-1/2 transform -translate-x-1/2 h-0.5 bg-white rounded-full transition-all duration-200"
                    style={{
                      width: `${underlineWidths[tab.id] || 0}px`,
                    }}
                  />
                )}
              </button>
            ))}
          </div>
        </div>

        {/* Desktop Tab Content */}
        <div className="bg-gray-50 min-h-auto p-8 rounded-b-lg">
          {activeTab === "specifications" && renderSpecifications()}
          {activeTab === "downloads" && renderDownloads()}
        </div>
      </div>

      {/* Mobile Accordion */}
      <div className="md:hidden space-y-4">
        {tabs.map((tab) => (
          <div key={tab.id} className="border border-gray-200 rounded-lg">
            <button
              onClick={() =>
                setOpenAccordion(openAccordion === tab.id ? null : tab.id)
              }
              className="w-full flex items-center justify-between p-4 text-left font-medium text-gray-900 hover:bg-gray-50"
            >
              <span>{tab.label}</span>
              <ChevronDown
                className={`w-5 h-5 transition-transform duration-200 ${
                  openAccordion === tab.id ? "rotate-180" : ""
                }`}
              />
            </button>
            {openAccordion === tab.id && (
              <div className="p-4 pt-0 border-t border-gray-200">
                {tab.id === "specifications" && renderSpecifications()}
                {tab.id === "downloads" && renderDownloads()}
              </div>
            )}
          </div>
        ))}
      </div>
    </Section>
  );
}

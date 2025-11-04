/* eslint-disable react-hooks/exhaustive-deps */
"use client";

import { useEffect, useState } from "react";
import DOMPurify from "isomorphic-dompurify";

interface TagColors {
  h1?: string;
  h2?: string;
  h3?: string;
  h4?: string;
  h5?: string;
  h6?: string;
  p?: string;
  span?: string;
  li?: string;
  ul?: string;
  ol?: string;
  ctaButton?: {
    background?: string;
    hover?: string;
    text?: string;
    border?: string;
  };
}

interface TextStyling {
  size?: string;
  weight?: string;
  lineHeight?: string;
  letterSpacing?: string;
}

interface HtmlContentProps {
  content: string;
  className?: string;
  colors?: TagColors;
  textStyling?: TextStyling;
  enableLocationMarkers?: boolean; // New prop to control location markers
  defaultTagForPlainText?: string; // New prop to specify default tag for plain text
}

const defaultColors: TagColors = {
  h1: "text-gray-900",
  h2: "text-gray-900",
  h3: "text-gray-900",
  h4: "text-gray-900",
  h5: "text-gray-900",
  h6: "text-gray-900",
  p: "text-gray-700",
  span: "text-inherit",
  li: "text-gray-700",
  ul: "text-gray-700",
  ol: "text-gray-700",
  ctaButton: {
    background: "bg-gray-50",
    hover: "hover:bg-primary/90",
    text: "text-primary-gold",
    border: "border-gray-300",
  },
};

const defaultTextStyling: TextStyling = {
  size: "text-base",
  weight: "font-light",
  lineHeight: "leading-relaxed",
  letterSpacing: "tracking-normal",
};

export default function HtmlContentRenderer({
  content,
  className = "",
  colors = {},
  textStyling = {},
  enableLocationMarkers = false, // Default to false
  defaultTagForPlainText = "h2", // Default to h2 if not provided
}: HtmlContentProps) {
  const [processedContent, setProcessedContent] = useState("");

  // Merge user colors with defaults
  const mergedColors = {
    ...defaultColors,
    ...colors,
    ctaButton: {
      ...defaultColors.ctaButton,
      ...colors.ctaButton,
    },
  };

  // Merge text styling with defaults
  const mergedTextStyling = {
    ...defaultTextStyling,
    ...textStyling,
  };

  useEffect(() => {
    if (content) {
      let initialContent = content;

      // Check if content has no HTML tags and wrap it in the specified default tag if so
      const hasHtmlTags = /<[a-z][\s\S]*>/i.test(content);
      if (!hasHtmlTags) {
        const tag = defaultTagForPlainText;
        initialContent = `<${tag}>${content}</${tag}>`;
      }

      // Process special content patterns before sanitization
      let processedHtml = initialContent;

      // Only process location markers if enabled
      if (enableLocationMarkers) {
        // More specific regex for actual locations (city, state format)
        processedHtml = processedHtml.replace(
          /([A-Z][a-z]+,\s*[A-Z]{2})/g,
          '<span class="location-marker"><span class="location-icon">📍</span>$1</span>'
        );
      }

      // Process call-to-action elements (text inside square brackets)
      processedHtml = processedHtml.replace(
        /\[(.*?)\]/g,
        '<div class="cta-container"><a href="#" class="cta-button">$1</a></div>'
      );

      // Configure DOMPurify to allow specific tags and attributes
      const purifyConfig = {
        ALLOWED_TAGS: [
          "h1",
          "h2",
          "h3",
          "h4",
          "h5",
          "h6",
          "p",
          "span",
          "a",
          "strong",
          "em",
          "ul",
          "ol",
          "li",
          "br",
          "div",
        ],
        ALLOWED_ATTR: [
          "href",
          "target",
          "rel",
          "class",
          "id",
          "data-start",
          "data-end",
        ],
      };

      // Sanitize the HTML content
      const clean = DOMPurify.sanitize(processedHtml, purifyConfig);

      // Process the content to add styling classes
      const parser = new DOMParser();
      const doc = parser.parseFromString(clean, "text/html");

      // Apply styling to headings with custom colors and text styling
      doc.querySelectorAll("h1").forEach((el) =>
        el.classList.add(
          "mt-8",
          "mb-2",
          ...mergedColors.h1!.split(" "),
          ...mergedTextStyling.size!.split(" "), // Apply size from prop
          ...mergedTextStyling.weight!.split(" "), // Apply weight from prop
          ...mergedTextStyling.lineHeight!.split(" ")
        )
      );
      doc.querySelectorAll("h2").forEach((el) =>
        el.classList.add(
          "mt-6",
          "mb-2",
          ...mergedColors.h2!.split(" "),
          ...mergedTextStyling.size!.split(" "), // Apply size from prop
          ...mergedTextStyling.weight!.split(" "), // Apply weight from prop
          ...mergedTextStyling.lineHeight!.split(" ")
        )
      );
      doc.querySelectorAll("h3").forEach((el) =>
        el.classList.add(
          "mt-5",
          "mb-2",
          ...mergedColors.h3!.split(" "),
          ...mergedTextStyling.size!.split(" "), // Apply size from prop
          ...mergedTextStyling.weight!.split(" "), // Apply weight from prop
          ...mergedTextStyling.lineHeight!.split(" ")
        )
      );
      doc.querySelectorAll("h4").forEach((el) =>
        el.classList.add(
          "mt-4",
          "mb-2",
          ...mergedColors.h4!.split(" "),
          ...mergedTextStyling.size!.split(" "), // Apply size from prop
          ...mergedTextStyling.weight!.split(" "), // Apply weight from prop
          ...mergedTextStyling.lineHeight!.split(" ")
        )
      );
      doc.querySelectorAll("h5").forEach((el) =>
        el.classList.add(
          "mt-2",
          "mb-1",
          ...mergedColors.h5!.split(" "),
          ...mergedTextStyling.size!.split(" "), // Apply size from prop
          ...mergedTextStyling.weight!.split(" "), // Apply weight from prop
          ...mergedTextStyling.lineHeight!.split(" ")
        )
      );
      doc.querySelectorAll("h6").forEach((el) =>
        el.classList.add(
          "mt-2",
          "mb-1",
          ...mergedColors.h6!.split(" "),
          ...mergedTextStyling.size!.split(" "), // Apply size from prop
          ...mergedTextStyling.weight!.split(" "), // Apply weight from prop
          ...mergedTextStyling.lineHeight!.split(" ")
        )
      );
      doc
        .querySelectorAll("p")
        .forEach((el) =>
          el.classList.add(
            "my-2",
            ...mergedTextStyling.size!.split(" "),
            ...mergedTextStyling.weight!.split(" "),
            ...mergedTextStyling.lineHeight!.split(" "),
            ...mergedTextStyling.letterSpacing!.split(" "),
            ...mergedColors.p!.split(" ")
          )
        );
      doc
        .querySelectorAll("span")
        .forEach((el) =>
          el.classList.add("inline", ...mergedColors.span!.split(" "))
        );

      // Style lists with custom colors and text styling
      doc
        .querySelectorAll("ul")
        .forEach((el) =>
          el.classList.add("-ml-6", "list-none", ...mergedColors.ul!.split(" "))
        );
      doc
        .querySelectorAll("ol")
        .forEach((el) =>
          el.classList.add(
            "space-y-2",
            "ml-0",
            "list-decimal",
            "list-inside",
            ...mergedColors.ol!.split(" ")
          )
        );
      doc
        .querySelectorAll("li")
        .forEach((el) =>
          el.classList.add(
            "flex",
            "items-start",
            "gap-3",
            "p-0",
            "-mt-4",
            ...mergedTextStyling.size!.split(" "),
            ...mergedTextStyling.weight!.split(" "),
            ...mergedTextStyling.lineHeight!.split(" "),
            ...mergedTextStyling.letterSpacing!.split(" "),
            ...mergedColors.li!.split(" ")
          )
        );

      // Add bullet points to list items
      doc.querySelectorAll("ul > li").forEach((el) => {
        const bullet = doc.createElement("span");
        bullet.className =
          "w-2 h-2 bg-gray-400 rounded-full mt-4 flex-shrink-0";
        el.insertBefore(bullet, el.firstChild);
      });

      // Style location markers with custom colors (only if enabled)
      if (enableLocationMarkers) {
        doc.querySelectorAll(".location-marker").forEach((el) => {
          el.classList.add(
            "inline-flex",
            "items-center",
            "px-3",
            "py-2",
            "rounded-full",
            "text-sm",
            "font-medium",
            "bg-slate-100",
            "text-slate-800"
          );
        });
      }

      // Style CTA buttons with custom colors
      doc.querySelectorAll(".cta-container").forEach((el) => {
        el.classList.add("my-4");
      });
      doc.querySelectorAll(".cta-button").forEach((el) => {
        el.classList.add(
          "inline-block",
          "font-medium",
          "py-2",
          "px-4",
          "rounded-md",
          "transition-colors",
          "shadow-sm",
          "border",
          ...mergedColors.ctaButton!.background!.split(" "),
          ...mergedColors.ctaButton!.hover!.split(" "),
          ...mergedColors.ctaButton!.text!.split(" "),
          ...mergedColors.ctaButton!.border!.split(" ")
        );
      });

      // Convert back to HTML string
      setProcessedContent(doc.body.innerHTML);
    }
  }, [
    content,
    enableLocationMarkers,
    colors,
    textStyling,
    defaultTagForPlainText,
  ]);

  return (
    <div
      className={`html-content prose max-w-none ${className}`}
      dangerouslySetInnerHTML={{ __html: processedContent }}
    />
  );
}

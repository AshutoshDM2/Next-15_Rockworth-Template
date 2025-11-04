/* eslint-disable @typescript-eslint/no-unused-vars */
"use client";
import { useEffect, useState } from "react";
import { usePathname } from "next/navigation";
import Link from "next/link";
import { leftNavItems, rightNavItems } from "@/data/Topbar";

export function TopBanner() {
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);
  const [isScrolled, setIsScrolled] = useState(false);
  const pathname = usePathname();
  const [activeItem, setActiveItem] = useState<string | null>(null);

  // Handle scroll effect
  useEffect(() => {
    const handleScroll = () => {
      setIsScrolled(window.scrollY > 0);
    };
    window.addEventListener("scroll", handleScroll);
    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  // Prevent body scroll when mobile menu is open
  useEffect(() => {
    if (isMobileMenuOpen) {
      document.body.style.overflow = "hidden";
    } else {
      document.body.style.overflow = "unset";
    }
    return () => {
      document.body.style.overflow = "unset";
    };
  }, [isMobileMenuOpen]);

  // Set the active item based on the current path
  useEffect(() => {
    setActiveItem(pathname);
  }, [pathname]);

  return (
    <>
      <div
        className={`bg-[#1E1E1E] text-white text-sm font-medium sticky top-0 z-20 transition-all duration-300 ${
          isScrolled ? "shadow-lg bg-[#1E1E1E]/95" : ""
        }`}
      >
        <div className="w-full max-w-screen-xl 2xl:max-w-screen-xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex items-center justify-between h-11 lg:h-12">
            {/* Desktop Left Navigation */}
            <nav className="hidden lg:flex items-center space-x-8 xl:space-x-10">
              {leftNavItems.map((item) => (
                <a
                  key={item.label}
                  href={item.href}
                  className={`group relative uppercase transition-all duration-300 text-[10px] tracking-wider font-medium ${
                    activeItem === item.href
                      ? "text-white"
                      : "text-gray-300 hover:text-gray-200"
                  }`}
                >
                  {item.label}
                  <span
                    className={`absolute -bottom-1 left-0 h-0.5 bg-white transition-all duration-300 ${
                      activeItem === item.href
                        ? "w-full"
                        : "w-0 group-hover:w-full"
                    }`}
                  />
                </a>
              ))}
            </nav>

            {/* Mobile Left Navigation - Knowledge */}
            <div className="lg:hidden">
              <Link
                href="/knowledge"
                className={`uppercase transition-all duration-300 text-[10px] tracking-wider font-medium ${
                  activeItem === "/knowledge"
                    ? "text-white"
                    : "text-gray-300 hover:text-gray-200"
                }`}
              >
                Knowledge
              </Link>
            </div>

            {/* Desktop Right Navigation */}
            <nav className="hidden lg:flex items-center space-x-8 xl:space-x-10">
              {rightNavItems.map((item) => (
                <a
                  key={item.label}
                  href={item.href}
                  className={`group relative uppercase transition-all duration-300 text-[10px] tracking-wider font-medium flex items-center gap-1 ${
                    activeItem === item.href
                      ? "text-white"
                      : "text-gray-300 hover:text-gray-200"
                  }`}
                >
                  {item.label}
                  <span
                    className={`absolute -bottom-1 left-0 h-0.5 bg-white transition-all duration-300 ${
                      activeItem === item.href
                        ? "w-full"
                        : "w-0 group-hover:w-full"
                    }`}
                  />
                </a>
              ))}
            </nav>

            {/* Mobile Right Navigation - Resources */}
            <div className="lg:hidden">
              <Link
                href="/resources"
                className={`uppercase transition-all duration-300 text-[10px] tracking-wider font-medium ${
                  activeItem === "/resources"
                    ? "text-white"
                    : "text-gray-300 hover:text-gray-200"
                }`}
              >
                Resources
              </Link>
            </div>
          </div>
        </div>
      </div>
    </>
  );
}

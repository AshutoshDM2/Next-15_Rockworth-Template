/* eslint-disable react-hooks/exhaustive-deps */
/* eslint-disable @typescript-eslint/no-unused-vars */
"use client";

import { Menu, Search, User, X } from 'lucide-react';
import Link from "next/link";
import { usePathname } from "next/navigation";
import { useEffect, useState, useCallback, useRef } from "react";
import { Logo } from "../Logo/Logo";
import { cn } from "@/lib/utils";
import { SearchModal } from "@/components/SearchModal/SearchModal";
import { LoginModal } from "@/components/LoginModal/LoginModal";
import { leftNavItems, navItems, rightNavItems } from "@/data/Topbar";
import { Separator } from "@/components/ui/Separator/Separator";

export function Topbar() {
  const [hoveredItem, setHoveredItem] = useState<string | null>(null);
  const [isSidebarOpen, setIsSidebarOpen] = useState(false);
  const [isScrolled, setIsScrolled] = useState(false);
  const [isAnimating, setIsAnimating] = useState(false);
  const [isLoginModalOpen, setIsLoginModalOpen] = useState(false);
  const [isSearchModalOpen, setIsSearchModalOpen] = useState(false);
  const [activeItem, setActiveItem] = useState<string | null>(null);
  const pathname = usePathname();
  
  // Refs for debouncing and RAF
  const scrollTimeoutRef = useRef<NodeJS.Timeout | null>(null);
  const rafRef = useRef<number | null>(null);
  const lastScrollY = useRef(0);
  const isScrollingRef = useRef(false);

  // Function to check if a nav item is active
  const isActive = (href: string) => {
    if (href === "/") {
      return pathname === "/";
    }
    return pathname.startsWith(href);
  };

  // Optimized scroll handler with debouncing and hysteresis
  const handleScroll = useCallback(() => {
    if (rafRef.current) {
      cancelAnimationFrame(rafRef.current);
    }

    rafRef.current = requestAnimationFrame(() => {
      const scrollTop = window.scrollY;
      const scrollDelta = Math.abs(scrollTop - lastScrollY.current);
      
      // Only update if scroll delta is significant (reduces micro-movements)
      if (scrollDelta < 5) return;
      
      // Hysteresis: different thresholds for scrolling up vs down
      const scrollDownThreshold = 60;
      const scrollUpThreshold = 30;
      
      let shouldBeScrolled = isScrolled;
      
      if (scrollTop > scrollDownThreshold && !isScrolled) {
        shouldBeScrolled = true;
      } else if (scrollTop < scrollUpThreshold && isScrolled) {
        shouldBeScrolled = false;
      }
      
      // Only update state if it actually changed
      if (shouldBeScrolled !== isScrolled) {
        setIsScrolled(shouldBeScrolled);
      }
      
      lastScrollY.current = scrollTop;
      isScrollingRef.current = true;
      
      // Clear scrolling flag after scroll ends
      if (scrollTimeoutRef.current) {
        clearTimeout(scrollTimeoutRef.current);
      }
      
      scrollTimeoutRef.current = setTimeout(() => {
        isScrollingRef.current = false;
      }, 150);
    });
  }, [isScrolled]);

  // Throttled scroll event listener
  useEffect(() => {
    let ticking = false;
    
    const throttledHandleScroll = () => {
      if (!ticking) {
        requestAnimationFrame(() => {
          handleScroll();
          ticking = false;
        });
        ticking = true;
      }
    };

    window.addEventListener("scroll", throttledHandleScroll, { passive: true });
    
    return () => {
      window.removeEventListener("scroll", throttledHandleScroll);
      if (scrollTimeoutRef.current) {
        clearTimeout(scrollTimeoutRef.current);
      }
      if (rafRef.current) {
        cancelAnimationFrame(rafRef.current);
      }
    };
  }, [handleScroll]);

  // Close sidebar when route changes
  useEffect(() => {
    if (isSidebarOpen) {
      closeSidebar();
    }
  }, [pathname]);

  // Prevent body scroll when sidebar is open
  useEffect(() => {
    if (isSidebarOpen) {
      document.body.style.overflow = "hidden";
    } else {
      document.body.style.overflow = "unset";
    }
    return () => {
      document.body.style.overflow = "unset";
    };
  }, [isSidebarOpen]);

  // Handle keyboard shortcuts
  useEffect(() => {
    const handleKeyDown = (e: KeyboardEvent) => {
      // Open search with Ctrl/Cmd + K
      if ((e.ctrlKey || e.metaKey) && e.key === "k") {
        e.preventDefault();
        setIsSearchModalOpen(true);
      }
      // Close modals with Escape
      if (e.key === "Escape") {
        setIsLoginModalOpen(false);
        setIsSearchModalOpen(false);
      }
    };

    window.addEventListener("keydown", handleKeyDown);
    return () => window.removeEventListener("keydown", handleKeyDown);
  }, []);

  const toggleSidebar = () => {
    if (isSidebarOpen) {
      closeSidebar();
    } else {
      openSidebar();
    }
  };

  const openSidebar = () => {
    setIsAnimating(true);
    setIsSidebarOpen(true);
  };

  const closeSidebar = () => {
    setIsAnimating(true);
    setIsSidebarOpen(false);
    // Reset animation state after transition completes
    setTimeout(() => {
      setIsAnimating(false);
    }, 500);
  };

  const handleSearchClick = () => {
    setIsSearchModalOpen(true);
  };

  const handleUserClick = () => {
    setIsLoginModalOpen(true);
  };

  useEffect(() => {
    setActiveItem(pathname);
  }, [pathname]);

  return (
    <>
      <header
        className={cn(
          "bg-white sticky top-10 lg:top-12 z-20 transition-all duration-500 ease-out",
          isScrolled ? "shadow-lg" : "shadow-sm"
        )}
      >
        <div className="w-full max-w-screen-xl 2xl:max-w-screen-xl mx-auto px-4 sm:px-6 lg:px-8">
          <div
            className={cn(
              "flex items-center justify-between relative transition-all duration-500 ease-out",
              isScrolled ? "h-12" : "h-16"
            )}
          >
            {/* Logo */}
            <div
              className={cn(
                "transition-all duration-500 ease-out transform-gpu",
                isScrolled ? "scale-75 -ml-4" : "scale-100"
              )}
            >
              <Logo animated={true} className="-ml-4" href="/" />
            </div>

            {/* Desktop Navigation */}
            <nav className="hidden lg:flex items-center space-x-8 ml-auto mr-4 relative">
              {navItems.map((item) => (
                <div
                  key={item.label}
                  className="relative"
                  onMouseEnter={() => setHoveredItem(item.label)}
                  onMouseLeave={() => setHoveredItem(null)}
                >
                  <Link
                    href={item.href}
                    className={cn(
                      "transition-all duration-500 ease-out font-light relative px-2 block transform-gpu",
                      isScrolled ? "text-xs py-3" : "text-sm py-4",
                      isActive(item.href)
                        ? "text-brand-color font-medium"
                        : "hover:text-brand-color"
                    )}
                  >
                    {item.label}
                    {/* Active indicator */}
                    {isActive(item.href) && (
                      <div
                        className={cn(
                          "absolute left-0 right-0 bg-brand-color transition-all duration-500 ease-out",
                          isScrolled ? "-bottom-1.5 h-0.5" : "-bottom-2 h-1"
                        )}
                      />
                    )}
                    {/* Hover effect */}
                    {hoveredItem === item.label && !isActive(item.href) && (
                      <div
                        className={cn(
                          "absolute left-0 right-0 bg-brand-color transition-all duration-300 ease-out",
                          isScrolled ? "-bottom-1.5 h-0.5" : "-bottom-2 h-1"
                        )}
                      />
                    )}
                  </Link>
                </div>
              ))}
            </nav>

            {/* Right Icons */}
            <div className="flex items-center space-x-1">
              <button
                onClick={handleSearchClick}
                className={cn(
                  "text-gray-500 hover:text-brand-color transition-all duration-500 ease-out rounded-full hover:bg-gray-100 relative group transform-gpu",
                  isScrolled ? "p-1.5" : "p-2"
                )}
                title="Search (Ctrl+K)"
              >
                <Search
                  className={cn(
                    "transition-all duration-500 ease-out",
                    isScrolled ? "w-3.5 h-3.5" : "w-4 h-4"
                  )}
                />
                {/* Keyboard shortcut hint */}
                <div className="absolute -bottom-8 left-1/2 transform -translate-x-1/2 bg-gray-800 text-white text-xs px-2 py-1 rounded opacity-0 group-hover:opacity-100 transition-opacity duration-200 whitespace-nowrap">
                  Ctrl+K
                </div>
              </button>

              {/* Hamburger Menu Button */}
              <button
                onClick={toggleSidebar}
                className={cn(
                  "lg:hidden transition-all duration-500 ease-out rounded-full transform-gpu",
                  isScrolled ? "p-1.5" : "p-2",
                  isSidebarOpen
                    ? "rotate-90 text-brand-color bg-gray-100"
                    : "rotate-0 text-gray-500 hover:text-brand-color hover:bg-gray-100"
                )}
              >
                <Menu
                  className={cn(
                    "transition-all duration-500 ease-out",
                    isScrolled ? "w-4 h-4" : "w-5 h-5"
                  )}
                />
              </button>
            </div>
          </div>

          {/* Main Border Line */}
          <div className="h-px bg-gray-300" />
        </div>
      </header>

      {/* Mobile Sidebar Overlay */}
      <div
        className={cn(
          "fixed inset-0 z-50 lg:hidden transition-all duration-500 ease-out",
          isSidebarOpen
            ? "opacity-100 pointer-events-auto"
            : "opacity-0 pointer-events-none"
        )}
      >
        {/* Backdrop */}
        <div
          className={cn(
            "absolute inset-0 bg-black/50 backdrop-blur-sm transition-all duration-500 ease-out",
            isSidebarOpen ? "opacity-100" : "opacity-0"
          )}
          onClick={closeSidebar}
        />

        {/* Sidebar */}
        <div
          className={cn(
            "absolute top-0 right-0 w-80 bg-white shadow-2xl transition-all duration-500 ease-out transform flex flex-col justify-between",
            isSidebarOpen ? "translate-x-0" : "translate-x-full"
          )}
        >
          {/* Sidebar Header - Fixed */}
          <div>
            <div className="bg-white z-20 flex items-center justify-between p-2 border-b border-gray-200 flex-shrink-0">
              <div
                className={cn(
                  "transition-all duration-500 ease-out",
                  isSidebarOpen
                    ? "opacity-100 translate-x-0"
                    : "opacity-0 -translate-x-4"
                )}
                style={{
                  transitionDelay: isSidebarOpen ? "200ms" : "0ms",
                }}
              >
                <Logo animated={true} href="/" />
              </div>

              {/* Close Button */}
              <button
                onClick={closeSidebar}
                className={cn(
                  "p-2 rounded-full text-gray-500 hover:text-gray-700 hover:bg-gray-100 transition-all duration-300",
                  "transition-all duration-500 ease-out",
                  isSidebarOpen
                    ? "opacity-100 translate-x-0 rotate-0"
                    : "opacity-0 translate-x-4 rotate-90"
                )}
                style={{
                  transitionDelay: isSidebarOpen ? "300ms" : "0ms",
                }}
              >
                <X className="w-5 h-5" />
              </button>
            </div>

            {/* Scrollable Content Container */}
            <div className="px-2 py-2">
              {/* Navigation Items */}
              <nav className="space-y-2">
                {navItems.map((item, index) => (
                  <div key={item.label}>
                    <Link
                      href={item.href}
                      onClick={closeSidebar}
                      className={cn(
                        "flex items-center justify-between py-3 px-4 rounded-xl transition-all duration-300 group hover:scale-[1.02]",
                        isActive(item.href)
                          ? "bg-orange-50 text-brand-color border-l-4 border-brand-color shadow-sm"
                          : "text-gray-700 hover:bg-gray-50 hover:text-black hover:shadow-sm"
                      )}
                    >
                      <span className="font-medium">{item.label}</span>
                      {isActive(item.href) && (
                        <div className="w-2 h-2 bg-brand-color rounded-full animate-pulse" />
                      )}
                    </Link>
                  </div>
                ))}
              </nav>

              {/* Search and User Buttons */}
              <div className="mt-3">
                <div className="flex flex-col items-start justify-start space-x-6">
                  <div
                    onClick={() => {
                      closeSidebar();
                      setIsSearchModalOpen(true);
                    }}
                    className="ml-4 text-gray-500 text-lg flex items-center justify-center font-normal transition-all duration-300 hover:scale-105 cursor-pointer"
                  >
                    <Search className="w-5 h-5 mr-2 text-[#1E1E1E]" />
                    Search
                  </div>
                  <Separator className="w-64 bg-black/20 my-2" />
                </div>
              </div>
            </div>
          </div>

          {/* Dark Section - Fixed at bottom */}
          <div className="bg-[#1E1E1E] h-screen border-t border-gray-700">
            <div className="px-6 pt-4">
              {/* All Navigation Items */}
              <div className="space-y-3">
                {/* Left Navigation Items */}
                {leftNavItems.map((item) => (
                  <Link
                    key={item.label}
                    href={item.href}
                    onClick={closeSidebar}
                    className={cn(
                      "block py-3 px-4 -mx-4 uppercase hover:text-gray-200 hover:bg-white/5 transition-all duration-200 text-xs tracking-wider font-medium rounded-lg",
                      activeItem === item.href
                        ? "text-white bg-white/10 border-l-2 border-white"
                        : "text-gray-300"
                    )}
                  >
                    {item.label}
                  </Link>
                ))}

                {/* Right Navigation Items */}
                {rightNavItems.map((item) => (
                  <Link
                    key={item.label}
                    href={item.href}
                    onClick={closeSidebar}
                    className={cn(
                      "block py-4 px-4 -mx-4 uppercase hover:text-gray-200 hover:bg-white/5 transition-all duration-200 text-xs tracking-wider font-medium rounded-lg",
                      activeItem === item.href
                        ? "text-white bg-white/10 border-l-2 border-white"
                        : "text-gray-300"
                    )}
                  >
                    {item.label}
                  </Link>
                ))}
              </div>
            </div>
          </div>
        </div>
      </div>

      {/* Login Modal */}
      <LoginModal
        isOpen={isLoginModalOpen}
        onClose={() => setIsLoginModalOpen(false)}
      />

      {/* Search Modal */}
      <SearchModal
        isOpen={isSearchModalOpen}
        onClose={() => setIsSearchModalOpen(false)}
      />
    </>
  );
}

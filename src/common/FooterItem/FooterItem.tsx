/* eslint-disable @typescript-eslint/no-unused-vars */
"use client";

import { Facebook, Instagram, Linkedin } from "lucide-react";
import Link from "next/link";
import { Logo } from "../Logo/Logo";
import Section from "../Section/Section";
import { SocialIcon } from "./social-icon";
import { NewsletterFormData } from "@/types/newsletter";
import { Separator } from "@/components/ui/Separator/Separator";
import { NewsletterTrigger } from "@/components/NewsletterTrigger/NewsletterTrigger";
import { Badge } from "@/components/ui/Badge/Badge";
import SolutionSpacesSection from "./SolutionSpacesSection";

const socialLinks = [
  {
    icon: Instagram,
    href: "https://www.instagram.com/rockworth_international/?hl=en",
    label: "Instagram",
  },
  {
    icon: Facebook,
    href: "https://www.facebook.com/Rockworthinternational/",
    label: "Facebook",
  },
  {
    icon: Linkedin,
    href: "https://in.linkedin.com/company/rockworthinternational",
    label: "LinkedIn",
  },
];

// Custom submission handler (optional)
const handleNewsletterSubmit = async (data: NewsletterFormData) => {
  try {
    await new Promise((resolve) => setTimeout(resolve, 1500));
    return { success: true };
  } catch (error) {
    return {
      success: false,
      message: "Failed to subscribe. Please try again later.",
    };
  }
};

export default function FooterItem() {
  return (
    <footer className="bg-gray-50 border-t">
      <Section className="lg:pt-6 lg:mt-2">
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-5 gap-8 lg:gap-12">
          {/* Company Info Section */}
          <div className="lg:col-span-2">
            <div className="">
              <Logo animated={false} className="-ml-4 -mt-3" href="/" />
              <p className="text-gray-500 hover text-sm leading-relaxed -mt-1">
                Unlock your potential, Access your Best Work.
              </p>
            </div>
            <Separator className="my-2 w-10" />
            <div className="space-y-4">
              <div>
                <p className="text-gray-500 hover text-sm leading-relaxed">
                  800 West Road R1 South,
                  <br />
                  Sri City, Sathyavedu Mandal, Tirupati (District)
                  <br />
                  Andhra Pradesh 517646
                </p>
              </div>
              <Separator className="w-10" />
              <div>
                <p className="text-black font-medium text-sm mb-2">
                  CONTACT US
                </p>
                <a
                  href="mailto:contact@rockworthindia.com"
                  className="text-gray-500 hover:underline hover:text-brand-color text-sm mb-1 block"
                >
                  contact@rockworthindia.com
                </a>
                <div className="flex flex-wrap gap-2 text-sm text-gray-500 hover">
                  <a
                    href="tel:+918130387672"
                    className="hover:text-brand-color"
                  >
                    +91- 81 303 876 72
                  </a>
                  <span className="text-gray-400">|</span>
                  <a
                    href="tel:+917995552807"
                    className="hover:text-brand-color"
                  >
                    79 955 528 07
                  </a>
                  <span className="text-gray-400">|</span>
                  <a
                    href="tel:+918130377376"
                    className="hover:text-brand-color"
                  >
                    81 303 773 76
                  </a>
                </div>
              </div>
            </div>
          </div>

          {/* Mobile: Overview and Solution Spaces side by side */}
          <div className="md:hidden col-span-1 grid grid-cols-2 gap-4">
            {/* Overview Section - Mobile Left */}
            <div className="text-gray-400">
              <h3 className="text-black font-semibold text-base mb-2">
                Overview
              </h3>
              <ul className="space-y-2">
                <li>
                  <Link
                    href="/about-us"
                    className="text-gray-500 hover:text-black text-sm transition-colors"
                  >
                    About Us
                  </Link>
                </li>
                <li>
                  <Link
                    href="/sustainability"
                    className="text-gray-500 hover:text-black text-sm transition-colors"
                  >
                    Sustainability
                  </Link>
                </li>
                <li>
                  <Link
                    href="/manufacturing"
                    className="text-gray-500 hover:text-black text-sm transition-colors"
                  >
                    Manufacturing
                  </Link>
                </li>
                <li>
                  <Link
                    href="/projects"
                    className="text-gray-500 hover:text-black text-sm transition-colors"
                  >
                    Projects
                  </Link>
                </li>
                <li>
                  <Link
                    href="/resources?type=certificates"
                    className="text-gray-500 hover:text-black text-sm transition-colors"
                  >
                    Certifications
                  </Link>
                </li>
                <li>
                  <Link
                    href="/partner-with-us"
                    className="text-gray-500 hover:text-black text-sm transition-colors"
                  >
                    Partner with us
                  </Link>
                </li>
              </ul>
            </div>

            {/* Solution Spaces Section - Mobile Right */}
            <div>
              <SolutionSpacesSection />
            </div>
          </div>

          {/* Desktop: Overview Section */}
          <div className="hidden md:block lg:col-span-1 lg:border-r text-gray-400">
            <h3 className="text-black font-semibold text-base mb-2">
              Overview
            </h3>
            <ul className="space-y-2">
              <li>
                <Link
                  href="/about-us"
                  className="text-gray-500 hover:text-black text-sm transition-colors"
                >
                  About Us
                </Link>
              </li>
              <li>
                <Link
                  href="/sustainability"
                  className="text-gray-500 hover:text-black text-sm transition-colors"
                >
                  Sustainability
                </Link>
              </li>
              <li>
                <Link
                  href="/manufacturing"
                  className="text-gray-500 hover:text-black text-sm transition-colors"
                >
                  Manufacturing
                </Link>
              </li>
              <li>
                <Link
                  href="/projects"
                  className="text-gray-500 hover:text-black text-sm transition-colors"
                >
                  Projects
                </Link>
              </li>
              <li>
                <Link
                  href="/resources?type=certificates"
                  className="text-gray-500 hover:text-black text-sm transition-colors"
                >
                  Certifications
                </Link>
              </li>
              <li>
                <Link
                  href="/partner-with-us"
                  className="text-gray-500 hover:text-black text-sm transition-colors"
                >
                  Partner with us
                </Link>
              </li>
            </ul>
          </div>

          {/* Desktop: Solution Spaces Section */}
          <div className="hidden md:block">
            <SolutionSpacesSection />
          </div>

          {/* Connect Section */}
          <div className="lg:col-span-1">
            <h3 className="text-black font-semibold text-base mb-2">
              Connect with us
            </h3>
            {/* Social Media Icons */}
            <div className="flex space-x-4 mb-2">
              {socialLinks.map((social, index) => (
                <SocialIcon
                  key={social.label}
                  icon={social.icon}
                  href={social.href}
                  label={social.label}
                  delay={index * 0.1}
                />
              ))}
            </div>
            {/* Newsletter Signup */}
            <div>
              <h4 className="text-black font-medium text-sm mb-1">
                Subscribe to Our Newsletter
              </h4>
              <p className="text-gray-500 hover text-xs leading-relaxed mb-3">
                Stay informed with Rockworth&apos;s curated insights on
                workspace innovation, product launches, and industry best
                practices—delivered quarterly to your inbox.
              </p>
              <NewsletterTrigger
                className="text-sm h-8 w-auto text-gray-500 border-gray-600 hover:bg-brand-color hover:border-brand-color hover:text-white bg-transparent transition-all duration-300"
                onSubmit={handleNewsletterSubmit}
              />
            </div>
          </div>
        </div>

        {/* Bottom Section */}
        <div className="mt-4 pt-4 lg:mt-6 lg:pt-6 border-b border-gray-400">
          <div className="flex flex-col sm:flex-row justify-between items-center gap-4 my-4">
            <p className="text-gray-500 text-sm">
              © 2025 Rockworth. All rights reserved.
            </p>
            <div className="flex flex-wrap gap-6 text-sm">
              <Link
                href="/privacy-policy"
                className="text-gray-500 hover:text-gray-700 transition-colors"
              >
                Privacy Policy
              </Link>
              <Link
                href="/terms-of-use"
                className="text-gray-500 hover:text-gray-700 transition-colors"
              >
                Terms of Use
              </Link>
            </div>
          </div>
        </div>
      </Section>
    </footer>
  );
}

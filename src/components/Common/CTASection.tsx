/* eslint-disable @typescript-eslint/no-explicit-any */
"use client";

import Section from "@/common/Section/Section";
import { motion } from "framer-motion";

export default function CTASection() {
  const containerVariants: any = {
    hidden: { opacity: 0 },
    visible: {
      opacity: 1,
      transition: {
        duration: 0.8,
        staggerChildren: 0.2,
      },
    },
  };

  const itemVariants: any = {
    hidden: { opacity: 0, y: 30 },
    visible: {
      opacity: 1,
      y: 0,
      transition: {
        duration: 0.6,
        ease: "easeOut",
      },
    },
  };

  const buttonVariants: any = {
    hover: {
      scale: 1.05,
      transition: {
        duration: 0.2,
        ease: "easeInOut",
      },
    },
    tap: {
      scale: 0.95,
    },
  };

  return (
    <div className="bg-black">
      <Section>
        <motion.div
          variants={containerVariants}
          initial="hidden"
          animate="visible"
        >
          {/* Main Heading */}
          <motion.h2
            className="text-center text-2xl md:text-3xl font-normal text-white tracking-wide mb-2"
            variants={itemVariants}
          >
            Let&apos;s Get Started With Your Dream Office
          </motion.h2>

          {/* Description Text */}
          <motion.p
            className="text-base text-white/70 leading-relaxed font-light mb-8 max-w-3xl mx-auto text-center"
            variants={itemVariants}
          >
            Contact us now and get the best offerings for your office setup
          </motion.p>

          {/* CTA Buttons */}
          <motion.div
            className="flex flex-col sm:flex-row gap-4 justify-center"
            variants={itemVariants}
          >
            <motion.a
              href="mailto:contact@rockworthindia.com"
              className="px-8 py-3 bg-transparent border border-white/70 text-white hover:text-white font-medium hover:bg-brand-color transition-colors duration-200 text-center inline-block"
              variants={buttonVariants}
              whileHover="hover"
              whileTap="tap"
            >
              Get Started Now
            </motion.a>
          </motion.div>
        </motion.div>
      </Section>
    </div>
  );
}

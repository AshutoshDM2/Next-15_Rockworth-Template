/* eslint-disable @typescript-eslint/no-explicit-any */
"use client";

import { motion } from "framer-motion";
import Image from "next/image";

export default function ProductHeader() {
  const itemVariants: any = {
    hidden: { opacity: 0, y: 20 },
    visible: {
      opacity: 1,
      y: 0,
      transition: {
        duration: 0.5,
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
    <div className="bg-gray-50">
      {/* Explore our Product and Image Section */}
      <motion.div
        className="grid lg:grid-cols-5 gap-0 overflow-hidden shadow-2xl lg:h-[300px]"
        variants={itemVariants}
      >
        {/* Left Side - Mission and Vision */}
        <motion.div
          className="bg-black text-white p-12 lg:p-20 col-span-2"
          initial={{ opacity: 0, x: -50 }}
          animate={{ opacity: 1, x: 0 }}
          transition={{ duration: 0.8, delay: 0.3 }}
        >
          <motion.div
            className="mb-12"
            initial={{ opacity: 0, y: 30 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6, delay: 0.5 }}
          >
            <h2 className="text-5xl font-medium mb-2">Explore Our Product</h2>
            <p className="text-gray-200 text-base">
              Personal furniture solutions tailored for modern businesses.
            </p>
          </motion.div>
          <motion.div
            className="flex flex-col sm:flex-row gap-4 justify-start"
            variants={itemVariants}
          >
            <motion.button
              className="text-sm px-8 py-3 bg-white border border-white/70 text-black hover:text-white font-medium hover:bg-transparent transition-colors duration-200"
              variants={buttonVariants}
              whileHover="hover"
              whileTap="tap"
            >
              Explore Products
            </motion.button>
            <motion.button
              className="text-sm px-8 py-3 bg-transparent border border-white/70 text-white hover:text-black font-medium hover:bg-gray-100 transition-colors duration-200"
              variants={buttonVariants}
              whileHover="hover"
              whileTap="tap"
            >
              Request Catalog
            </motion.button>
          </motion.div>
        </motion.div>

        {/* Right Side - Professional Image */}
        <motion.div
          className="relative col-span-3 min-h-[600px]"
          initial={{ opacity: 0, x: 50 }}
          animate={{ opacity: 1, x: 0 }}
          transition={{ duration: 0.8, delay: 0.4 }}
        >
          <Image
            src="/images/about/about-us-banner.webp"
            alt="Professional man with glasses smiling in office environment"
            fill
            sizes="(max-width: 768px) 100vw, (max-width: 1200px) 50vw, 33vw"
            className="object-cover object-center"
            priority
          />
          <motion.div
            className="absolute inset-0 bg-gradient-to-l from-transparent to-black/10"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ duration: 1, delay: 0.8 }}
          />
        </motion.div>
      </motion.div>
    </div>
  );
}

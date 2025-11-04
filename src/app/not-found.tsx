/* eslint-disable @typescript-eslint/no-explicit-any */
"use client";

import OutlineButton from "@/components/Common/OutlineButton";
import { motion } from "framer-motion";

export default function NotFoundPage() {
  return (
    <div className="flex flex-col min-h-screen bg-white text-white">
      <main className="flex-1 flex flex-col items-center justify-center p-6">
        <div className="w-full max-w-xl mx-auto text-center flex items-center flex-col">
          <motion.div
            initial={{ opacity: 0, scale: 0.8 }}
            animate={{ opacity: 1, scale: 1 }}
            transition={{ duration: 0.5 }}
            className="mb-8"
          >
            <NotFoundAnimation />
          </motion.div>
          <motion.h1
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5, delay: 0.3 }}
            className="text-slate-900 text-4xl font-bold mb-4"
          >
            404 - Rockworth Disruption
          </motion.h1>
          <motion.p
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5, delay: 0.5 }}
            className="text-xl text-slate-900 mb-8"
          >
            Oops! The page you&apos;re looking for seems to be missing from our
            supply chain.
          </motion.p>
          <OutlineButton
            href="/"
            icon={true}
            className="w-40 border-brand-color text-white bg-brand-color"
          >
            Back To Home
          </OutlineButton>{" "}
        </div>
      </main>
    </div>
  );
}

function NotFoundAnimation() {
  const containerVariants: any = {
    start: {
      transition: {
        staggerChildren: 0.2,
      },
    },
    end: {
      transition: {
        staggerChildren: 0.2,
      },
    },
  };

  const circleVariants: any = {
    start: {
      y: 0,
    },
    end: {
      y: [0, -15, 0],
      transition: {
        duration: 1.5,
        repeat: Number.POSITIVE_INFINITY,
        ease: "easeInOut",
      },
    },
  };

  const pathVariants: any = {
    hidden: { pathLength: 0, opacity: 0 },
    visible: {
      pathLength: 1,
      opacity: 1,
      transition: {
        pathLength: { type: "spring", duration: 1.5, bounce: 0 },
        opacity: { duration: 0.5 },
      },
    },
  };

  return (
    <div className="w-full h-20 flex items-center justify-center text-slate-900">
      <svg
        width="300"
        height="200"
        viewBox="0 0 300 200"
        fill="none"
        xmlns="http://www.w3.org/2000/svg"
      >
        {/* Supply chain path - broken */}
        <motion.path
          d="M 50,100 L 125,100"
          stroke="#FF4A1A"
          strokeWidth="4"
          strokeLinecap="round"
          variants={pathVariants}
          initial="hidden"
          animate="visible"
        />

        <motion.path
          d="M 175,100 L 250,100"
          stroke="#FF4A1A"
          strokeWidth="4"
          strokeLinecap="round"
          variants={pathVariants}
          initial="hidden"
          animate="visible"
        />

        {/* Broken connection with dashed line */}
        <motion.path
          d="M 125,100 L 175,100"
          stroke="#FF4A1A"
          strokeWidth="4"
          strokeDasharray="5,5"
          strokeLinecap="round"
          variants={pathVariants}
          initial="hidden"
          animate="visible"
        />

        {/* Warning symbols */}
        <motion.path
          d="M 150,70 L 150,80"
          stroke="#FF4A1A"
          strokeWidth="4"
          strokeLinecap="round"
          variants={pathVariants}
          initial="hidden"
          animate="visible"
        />

        <motion.path
          d="M 150,90 L 150,90.1"
          stroke="#FF4A1A"
          strokeWidth="4"
          strokeLinecap="round"
          variants={pathVariants}
          initial="hidden"
          animate="visible"
        />

        <motion.circle
          cx="150"
          cy="80"
          r="20"
          stroke="#FF4A1A"
          strokeWidth="4"
          fill="none"
          variants={pathVariants}
          initial="hidden"
          animate="visible"
        />

        {/* Nodes */}
        <motion.g variants={containerVariants} initial="start" animate="end">
          <motion.circle
            cx="50"
            cy="100"
            r="15"
            fill="#FF4A1A"
            stroke="#FF4A1A"
            strokeWidth="3"
            variants={circleVariants}
          />

          <motion.circle
            cx="250"
            cy="100"
            r="15"
            fill="#FF4A1A"
            stroke="#FF4A1A"
            strokeWidth="3"
            variants={circleVariants}
          />
        </motion.g>
      </svg>
    </div>
  );
}

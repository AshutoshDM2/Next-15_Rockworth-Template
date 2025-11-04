"use client";

import Section from "@/common/Section/Section";
import { motion } from "framer-motion";
import { Clock, Sparkles } from "lucide-react";
import OutlineButton from "../Common/OutlineButton";

export default function ComingSoon() {
  return (
    <div className="bg-gradient-to-br from-slate-50 to-slate-100 flex items-center justify-center">
      <Section className="flex items-center flex-col text-center">
        {/* Animated Icon */}
        <motion.div
          initial={{ opacity: 0, scale: 0.5 }}
          animate={{ opacity: 1, scale: 1 }}
          transition={{
            duration: 0.6,
            type: "spring",
            stiffness: 100,
          }}
          className="mb-8"
        >
          <MinimalAnimation />
        </motion.div>

        {/* Heading */}
        <motion.h1
          initial={{ opacity: 0, y: 30 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6, delay: 0.2 }}
          className="text-4xl md:text-5xl font-medium text-slate-900 mb-4 tracking-tight"
        >
          Coming Soon
        </motion.h1>

        {/* Description */}
        <motion.p
          initial={{ opacity: 0, y: 30 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6, delay: 0.4 }}
          className="text-base font-light text-gray-700 mb-6 mx-auto leading-relaxed"
        >
          We&apos;re crafting something exceptional. Our Online Store will be available soon.
        </motion.p>

        {/* CTA Button */}
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6, delay: 0.5 }}
        >
          <OutlineButton
            href="/"
            icon={true}
            className="w-40 border-brand-color text-white bg-brand-color"
          >
            Back To Home
          </OutlineButton>{" "}
        </motion.div>
      </Section>
    </div>
  );
}

function MinimalAnimation() {
  return (
    <div className="flex items-center justify-center">
      <motion.div
        className="relative"
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ duration: 0.8 }}
      >
        {/* Main Circle */}
        <motion.div
          className="w-24 h-24 rounded-full bg-gradient-to-br from-brand-color to-brand-color flex items-center justify-center shadow-lg"
          animate={{
            scale: [1, 1.05, 1],
            rotate: [0, 5, -5, 0],
          }}
          transition={{
            duration: 4,
            repeat: Number.POSITIVE_INFINITY,
            ease: "easeInOut",
          }}
        >
          <Clock className="w-8 h-8 text-white" />
        </motion.div>

        {/* Floating Particles */}
        {[...Array(3)].map((_, i) => (
          <motion.div
            key={i}
            className="absolute w-2 h-2 bg-brand-color rounded-full"
            style={{
              top: `${20 + i * 15}%`,
              left: `${80 + i * 10}%`,
            }}
            animate={{
              y: [-10, -20, -10],
              opacity: [0.3, 0.8, 0.3],
            }}
            transition={{
              duration: 2 + i * 0.5,
              repeat: Number.POSITIVE_INFINITY,
              ease: "easeInOut",
              delay: i * 0.3,
            }}
          />
        ))}

        {/* Sparkle Effect */}
        <motion.div
          className="absolute -top-2 -right-2"
          animate={{
            scale: [0, 1, 0],
            rotate: [0, 180, 360],
          }}
          transition={{
            duration: 3,
            repeat: Number.POSITIVE_INFINITY,
            ease: "easeInOut",
          }}
        >
          <Sparkles className="w-5 h-5 text-brand-color" />
        </motion.div>
      </motion.div>
    </div>
  );
}

import React from "react";
import { cn } from "@/lib/utils";
import { motion } from "framer-motion";
interface CardProps {
  icon: React.ReactNode;
  title: string;
  description: string;
  isLast: boolean;
  isExpanded: boolean;
  index: number;
  color: string;
  textOpacity: number; // Pass text opacity as a prop
}

const Card: React.FC<CardProps> = ({
  icon,
  title,
  description,
  isLast,
  isExpanded,
  index,
  color,
  textOpacity = 1,
}) => {
  return (
    <motion.div
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{
        duration: 0.6,
        delay: index * 0.1,
        ease: [0.22, 1, 0.36, 1],
      }}
      className={cn(
        "h-[300px] w-[350px] sm:w-[350px] md:w-[380px] mx-4 rounded-xl overflow-hidden flex flex-col",
        "backdrop-blur-sm shadow-xl",
        "transition-all duration-700 ease-out",
        `bg-gradient-to-br ${color}`,
        isLast && isExpanded && "w-[800px]"
      )}
      style={{
        transitionDelay: `${index * 50}ms`,
        transform: isLast ? `scale(${isExpanded ? 2.2 : 1})` : "scale(1)",
      }}>
      <div className="p-8 flex flex-col h-full">
        <div className="relative z-10">
          <div className="text-3xl text-white">{icon}</div>
          <div className="absolute -inset-4 bg-white/20 rounded-full blur-xl opacity-50 -z-10" />
        </div>

        <div
          className={cn(
            "mt-auto",
            isExpanded &&
              isLast &&
              "transform transition-transform duration-500"
          )}>
          <motion.h2
            className={cn(
              "text-2xl text-white font-medium mb-4 leading-tight transition-all duration-500",
              isExpanded && isLast && "text-4xl"
            )}
            style={{ opacity: textOpacity }}>
            {title}
          </motion.h2>

          <motion.p
            className={cn(
              "text-sm text-white/80 transition-all duration-500",
              isExpanded && isLast && "text-base"
            )}
            style={{ opacity: textOpacity }}>
            {description}
          </motion.p>
        </div>
      </div>
    </motion.div>
  );
};

export default Card;

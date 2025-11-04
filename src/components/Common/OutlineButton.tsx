/* eslint-disable @typescript-eslint/no-explicit-any */
// components/ui/OutlineButton.tsx
"use client";

import React, { ReactNode } from "react";
import { Button } from "@/components/ui/Button/Button";
import clsx from "clsx";
import { IoIosPlay } from "react-icons/io";

interface OutlineButtonProps {
  href?: string;
  variant?: "default" | "outline" | "ghost" | "link";
  size?: any;
  children: React.ReactNode;
  className?: string;
  icon?: ReactNode;
  onClick?: () => void;
  type?: "button" | "submit" | "reset";
}

const OutlineButton: React.FC<OutlineButtonProps> = ({
  href = "",
  variant = "outline",
  size = "lg",
  children,
  className = "",
  onClick,
  icon = false,
  type = "button",
}) => {
  return (
    <Button
      variant={variant}
      size={size}
      href={href}
      onClick={onClick}
      type={type}
      className={clsx(
        "flex items-center border border-black px-8 py-4 text-black text-sm font-medium bg-transparent transition-all duration-300 hover:bg-brand-color hover:border-brand-color hover:text-white",
        className
      )}
    >
      {children}
      {icon && (
        <IoIosPlay
          className="ml-0.5 fill-current"
          style={{ width: "0.95rem" }}
        />
      )}
    </Button>
  );
};

export default OutlineButton;

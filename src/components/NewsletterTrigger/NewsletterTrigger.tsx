"use client";

import type React from "react";

import { useState } from "react";
import { Button } from "@/components/ui/Button/Button";
import { NewsletterFormData } from "@/types/newsletter";
import { NewsletterModal } from "../NewsletterModal/NewsletterModal";


interface NewsletterTriggerProps {
  children?: React.ReactNode;
  variant?: "default" | "outline" | "ghost" | "link";
  size?: "default" | "sm" | "lg";
  className?: string;
  modalTitle?: string;
  modalDescription?: string;
  onSubmit?: (
    data: NewsletterFormData
  ) => Promise<{ success: boolean; message?: string }>;
}

export function NewsletterTrigger({
  children = "Sign Up",
  variant = "outline",
  size = "sm",
  className = "",
  modalTitle,
  modalDescription,
  onSubmit,
}: NewsletterTriggerProps) {
  const [isModalOpen, setIsModalOpen] = useState(false);

  return (
    <>
      <Button
        onClick={() => setIsModalOpen(true)}
        variant={variant}
        size={size}
        className={className}
      >
        {children}
      </Button>

      <NewsletterModal
        isOpen={isModalOpen}
        onClose={() => setIsModalOpen(false)}
        title={modalTitle}
        description={modalDescription}
        onSubmit={onSubmit}
      />
    </>
  );
}

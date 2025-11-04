/* eslint-disable @typescript-eslint/ban-ts-comment */
/* eslint-disable @typescript-eslint/no-unused-vars */
/* eslint-disable @typescript-eslint/no-explicit-any */
import { useState } from "react";
import type { NewsletterFormData, NewsletterState } from "../types/newsletter";

export function useNewsletter() {
  const [formData, setFormData] = useState<NewsletterFormData>({
    name: "",
    email: "",
  });

  const [state, setState] = useState<NewsletterState>({
    isSubmitting: false,
    isSuccess: false,
    error: null,
  });

  const updateField = (field: keyof NewsletterFormData, value: string) => {
    setFormData((prev: any) => ({ ...prev, [field]: value }));
  };

  const resetForm = () => {
    setFormData({ name: "", email: "" });
    setState({ isSubmitting: false, isSuccess: false, error: null });
  };

  const submitForm = async (
    onSubmit?: (
      data: NewsletterFormData
    ) => Promise<{ success: boolean; message?: string }>
  ) => {
    setState((prev: any) => ({ ...prev, isSubmitting: true, error: null }));

    try {
      const result = onSubmit
        ? await onSubmit(formData)
        : await defaultSubmit(formData);

      if (result.success) {
        setState((prev: any) => ({
          ...prev,
          isSubmitting: false,
          isSuccess: true,
        }));
      } else {
        setState((prev: any) => ({
          ...prev,
          isSubmitting: false,
          //@ts-ignore
          error: result.message || "Subscription failed. Please try again.",
        }));
      }
    } catch (error) {
      setState((prev: any) => ({
        ...prev,
        isSubmitting: false,
        error: "An unexpected error occurred. Please try again.",
      }));
    }
  };

  // Default submission handler (simulate API call)
  const defaultSubmit = async (data: NewsletterFormData) => {
    await new Promise((resolve) => setTimeout(resolve, 1500));

    return { success: true };
  };

  return {
    formData,
    state,
    updateField,
    resetForm,
    submitForm,
  };
}

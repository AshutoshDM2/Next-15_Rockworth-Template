/* eslint-disable @typescript-eslint/ban-ts-comment */
/* eslint-disable @typescript-eslint/no-explicit-any */
import { api } from "@/utils/api";
import { useState } from "react";
import * as Yup from "yup";

export interface QuoteRequestData {
  contact_name: string;
  customer_name: string;
  phoneNo: string;
  cityState: string;
  requirements: string;
}

export const initialValues: QuoteRequestData = {
  contact_name: "",
  customer_name: "",
  phoneNo: "",
  cityState: "",
  requirements: "",
};

export const formVariants = {
  hidden: { opacity: 0, y: 20 },
  visible: {
    opacity: 1,
    y: 0,
    transition: {
      duration: 0.3,
      staggerChildren: 0.05,
    },
  },
};

export const fieldVariants = {
  hidden: { opacity: 0, y: 10 },
  visible: {
    opacity: 1,
    y: 0,
    transition: { duration: 0.3 },
  },
};

export const validationSchema = Yup.object({
  contact_name: Yup.string()
    .min(2, "Name must be at least 2 characters")
    .required("Name is required"),
  customer_name: Yup.string()
    .min(2, "Company name must be at least 2 characters")
    .required("Company name is required"),
  // email: Yup.string()
  //   .min(2, "Please enter a valid Email Address")
  //   .required("Email Address is required"),
  phoneNo: Yup.string()
    .matches(/^[+]?[1-9][\d]{0,15}$/, "Please enter a valid phone number")
    .required("Phone number is required"),
  cityState: Yup.string()
    .min(2, "City/State must be at least 2 characters")
    .required("City/State is required"),
  requirements: Yup.string()
    .min(10, "Please provide more details about your requirements")
    .required("Requirements are required"),
});

export const useQuoteRequest = (
  onClose: () => void,
  onSubmit?: (data: QuoteRequestData) => void
) => {
  const [showSuccessModal, setShowSuccessModal] = useState(false);

  const handleSubmit = async (
    values: QuoteRequestData,
    { setSubmitting, setFieldError, resetForm }: any
  ) => {
    try {
      const response = await api.post("/save-site-lead", values);
      if (response.data?.message === "Site lead has been saved successfully.") {
        onSubmit?.(values);
        resetForm();
        onClose();
        setShowSuccessModal(true);
      } else {
        throw new Error("Unexpected response from server");
      }
    } catch (error: any) {
      console.error("Error submitting form:", error);
      setFieldError(
        "requirements",
        "Failed to submit request. Please try again."
      );
    } finally {
      setSubmitting(false);
    }
  };

  const handlePhoneNumberChange = (
    event: React.ChangeEvent<HTMLInputElement>,
    setFieldValue: (field: string, value: any) => void
  ) => {
    let input = event.target.value;
    if (input.startsWith("+91")) input = input.slice(3);
    if (input.startsWith("0")) input = input.slice(1);
    if (/^\d{0,10}$/.test(input)) setFieldValue("phoneNo", input);
  };

  return {
    showSuccessModal,
    setShowSuccessModal,
    handleSubmit,
    handlePhoneNumberChange,
  };
};

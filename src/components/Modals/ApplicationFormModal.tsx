/* eslint-disable @typescript-eslint/no-explicit-any */
"use client";

import type React from "react";
import { useState, useRef } from "react";
import { Button } from "@/components/ui/Button/Button";
import {
  Dialog,
  DialogContent,
  DialogOverlay,
} from "@/components/ui/Dialog/Dialog";
import { Input } from "@/components/ui/Input/Input";
import { Label } from "@/components/ui/Label/Label";
import { Card, CardContent } from "@/components/ui/Card/Card";
import { AnimatePresence, motion } from "framer-motion";
import { FileText, Send, X, Loader2 } from "lucide-react";
import { Formik, Form, Field, ErrorMessage } from "formik";
import * as Yup from "yup";
import { api } from "@/utils/api";
import {
  Select,
  SelectItem,
  SelectTrigger,
  SelectValue,
  SelectContent,
} from "../ui/Select/Select";

interface ApplicationFormData {
  email: string;
  name: string;
  phone: string;
  age: number | "";
  gender: string;
  currentCompany: string;
  salaryExpectations: string;
  startDatePreference: string;
  previouslyApplied: string;
  resume: File | null;
}

interface DragDropState {
  isDragOver: boolean;
  isUploading: boolean;
}

interface ApplicationFormModalProps {
  isOpen: boolean;
  onClose: () => void;
  onSuccess: () => void;
}

// Validation schema using Yup
const validationSchema = Yup.object({
  name: Yup.string()
    .min(2, "Full Name must be at least 2 characters")
    .required("Full Name is required"),
  email: Yup.string()
    .email("Invalid email address")
    .required("Email is required"),
  phone: Yup.string()
    .matches(/^[+]?[1-9][\d]{0,15}$/, "Please enter a valid phone number")
    .required("Phone number is required"),
  age: Yup.number()
    .typeError("Age must be a number")
    .min(18, "You must be at least 18 years old")
    .max(100, "Age cannot exceed 100")
    .required("Age is required"),
  gender: Yup.string().required("Gender is required"),
  currentCompany: Yup.string().required("Current Company is required"),
  salaryExpectations: Yup.string().required("Salary Expectations are required"),
  startDatePreference: Yup.string().required(
    "Start Date Preference is required"
  ),
  previouslyApplied: Yup.string().required("Previously Applied is required"),
  resume: Yup.mixed()
    .required("Resume is required")
    .test(
      "fileType",
      "Only PDF, DOCX, and image files are allowed",
      (value) => {
        if (!value) return false;
        const file = value as File;
        const allowedTypes = [
          "application/pdf",
          "application/vnd.openxmlformats-officedocument.wordprocessingml.document",
          "image/jpeg",
          "image/jpg",
          "image/png",
          "image/webp",
        ];
        return allowedTypes.includes(file.type);
      }
    )
    .test(
      "fileSize",
      "File is too large (max 10MB)",
      (value) => value && (value as File).size <= 10 * 1024 * 1024 // 10 MB
    ),
});

export default function ApplicationFormModal({
  isOpen,
  onClose,
  onSuccess,
}: ApplicationFormModalProps) {
  // Removed showSuccessModal state as it's managed by parent
  const [filePreviewUrl, setFilePreviewUrl] = useState<string | null>(null);
  const fileInputRef = useRef<HTMLInputElement>(null);
  const [uploadedFile, setUploadedFile] = useState<File | null>(null);
  const [dragState, setDragState] = useState<DragDropState>({
    isDragOver: false,
    isUploading: false,
  });

  const initialValues: ApplicationFormData = {
    email: "",
    name: "",
    phone: "",
    age: "",
    gender: "",
    currentCompany: "",
    salaryExpectations: "",
    startDatePreference: "",
    previouslyApplied: "",
    resume: null,
  };

  const handleFileChange = (
    event: React.ChangeEvent<HTMLInputElement>,
    setFieldValue: (
      field: string,
      value: any,
      shouldValidate?: boolean
    ) => void,
    setFieldError: (field: string, message: string | undefined) => void
  ) => {
    const file = event.target.files?.[0];
    if (file) {
      const allowedTypes = [
        "application/pdf",
        "application/vnd.openxmlformats-officedocument.wordprocessingml.document",
        "image/jpeg",
        "image/jpg",
        "image/png",
        "image/webp",
      ];

      if (allowedTypes.includes(file.type)) {
        if (file.size <= 10 * 1024 * 1024) {
          setFieldValue("resume", file);
          setFilePreviewUrl(URL.createObjectURL(file));
          setUploadedFile(file);
          setFieldError("resume", undefined);
        } else {
          setFieldValue("resume", null);
          setFilePreviewUrl(null);
          setUploadedFile(null);
          setFieldError("resume", "File is too large (max 10MB)");
          if (fileInputRef.current) {
            fileInputRef.current.value = "";
          }
        }
      } else {
        setFieldValue("resume", null);
        setFilePreviewUrl(null);
        setUploadedFile(null);
        setFieldError("resume", "Only PDF, DOCX, and image files are allowed");
        if (fileInputRef.current) {
          fileInputRef.current.value = "";
        }
      }
    } else {
      setFieldValue("resume", null);
      setFilePreviewUrl(null);
      setUploadedFile(null);
      setFieldError("resume", "Resume is required");
    }
  };

  const handleDragOver = (e: React.DragEvent) => {
    e.preventDefault();
    setDragState((prev) => ({ ...prev, isDragOver: true }));
  };

  const handleDragLeave = (e: React.DragEvent) => {
    e.preventDefault();
    setDragState((prev) => ({ ...prev, isDragOver: false }));
  };

  const handleDrop = (
    e: React.DragEvent,
    setFieldValue: (field: string, value: any) => void,
    setFieldError: (field: string, message: string | undefined) => void
  ) => {
    e.preventDefault();
    setDragState((prev) => ({ ...prev, isDragOver: false }));

    const files = e.dataTransfer.files;
    if (files.length > 0) {
      const file = files[0];
      const allowedTypes = [
        "application/pdf",
        "application/vnd.openxmlformats-officedocument.wordprocessingml.document",
        "image/jpeg",
        "image/jpg",
        "image/png",
        "image/webp",
      ];

      if (allowedTypes.includes(file.type)) {
        if (file.size <= 10 * 1024 * 1024) {
          setFieldValue("resume", file);
          setFilePreviewUrl(URL.createObjectURL(file));
          setUploadedFile(file);
          setFieldError("resume", undefined);
        } else {
          setFieldError("resume", "File is too large (max 10MB)");
        }
      } else {
        setFieldError("resume", "Only PDF, DOCX, and image files are allowed");
      }
    }
  };

  const handlePhoneNumberChange = (
    event: React.ChangeEvent<HTMLInputElement>,
    setFieldValue: (field: string, value: any) => void
  ) => {
    let input = event.target.value;
    // Remove +91 if it exists
    if (input.startsWith("+91")) {
      input = input.slice(3);
    }
    // Remove leading 0
    if (input.startsWith("0")) {
      input = input.slice(1);
    }
    // Allow only numeric values and limit to 10 digits
    if (/^\d{0,10}$/.test(input)) {
      setFieldValue("phone", input);
    }
  };

  const handleSubmit = async (
    values: ApplicationFormData,
    { setSubmitting, setFieldError, resetForm }: any
  ) => {
    setSubmitting(true);
    const data = new FormData();
    // Append the resume file under the 'files' key
    if (values.resume) {
      data.append("files", values.resume);
    }
    // Create a JSON string for employee_data
    const employeeDataJson = JSON.stringify({
      email: values.email,
      name: values.name,
      phone: values.phone,
      age: values.age, // Keep as number for JSON, toString() will happen implicitly if needed by API
      gender: values.gender,
      currentCompany: values.currentCompany,
      salaryExpectations: values.salaryExpectations,
      startDatePreference: values.startDatePreference,
      previouslyApplied: values.previouslyApplied,
    });
    // Append the JSON string under the 'employee_data' key
    data.append("employee_data", employeeDataJson);

    try {
      const response = await api.post(
        "/send-email-for-website",
        data, // Send as FormData
        {
          headers: {
            "Content-Type": "multipart/form-data", // Explicitly set Content-Type
          },
        }
      );
      const result = response.data;
      if (result.message === "Email has been sent successfully.") {
        resetForm(); // Reset the form
        onClose(); // Close the ApplicationFormModal
        onSuccess(); // Trigger the parent to open the success modal
      } else {
        setFieldError(
          "email",
          result.message || "An unexpected error occurred."
        );
      }
    } catch (error: any) {
      setFieldError(
        "email",
        error.message || "An error occurred during submission."
      );
      console.error("Application submission error:", error);
    } finally {
      setSubmitting(false);
    }
  };

  const formVariants = {
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

  const fieldVariants = {
    hidden: { opacity: 0, y: 10 },
    visible: {
      opacity: 1,
      y: 0,
      transition: { duration: 0.3 },
    },
  };

  return (
    <>
      <Dialog open={isOpen} onOpenChange={onClose}>
        <DialogOverlay className="bg-black/30 backdrop-blur-sm" />
        <DialogContent className="sm:max-w-5xl p-0 overflow-hidden border-0 bg-white rounded-3xl shadow-2xl z-[1000] -mt-4">
          <Card className="border-0 shadow-none bg-white">
            {" "}
            {/* Restored Card */}
            <CardContent className="p-0">
              {" "}
              {/* Restored CardContent */}
              {/* Close Button */}
              <button
                onClick={onClose}
                className="absolute top-6 right-6 z-10 p-2 hover:bg-gray-100 rounded-full transition-colors"
                aria-label="Close"
              >
                <X className="w-5 h-5 text-gray-500" />
              </button>
              <div className="px-5 py-2">
                {/* Header with Icon */}
                <div className="text-center mb-4">
                  <div className="w-10 h-10 bg-gradient-to-br from-orange-500 to-red-600 rounded-full flex items-center justify-center mx-auto my-2 shadow-lg">
                    <FileText className="w-6 h-6 text-white" />
                  </div>
                  <h2 className="text-xl font-bold text-black mb-3">
                    Apply Now
                  </h2>
                  <p className="text-gray-500 text-sm leading-relaxed max-w-sm mx-auto">
                    Fill out the form below to submit your application.
                  </p>
                </div>
                {/* Formik Form */}
                <AnimatePresence>
                  {isOpen && (
                    <Formik
                      initialValues={initialValues}
                      validationSchema={validationSchema}
                      onSubmit={handleSubmit}
                    >
                      {({
                        isSubmitting,
                        errors,
                        touched,
                        setFieldValue,
                        setFieldError,
                      }) => (
                        <motion.div
                          variants={formVariants}
                          initial="hidden"
                          animate="visible"
                        >
                          <Form className="space-y-4 max-h-[70vh] overflow-y-auto pr-2">
                            {/* Name Field */}
                            <motion.div variants={fieldVariants}>
                              <Label htmlFor="name" className="ml-2">
                                Full Name
                              </Label>
                              <Field name="name">
                                {({ field }: any) => (
                                  <Input
                                    {...field}
                                    id="name"
                                    type="text"
                                    placeholder="Enter Your Name"
                                    className={`h-14 px-6 text-lg border-2 bg-gray-50 border-gray-200 rounded-xl focus:ring-2 focus:ring-orange-500 focus:border-transparent placeholder:text-gray-400 placeholder:font-light focus:bg-white focus:ring-offset-0 transition-all duration-200 ${
                                      errors.name && touched.name
                                        ? "ring-2 ring-red-400"
                                        : ""
                                    }`}
                                  />
                                )}
                              </Field>
                              <ErrorMessage
                                name="name"
                                component="p"
                                className="text-red-500 text-sm mt-2 ml-2"
                              />
                            </motion.div>
                            {/* Email Field */}
                            <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                              <motion.div variants={fieldVariants}>
                                <Label htmlFor="phone" className="ml-2">
                                  Phone Number
                                </Label>
                                <Field name="phone">
                                  {({ field }: any) => (
                                    <Input
                                      {...field}
                                      id="phone"
                                      type="tel"
                                      placeholder="Enter Your Phone no."
                                      onChange={(e) =>
                                        handlePhoneNumberChange(
                                          e,
                                          setFieldValue
                                        )
                                      }
                                      className={`h-14 px-6 text-lg border-2 bg-gray-50 border-gray-200 rounded-xl focus:ring-2 focus:ring-orange-500 focus:border-transparent placeholder:text-gray-400 placeholder:font-light focus:bg-white focus:ring-offset-0 transition-all duration-200 ${
                                        errors.phone && touched.phone
                                          ? "ring-2 ring-red-400"
                                          : ""
                                      }`}
                                    />
                                  )}
                                </Field>
                                <ErrorMessage
                                  name="phone"
                                  component="p"
                                  className="text-red-500 text-sm mt-2 ml-2"
                                />
                              </motion.div>
                              <motion.div variants={fieldVariants}>
                                <Label htmlFor="email" className="ml-2">
                                  Email
                                </Label>
                                <Field name="email">
                                  {({ field }: any) => (
                                    <Input
                                      {...field}
                                      id="email"
                                      type="email"
                                      placeholder="Xyz@example.com"
                                      className={`h-14 px-6 text-lg border-2 bg-gray-50 border-gray-200 rounded-xl focus:ring-2 focus:ring-orange-500 focus:border-transparent placeholder:text-gray-400 placeholder:font-light focus:bg-white focus:ring-offset-0 transition-all duration-200 ${
                                        errors.email && touched.email
                                          ? "ring-2 ring-red-400"
                                          : ""
                                      }`}
                                    />
                                  )}
                                </Field>
                                <ErrorMessage
                                  name="email"
                                  component="p"
                                  className="text-red-500 text-sm mt-2 ml-2"
                                />
                              </motion.div>
                            </div>

                            {/* Phone Field */}
                            <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                              {/* Age Field */}
                              <motion.div variants={fieldVariants}>
                                <Label htmlFor="age" className="ml-2">
                                  Age
                                </Label>
                                <Field name="age">
                                  {({ field }: any) => (
                                    <Input
                                      {...field}
                                      id="age"
                                      type="text"
                                      placeholder="30"
                                      className={`h-14 px-6 text-lg border-2 bg-gray-50 border-gray-200 rounded-xl focus:ring-2 focus:ring-orange-500 focus:border-transparent placeholder:text-gray-400 placeholder:font-light focus:bg-white focus:ring-offset-0 transition-all duration-200 ${
                                        errors.age && touched.age
                                          ? "ring-2 ring-red-400"
                                          : ""
                                      }`}
                                    />
                                  )}
                                </Field>
                                <ErrorMessage
                                  name="age"
                                  component="p"
                                  className="text-red-500 text-sm mt-2 ml-2"
                                />
                              </motion.div>
                              <motion.div variants={fieldVariants}>
                                <Label htmlFor="gender" className="ml-2">
                                  Gender
                                </Label>
                                <Field name="gender">
                                  {({ field }: any) => (
                                    <Select
                                      onValueChange={(value: any) => {
                                        setFieldValue("gender", value);
                                      }}
                                      value={field.value}
                                    >
                                      <SelectTrigger
                                        id="gender"
                                        className={`w-full h-14 px-6 text-sm border-2 bg-gray-50 border-gray-200 rounded-xl focus:ring-2 focus:ring-orange-500 focus:border-transparent placeholder:text-gray-400 placeholder:font-light focus:bg-white focus:ring-offset-0 transition-all duration-200 ${
                                          errors.gender && touched.gender
                                            ? "ring-2 ring-red-400"
                                            : ""
                                        }`}
                                      >
                                        <SelectValue placeholder="Select gender" />
                                      </SelectTrigger>
                                      <SelectContent className="z-[1000]">
                                        <SelectItem value="Male">
                                          Male
                                        </SelectItem>
                                        <SelectItem value="Female">
                                          Female
                                        </SelectItem>
                                        <SelectItem value="Other">
                                          Other
                                        </SelectItem>
                                      </SelectContent>
                                    </Select>
                                  )}
                                </Field>
                                <ErrorMessage
                                  name="gender"
                                  component="p"
                                  className="text-red-500 text-sm mt-2 ml-2"
                                />
                              </motion.div>
                            </div>
                            {/* Phone Number Field */}

                            {/* New Fields */}
                            <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                              <motion.div variants={fieldVariants}>
                                <Label
                                  htmlFor="currentCompany"
                                  className="ml-2"
                                >
                                  Current Company
                                </Label>
                                <Field name="currentCompany">
                                  {({ field }: any) => (
                                    <Input
                                      {...field}
                                      id="currentCompany"
                                      type="text"
                                      placeholder="e.g., Tech Corp"
                                      className={`h-14 px-6 text-lg border-2 bg-gray-50 border-gray-200 rounded-xl focus:ring-2 focus:ring-orange-500 focus:border-transparent placeholder:text-gray-400 placeholder:font-light focus:bg-white focus:ring-offset-0 transition-all duration-200 ${
                                        errors.currentCompany &&
                                        touched.currentCompany
                                          ? "ring-2 ring-red-400"
                                          : ""
                                      }`}
                                    />
                                  )}
                                </Field>
                                <ErrorMessage
                                  name="currentCompany"
                                  component="p"
                                  className="text-red-500 text-sm mt-2 ml-2"
                                />
                              </motion.div>
                              <motion.div variants={fieldVariants}>
                                <Label
                                  htmlFor="salaryExpectations"
                                  className="ml-2"
                                >
                                  Salary Expectations (LPA)
                                </Label>
                                <Field name="salaryExpectations">
                                  {({ field }: any) => (
                                    <Input
                                      {...field}
                                      id="salaryExpectations"
                                      type="text"
                                      placeholder="e.g., 10 LPA"
                                      className={`h-14 px-6 text-lg border-2 bg-gray-50 border-gray-200 rounded-xl focus:ring-2 focus:ring-orange-500 focus:border-transparent placeholder:text-gray-400 placeholder:font-light focus:bg-white focus:ring-offset-0 transition-all duration-200 ${
                                        errors.salaryExpectations &&
                                        touched.salaryExpectations
                                          ? "ring-2 ring-red-400"
                                          : ""
                                      }`}
                                    />
                                  )}
                                </Field>
                                <ErrorMessage
                                  name="salaryExpectations"
                                  component="p"
                                  className="text-red-500 text-sm mt-2 ml-2"
                                />
                              </motion.div>
                            </div>
                            {/* Questions from Image */}
                            <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                              <motion.div variants={fieldVariants}>
                                <Label htmlFor="startDatePreference" className="ml-2">
                                  How soon would you like to start?
                                </Label>
                                <Field name="startDatePreference">
                                  {({ field }: any) => (
                                    <Select
                                      onValueChange={(value: any) => {
                                        setFieldValue(
                                          "startDatePreference",
                                          value
                                        );
                                      }}
                                      value={field.value}
                                    >
                                      <SelectTrigger
                                        id="startDatePreference"
                                        className={`w-full h-14 px-6 text-sm border-2 bg-gray-50 border-gray-200 rounded-xl focus:ring-2 focus:ring-orange-500 focus:border-transparent placeholder:text-gray-400 placeholder:font-light focus:bg-white focus:ring-offset-0 transition-all duration-200 ${
                                          errors.startDatePreference &&
                                          touched.startDatePreference
                                            ? "ring-2 ring-red-400"
                                            : ""
                                        }`}
                                      >
                                        <SelectValue placeholder="Select start date preference" />
                                      </SelectTrigger>
                                     <SelectContent className="z-[1000]">
                                        <SelectItem value="Within 15 days or less">
                                          Within 15 days or less
                                        </SelectItem>
                                        <SelectItem value="Within 30 days">
                                          Within 30 days
                                        </SelectItem>
                                        <SelectItem value="Within 45 days">
                                          Within 45 days
                                        </SelectItem>
                                        <SelectItem value="Within 60 days">
                                          Within 60 days
                                        </SelectItem>
                                      </SelectContent>
                                    </Select>
                                  )}
                                </Field>
                                <ErrorMessage
                                  name="startDatePreference"
                                  component="p"
                                  className="text-red-500 text-sm mt-2 ml-2"
                                />
                              </motion.div>
                              <motion.div variants={fieldVariants}>
                                <Label htmlFor="previouslyApplied" className="ml-2">
                                  Have you previously applied?
                                </Label>
                                <Field name="previouslyApplied">
                                  {({ field }: any) => (
                                    <Select
                                      onValueChange={(value: any) => {
                                        setFieldValue(
                                          "previouslyApplied",
                                          value
                                        );
                                      }}
                                      value={field.value}
                                    >
                                      <SelectTrigger
                                        id="previouslyApplied"
                                        className={`w-full h-14 px-6 text-sm border-2 bg-gray-50 border-gray-200 rounded-xl focus:ring-2 focus:ring-orange-500 focus:border-transparent placeholder:text-gray-400 placeholder:font-light focus:bg-white focus:ring-offset-0 transition-all duration-200 ${
                                          errors.previouslyApplied &&
                                          touched.previouslyApplied
                                            ? "ring-2 ring-red-400"
                                            : ""
                                        }`}
                                      >
                                        <SelectValue placeholder="Select status" />
                                      </SelectTrigger>
                                      <SelectContent className="z-[1000]">
                                        <SelectItem value="Yes, in last 30 days or less">
                                          Yes, in last 30 days or less
                                        </SelectItem>
                                        <SelectItem value="Yes, in last 3 months">
                                          Yes, in last 3 months
                                        </SelectItem>
                                        <SelectItem value="Yes, in last 6 months">
                                          Yes, in last 6 months
                                        </SelectItem>
                                        <SelectItem value="No">No</SelectItem>
                                      </SelectContent>
                                    </Select>
                                  )}
                                </Field>
                                <ErrorMessage
                                  name="previouslyApplied"
                                  component="p"
                                  className="text-red-500 text-sm mt-2 ml-2"
                                />
                              </motion.div>
                            </div>
                            {/* Modern Resume Upload Field */}
                            <motion.div variants={fieldVariants}>
                              <Label htmlFor="resume" className="ml-2">Upload Resume</Label>
                              <div
                                className={`relative border-2 border-dashed rounded-xl p-8 text-center transition-all duration-300 ${
                                  dragState.isDragOver
                                    ? "border-orange-500 bg-orange-50"
                                    : "border-gray-300 bg-gray-50 hover:border-gray-400"
                                } ${
                                  errors.resume && touched.resume
                                    ? "border-red-400"
                                    : ""
                                }`}
                                onDragOver={handleDragOver}
                                onDragLeave={handleDragLeave}
                                onDrop={(e) =>
                                  handleDrop(e, setFieldValue, setFieldError)
                                }
                              >
                                <input
                                  id="resume"
                                  type="file"
                                  accept=".pdf,.docx,.doc,.jpg,.jpeg,.png,.webp"
                                  onChange={(e) =>
                                    handleFileChange(
                                      e,
                                      setFieldValue,
                                      setFieldError
                                    )
                                  }
                                  ref={fileInputRef}
                                  className="absolute inset-0 w-full h-full opacity-0 cursor-pointer"
                                />

                                {!uploadedFile ? (
                                  <div className="space-y-4">
                                    <div className="w-16 h-16 bg-gradient-to-br from-orange-500 to-red-600 rounded-full flex items-center justify-center mx-auto">
                                      <FileText className="w-8 h-8 text-white" />
                                    </div>
                                    <div>
                                      <h3 className="text-lg font-semibold text-gray-900 mb-2">
                                        Drop your resume here
                                      </h3>
                                      <p className="text-gray-500 text-sm mb-4">
                                        or click to browse files
                                      </p>
                                      <div className="flex flex-wrap justify-center gap-2 text-xs text-gray-400">
                                        <span className="px-2 py-1 bg-white rounded-full">
                                          PDF
                                        </span>
                                        <span className="px-2 py-1 bg-white rounded-full">
                                          DOCX
                                        </span>
                                        <span className="px-2 py-1 bg-white rounded-full">
                                          JPG
                                        </span>
                                        <span className="px-2 py-1 bg-white rounded-full">
                                          PNG
                                        </span>
                                        <span className="px-2 py-1 bg-white rounded-full">
                                          Max 10MB
                                        </span>
                                      </div>
                                    </div>
                                  </div>
                                ) : (
                                  <div className="space-y-4">
                                    <div className="w-16 h-16 bg-green-100 rounded-full flex items-center justify-center mx-auto">
                                      <FileText className="w-8 h-8 text-green-600" />
                                    </div>
                                    <div>
                                      <h3 className="text-lg font-semibold text-gray-900 mb-2">
                                        File uploaded successfully!
                                      </h3>
                                      <p className="text-gray-500 text-sm mb-2">
                                        {uploadedFile.name}
                                      </p>
                                      <p className="text-xs text-gray-400">
                                        {(
                                          uploadedFile.size /
                                          1024 /
                                          1024
                                        ).toFixed(2)}{" "}
                                        MB
                                      </p>
                                      <button
                                        type="button"
                                        onClick={() => {
                                          setFieldValue("resume", null);
                                          setFilePreviewUrl(null);
                                          setUploadedFile(null);
                                          if (fileInputRef.current) {
                                            fileInputRef.current.value = "";
                                          }
                                        }}
                                        className="mt-3 text-sm text-red-500 hover:text-red-700 underline"
                                      >
                                        Remove file
                                      </button>
                                    </div>
                                  </div>
                                )}
                              </div>
                              <ErrorMessage
                                name="resume"
                                component="p"
                                className="text-red-500 text-sm mt-2 ml-2"
                              />
                              {filePreviewUrl && uploadedFile && (
                                <div className="mt-4 border rounded-xl p-4 bg-gray-50">
                                  <div className="flex items-center justify-between mb-3">
                                    <p className="text-sm font-medium flex items-center">
                                      <FileText className="h-4 w-4 mr-2 text-gray-600" />
                                      <span>Preview: {uploadedFile.name}</span>
                                    </p>
                                  </div>
                                  {uploadedFile.type === "application/pdf" ? (
                                    <div className="aspect-video w-full max-h-60 overflow-hidden rounded-lg border">
                                      <iframe
                                        src={filePreviewUrl}
                                        className="w-full h-full border-none"
                                        title="File Preview"
                                      />
                                    </div>
                                  ) : uploadedFile.type.startsWith("image/") ? (
                                    <div className="aspect-video w-full max-h-60 overflow-hidden rounded-lg border">
                                      <img
                                        src={filePreviewUrl}
                                        alt="File preview"
                                        className="w-full h-full object-contain"
                                      />
                                    </div>
                                  ) : (
                                    <div className="aspect-video w-full max-h-60 overflow-hidden rounded-lg border bg-gray-100 flex items-center justify-center">
                                      <div className="text-center">
                                        <FileText className="w-12 h-12 text-gray-400 mx-auto mb-2" />
                                        <p className="text-sm text-gray-500">
                                          Preview not available for this file
                                          type
                                        </p>
                                        <p className="text-xs text-gray-400 mt-1">
                                          {uploadedFile.name}
                                        </p>
                                      </div>
                                    </div>
                                  )}
                                </div>
                              )}
                            </motion.div>
                            {/* Submit Button */}
                            <motion.div
                              variants={fieldVariants}
                              className="py-2"
                            >
                              <Button
                                type="submit"
                                className="w-full h-14 bg-gradient-to-r bg-brand-color hover:bg-brand-color text-white text-lg font-semibold rounded-2xl shadow-lg hover:shadow-xl transition-all duration-200 border-0"
                                disabled={isSubmitting}
                              >
                                {isSubmitting ? (
                                  <div className="flex items-center gap-3 justify-center">
                                    <Loader2 className="w-5 h-5 animate-spin" />
                                    Submitting Application...
                                  </div>
                                ) : (
                                  <div className="flex items-center gap-3 justify-center">
                                    <Send className="w-5 h-5" />
                                    Submit Application
                                  </div>
                                )}
                              </Button>
                            </motion.div>
                          </Form>
                        </motion.div>
                      )}
                    </Formik>
                  )}
                </AnimatePresence>
              </div>
            </CardContent>
          </Card>
        </DialogContent>
      </Dialog>
      {/* Removed ApplicationSuccessModal from here, it's now managed by JobDetailsModal */}
    </>
  );
}

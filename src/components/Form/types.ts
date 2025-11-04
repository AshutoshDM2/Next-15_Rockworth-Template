/* eslint-disable @typescript-eslint/no-explicit-any */
// Form field types
export interface FormFieldProps {
  name: string;
  label: string;
  type?: string;
  as?: string;
  rows?: number;
  placeholder?: string;
  required?: boolean;
  className?: string;
}

// API types
export interface ContactFormData {
  contact_name: "";
  customer_name: "";
  email: string;
  phone: string;
  location: string;
  message: string;
}

export interface ApiResponse<T = any> {
  success: boolean;
  message: string;
  data?: T;
  errors?: Record<string, string[]>;
}

export interface ValidationError {
  field: string;
  message: string;
}

// Form state types
export type SubmitStatus = "idle" | "loading" | "success" | "error";

export interface FormState {
  status: SubmitStatus;
  message: string;
}

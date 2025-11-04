export interface NewsletterFormData {
  name: string;
  email: string;
}

export interface NewsletterModalProps {
  isOpen: boolean;
  onClose: () => void;
  title?: string;
  description?: string;
  buttonText?: string;
  successTitle?: string;
  successMessage?: string;
  onSubmit?: (
    data: NewsletterFormData
  ) => Promise<{ success: boolean; message?: string }>;
  className?: string;
}

export interface NewsletterState {
  isSubmitting: boolean;
  isSuccess: boolean;
  error: string | null;
}

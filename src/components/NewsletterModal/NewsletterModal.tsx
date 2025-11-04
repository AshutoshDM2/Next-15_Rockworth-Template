/* eslint-disable react-hooks/exhaustive-deps */
"use client";

import type React from "react";
import { useEffect } from "react";
import { CheckCircle, Mail, X } from "lucide-react";
import { useNewsletter } from "@/hooks/NewsLetter";
import { NewsletterModalProps } from "@/types/newsletter";
import { Dialog, DialogContent, DialogOverlay } from "../ui/Dialog/Dialog";
import { Input } from "../ui/Input/Input";
import { Button } from "../ui/Button/Button";

const defaultProps = {
  title: "Stay in the Loop",
  description:
    "Get exclusive insights on workspace innovation, product launches, and industry trends delivered to your inbox.",
  buttonText: "Subscribe Now",
  successTitle: "Welcome Aboard!",
  successMessage:
    "Thank you for subscribing! You'll receive our next newsletter with the latest updates.",
};

export function NewsletterModal({
  isOpen,
  onClose,
  title = defaultProps.title,
  description = defaultProps.description,
  buttonText = defaultProps.buttonText,
  successTitle = defaultProps.successTitle,
  successMessage = defaultProps.successMessage,
  onSubmit,
  className = "",
}: NewsletterModalProps) {
  const { formData, state, updateField, resetForm, submitForm } =
    useNewsletter();

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    await submitForm(onSubmit);
  };

  const handleClose = () => {
    resetForm();
    onClose();
  };

  // Auto-close after success
  useEffect(() => {
    if (state.isSuccess) {
      const timer = setTimeout(() => {
        handleClose();
      }, 3000);
      return () => clearTimeout(timer);
    }
  }, [state.isSuccess]);

  return (
    <Dialog open={isOpen} onOpenChange={handleClose}>
      <DialogOverlay className="bg-black/30 backdrop-blur-sm" />
      <DialogContent
        className={`max-w-md w-full p-0 bg-white border-none shadow-2xl rounded-2xl overflow-hidden ${className}`}
        onPointerDownOutside={(e) => e.preventDefault()}
      >
        <div className="relative">
          {/* Close Button */}
          <button
            onClick={handleClose}
            className="absolute top-6 right-6 z-20 w-10 h-10 bg-white backdrop-blur-md rounded-full flex items-center justify-center text-black transition-all duration-200 shadow-xl hover:shadow-xl"
            aria-label="Close dialog"
          >
            <X className="w-5 h-5" />
          </button>

          <div className="relative p-8 lg:p-10">
            {!state.isSuccess ? (
              <>
                {/* Enhanced Header */}
                <div className="text-center mb-8">
                  <div className="relative mb-2 ">
                    <div className="w-14 h-12 lg:h-14 bg-gradient-to-br from-brand-color to-brand-color rounded-full flex items-center justify-center mx-auto shadow-xl">
                      <Mail className="w-8 h-8 text-white" />
                    </div>
                    {/* Decorative rings */}
                    <div className="absolute inset-0 w-14 h-12 lg:h-14 mx-auto rounded-full border-2 border-orange-200 animate-ping" />
                    <div className="absolute inset-0 w-14 h-12 lg:h-14 mx-auto rounded-full border border-orange-300 opacity-30" />
                  </div>
                  <h2 className="text-xl font-bold text-black mb-3">{title}</h2>
                  <p className="text-sm text-gray-500 leading-relaxed max-w-md mx-auto">
                    {description}
                  </p>
                </div>

                {/* Enhanced Form */}
                <form onSubmit={handleSubmit} className="space-y-5">
                  <div className="space-y-4">
                    <div className="relative">
                      <Input
                        type="text"
                        placeholder="Enter your full name"
                        value={formData.name}
                        onChange={(e) => updateField("name", e.target.value)}
                        required
                        disabled={state.isSubmitting}
                        className="w-full h-12 lg:h-14 px-5 border-2 border-gray-200 rounded-xl focus:ring-2 focus:ring-brand-color focus:border-none transition-all duration-200 disabled:opacity-50 text-base placeholder:text-gray-400 placeholder:font-light"
                        aria-label="Your full name"
                      />
                    </div>
                    <div className="relative">
                      <Input
                        type="email"
                        placeholder="Enter your email address"
                        value={formData.email}
                        onChange={(e) => updateField("email", e.target.value)}
                        required
                        disabled={state.isSubmitting}
                        className="w-full h-12 lg:h-14 px-5 border-2 border-gray-200 rounded-xl focus:ring-2 focus:ring-brand-color focus:border-none transition-all duration-200 disabled:opacity-50 text-base placeholder:text-gray-400 placeholder:font-light"
                        aria-label="Your email address"
                      />
                    </div>
                  </div>

                  {/* Enhanced Error Message */}
                  {state.error && (
                    <div className="p-4 bg-red-50 border-l-4 border-red-400 rounded-lg">
                      <div className="flex">
                        <div className="flex-shrink-0">
                          <svg
                            className="h-5 w-5 text-red-400"
                            viewBox="0 0 20 20"
                            fill="currentColor"
                          >
                            <path
                              fillRule="evenodd"
                              d="M10 18a8 8 0 100-16 8 8 0 000 16zM8.707 7.293a1 1 0 00-1.414 1.414L8.586 10l-1.293 1.293a1 1 0 101.414 1.414L10 11.414l1.293 1.293a1 1 0 001.414-1.414L11.414 10l1.293-1.293a1 1 0 00-1.414-1.414L10 8.586 8.707 7.293z"
                              clipRule="evenodd"
                            />
                          </svg>
                        </div>
                        <div className="ml-3">
                          <p className="text-red-700 text-sm font-medium">
                            {state.error}
                          </p>
                        </div>
                      </div>
                    </div>
                  )}

                  <Button
                    type="submit"
                    disabled={state.isSubmitting}
                    className="w-full h-12 lg:h-14 bg-gradient-to-r from-brand-color to-brand-color hover:from-brand-color hover:to-orange-700 text-white font-semibold rounded-xl transition-all duration-300 transform hover:scale-[1.02] hover:shadow-lg disabled:opacity-50 disabled:cursor-not-allowed disabled:transform-none text-base"
                  >
                    {state.isSubmitting ? (
                      <div className="flex items-center justify-center gap-3">
                        <div className="w-5 h-5 border-2 border-white border-t-transparent rounded-full animate-spin" />
                        <span>Subscribing...</span>
                      </div>
                    ) : (
                      <span className="flex items-center justify-center gap-2">
                        <Mail className="w-5 h-5" />
                        {buttonText}
                      </span>
                    )}
                  </Button>
                </form>

                {/* Enhanced Footer */}
                <div className="mt-6 pt-6 border-t border-gray-100">
                  <p className="text-xs text-gray-500 text-center leading-relaxed">
                    🔒 We respect your privacy. Unsubscribe at any time.
                    <br />
                    No spam, just valuable insights delivered quarterly.
                  </p>
                </div>
              </>
            ) : (
              /* Enhanced Success State */
              <div className="text-center py-8">
                <div className="relative mb-6">
                  <div className="w-20 h-20 bg-green-100 rounded-full flex items-center justify-center mx-auto">
                    <CheckCircle className="w-12 h-12 text-green-600" />
                  </div>
                  {/* Success animation rings */}
                  <div className="absolute inset-0 w-20 h-20 mx-auto rounded-full border-2 border-green-200 animate-ping" />
                </div>
                <h2 className="text-3xl font-bold text-black mb-3">
                  {successTitle}
                </h2>
                <p className="text-gray-500 leading-relaxed max-w-md mx-auto mb-6">
                  {successMessage}
                </p>

                {/* Success details */}
                <div className="bg-green-50 rounded-xl p-4 border border-green-200">
                  <p className="text-green-800 text-sm font-medium">
                    ✨ Subscription confirmed for:{" "}
                    <span className="font-semibold">{formData.email}</span>
                  </p>
                  <p className="text-green-700 text-xs mt-1">
                    Check your inbox for a welcome message!
                  </p>
                </div>
              </div>
            )}
          </div>
        </div>
      </DialogContent>
    </Dialog>
  );
}

"use client";

import type React from "react";

import { useState } from "react";
import { X, Mail, Lock, Phone, Eye, EyeOff, ArrowLeft } from "lucide-react";
import { cn } from "@/lib/utils";

interface LoginModalProps {
  isOpen: boolean;
  onClose: () => void;
}

type AuthMode = "email" | "phone";
type PhoneStep = "enter-phone" | "enter-otp";

export function LoginModal({ isOpen, onClose }: LoginModalProps) {
  const [authMode, setAuthMode] = useState<AuthMode>("email");
  const [phoneStep, setPhoneStep] = useState<PhoneStep>("enter-phone");
  const [showPassword, setShowPassword] = useState(false);
  const [isLoading, setIsLoading] = useState(false);
  const [otpValues, setOtpValues] = useState(["", "", "", "", "", ""]);
  const [formData, setFormData] = useState({
    email: "",
    phone: "",
    password: "",
  });

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setIsLoading(true);

    if (authMode === "phone" && phoneStep === "enter-phone") {
      // Send OTP
      await new Promise((resolve) => setTimeout(resolve, 1500));
      setPhoneStep("enter-otp");
      setIsLoading(false);
      return;
    }

    // Simulate API call for login
    await new Promise((resolve) => setTimeout(resolve, 2000));

    setIsLoading(false);
    // Handle authentication logic here
    console.log("Authentication attempt:", {
      authMode,
      formData,
      otp: otpValues.join(""),
    });
  };

  const handleSocialLogin = (provider: string) => {
    console.log(`Login with ${provider}`);
    // Handle social login logic here
  };

  const handleOtpChange = (index: number, value: string) => {
    if (value.length > 1) return; // Prevent multiple characters

    const newOtpValues = [...otpValues];
    newOtpValues[index] = value;

    setOtpValues(newOtpValues);

    // Auto-focus next input
    if (value && index < 5) {
      const nextInput = document.getElementById(`otp-${index + 1}`);
      nextInput?.focus();
    }
  };

  const handleOtpKeyDown = (index: number, e: React.KeyboardEvent) => {
    if (e.key === "Backspace" && !otpValues[index] && index > 0) {
      const prevInput = document.getElementById(`otp-${index - 1}`);
      prevInput?.focus();
    }
  };

  const handleOtpPaste = (e: React.ClipboardEvent) => {
    e.preventDefault();
    const pastedData = e.clipboardData.getData("text").slice(0, 6);
    const newOtpValues = [...otpValues];

    for (let i = 0; i < pastedData.length && i < 6; i++) {
      if (/^\d$/.test(pastedData[i])) {
        newOtpValues[i] = pastedData[i];
      }
    }

    setOtpValues(newOtpValues);
  };

  const handleBackToPhone = () => {
    setPhoneStep("enter-phone");
    setOtpValues(["", "", "", "", "", ""]);
  };

  const resetModal = () => {
    setAuthMode("email");
    setPhoneStep("enter-phone");
    setOtpValues(["", "", "", "", "", ""]);
    setFormData({ email: "", phone: "", password: "" });
    setShowPassword(false);
    setIsLoading(false);
  };

  const handleClose = () => {
    resetModal();
    onClose();
  };

  if (!isOpen) return null;

  const isOtpComplete = otpValues.every((value) => value !== "");

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center">
      {/* Backdrop */}
      <div
        className="absolute inset-0 bg-black/50 backdrop-blur-sm"
        onClick={handleClose}
      />

      {/* Modal */}
      <div className="relative bg-white rounded-2xl shadow-2xl w-full max-w-md mx-4 overflow-hidden">
        {/* Header */}
        <div className="flex items-center justify-between p-6 border-b border-gray-100">
          <div className="flex items-center">
            {authMode === "phone" && phoneStep === "enter-otp" && (
              <button
                onClick={handleBackToPhone}
                className="p-1 rounded-full text-gray-400 hover:text-gray-600 hover:bg-gray-100 transition-all duration-200 mr-3"
              >
                <ArrowLeft className="w-5 h-5" />
              </button>
            )}
            <h2 className="text-2xl font-bold text-gray-900">
              {authMode === "phone" && phoneStep === "enter-otp"
                ? "Enter OTP"
                : "Login"}
            </h2>
          </div>
          <button
            onClick={handleClose}
            className="p-2 rounded-full text-gray-400 hover:text-gray-600 hover:bg-gray-100 transition-all duration-200"
          >
            <X className="w-5 h-5" />
          </button>
        </div>

        {/* Auth Mode Tabs - Hide when in OTP step */}
        {!(authMode === "phone" && phoneStep === "enter-otp") && (
          <div className="flex border-b border-gray-100">
            {[
              { mode: "email" as AuthMode, label: "Email", icon: Mail },
              { mode: "phone" as AuthMode, label: "Phone", icon: Phone },
            ].map(({ mode, label, icon: Icon }) => (
              <button
                key={mode}
                onClick={() => {
                  setAuthMode(mode);
                  setPhoneStep("enter-phone");
                }}
                className={cn(
                  "flex-1 flex items-center justify-center py-3 px-4 text-sm font-medium transition-all duration-200",
                  authMode === mode
                    ? "text-brand-color border-b-2 border-brand-color bg-orange-50"
                    : "text-gray-500 hover:text-gray-700 hover:bg-gray-50"
                )}
              >
                <Icon className="w-4 h-4 mr-2" />
                {label}
              </button>
            ))}
          </div>
        )}

        {/* Form Content */}
        <div className="p-6">
          <form onSubmit={handleSubmit} className="space-y-4">
            {/* Email Login */}
            {authMode === "email" && (
              <>
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-2">
                    Email Address
                  </label>
                  <div className="relative">
                    <Mail className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400 w-5 h-5" />
                    <input
                      type="email"
                      value={formData.email}
                      onChange={(e) =>
                        setFormData({ ...formData, email: e.target.value })
                      }
                      className="w-full pl-10 pr-4 py-3 border border-brand-color rounded-xl  focus:border-transparent transition-all duration-200"
                      placeholder="Enter your email"
                      required
                    />
                  </div>
                </div>
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-2">
                    Password
                  </label>
                  <div className="relative">
                    <Lock className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400 w-5 h-5" />
                    <input
                      type={showPassword ? "text" : "password"}
                      value={formData.password}
                      onChange={(e) =>
                        setFormData({ ...formData, password: e.target.value })
                      }
                      className="w-full pl-10 pr-12 py-3 border border-gray-300 rounded-xl focus:ring-2 focus:ring-brand-color focus:border-transparent transition-all duration-200"
                      placeholder="Enter your password"
                      required
                    />
                    <button
                      type="button"
                      onClick={() => setShowPassword(!showPassword)}
                      className="absolute right-3 top-1/2 transform -translate-y-1/2 text-gray-400 hover:text-gray-600"
                    >
                      {showPassword ? (
                        <EyeOff className="w-5 h-5" />
                      ) : (
                        <Eye className="w-5 h-5" />
                      )}
                    </button>
                  </div>
                </div>
              </>
            )}

            {/* Phone Login - Enter Phone */}
            {authMode === "phone" && phoneStep === "enter-phone" && (
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-2">
                  Phone Number
                </label>
                <div className="relative">
                  <Phone className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400 w-5 h-5" />
                  <input
                    type="tel"
                    value={formData.phone}
                    onChange={(e) =>
                      setFormData({ ...formData, phone: e.target.value })
                    }
                    className="w-full pl-10 pr-4 py-3 border border-gray-300 rounded-xl focus:ring-2 focus:ring-brand-color focus:border-transparent transition-all duration-200"
                    placeholder="+1 (555) 000-0000"
                    required
                  />
                </div>
              </div>
            )}

            {/* Phone Login - Enter OTP */}
            {authMode === "phone" && phoneStep === "enter-otp" && (
              <div className="space-y-4">
                <div className="text-center">
                  <p className="text-sm text-gray-600 mb-2">
                    We&apos;ve sent a 6-digit code to
                  </p>
                  <p className="font-medium text-gray-900">{formData.phone}</p>
                </div>

                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-4 text-center">
                    Enter OTP
                  </label>
                  <div
                    className="flex justify-center space-x-3"
                    onPaste={handleOtpPaste}
                  >
                    {otpValues.map((value, index) => (
                      <input
                        key={index}
                        id={`otp-${index}`}
                        type="text"
                        inputMode="numeric"
                        pattern="[0-9]"
                        maxLength={1}
                        value={value}
                        onChange={(e) => handleOtpChange(index, e.target.value)}
                        onKeyDown={(e) => handleOtpKeyDown(index, e)}
                        className={cn(
                          "w-12 h-12 text-center text-lg font-bold border-2 rounded-xl transition-all duration-300",
                          "focus:ring-2 focus:ring-brand-color focus:border-brand-color focus:scale-110",
                          value
                            ? "border-brand-color bg-orange-50 text-brand-color animate-pulse"
                            : "border-gray-300 hover:border-gray-400"
                        )}
                      />
                    ))}
                  </div>
                </div>

                {/* OTP Progress Bar */}
                <div className="w-full bg-gray-200 rounded-full h-1">
                  <div
                    className="bg-brand-color h-1 rounded-full transition-all duration-500 ease-out"
                    style={{
                      width: `${
                        (otpValues.filter((v) => v).length / 6) * 100
                      }%`,
                    }}
                  />
                </div>

                <div className="text-center">
                  <p className="text-sm text-gray-500 mb-2">
                    Didn&apos;t receive the code?
                  </p>
                  <button
                    type="button"
                    className="text-sm text-brand-color hover:underline font-medium"
                    onClick={() => {
                      // Resend OTP logic
                      console.log("Resending OTP...");
                    }}
                  >
                    Resend OTP
                  </button>
                </div>
              </div>
            )}

            {/* Submit Button */}
            <button
              type="submit"
              disabled={
                isLoading ||
                (authMode === "phone" &&
                  phoneStep === "enter-otp" &&
                  !isOtpComplete)
              }
              className={cn(
                "w-full py-3 px-4 rounded-xl font-medium transition-all duration-200",
                "bg-brand-color text-white hover:bg-orange-600 focus:ring-2 focus:ring-brand-color focus:ring-offset-2",
                (isLoading ||
                  (authMode === "phone" &&
                    phoneStep === "enter-otp" &&
                    !isOtpComplete)) &&
                  "opacity-50 cursor-not-allowed"
              )}
            >
              {isLoading ? (
                <div className="flex items-center justify-center">
                  <div className="w-5 h-5 border-2 border-white border-t-transparent rounded-full animate-spin mr-2" />
                  {authMode === "phone" && phoneStep === "enter-phone"
                    ? "Sending OTP..."
                    : "Signing In..."}
                </div>
              ) : (
                <>
                  {authMode === "email" && "Sign In with Email"}
                  {authMode === "phone" &&
                    phoneStep === "enter-phone" &&
                    "Send OTP"}
                  {authMode === "phone" &&
                    phoneStep === "enter-otp" &&
                    "Verify & Sign In"}
                </>
              )}
            </button>
          </form>

          {/* Social Login - Hide during OTP step */}
          {!(authMode === "phone" && phoneStep === "enter-otp") && (
            <>
              {/* Divider */}
              <div className="relative my-6">
                <div className="absolute inset-0 flex items-center">
                  <div className="w-full border-t border-gray-300" />
                </div>
                <div className="relative flex justify-center text-sm">
                  <span className="px-2 bg-white text-gray-500">
                    Or continue with
                  </span>
                </div>
              </div>

              {/* Social Login Buttons */}
              <div className="grid grid-cols-2 gap-3">
                <button
                  onClick={() => handleSocialLogin("google")}
                  className="flex items-center justify-center py-3 px-4 border border-gray-300 rounded-xl hover:bg-gray-50 transition-all duration-200"
                >
                  <svg className="w-5 h-5 mr-2" viewBox="0 0 24 24">
                    <path
                      fill="#4285F4"
                      d="M22.56 12.25c0-.78-.07-1.53-.2-2.25H12v4.26h5.92c-.26 1.37-1.04 2.53-2.21 3.31v2.77h3.57c2.08-1.92 3.28-4.74 3.28-8.09z"
                    />
                    <path
                      fill="#34A853"
                      d="M12 23c2.97 0 5.46-.98 7.28-2.66l-3.57-2.77c-.98.66-2.23 1.06-3.71 1.06-2.86 0-5.29-1.93-6.16-4.53H2.18v2.84C3.99 20.53 7.7 23 12 23z"
                    />
                    <path
                      fill="#FBBC05"
                      d="M5.84 14.09c-.22-.66-.35-1.36-.35-2.09s.13-1.43.35-2.09V7.07H2.18C1.43 8.55 1 10.22 1 12s.43 3.45 1.18 4.93l2.85-2.22.81-.62z"
                    />
                    <path
                      fill="#EA4335"
                      d="M12 5.38c1.62 0 3.06.56 4.21 1.64l3.15-3.15C17.45 2.09 14.97 1 12 1 7.7 1 3.99 3.47 2.18 7.07l3.66 2.84c.87-2.6 3.3-4.53 6.16-4.53z"
                    />
                  </svg>
                  Google
                </button>
                <button
                  onClick={() => handleSocialLogin("apple")}
                  className="flex items-center justify-center py-3 px-4 border border-gray-300 rounded-xl hover:bg-gray-50 transition-all duration-200"
                >
                  <svg
                    className="w-5 h-5 mr-2"
                    viewBox="0 0 24 24"
                    fill="currentColor"
                  >
                    <path d="M18.71 19.5c-.83 1.24-1.71 2.45-3.05 2.47-1.34.03-1.77-.79-3.29-.79-1.53 0-2 .77-3.27.82-1.31.05-2.3-1.32-3.14-2.53C4.25 17 2.94 12.45 4.7 9.39c.87-1.52 2.43-2.48 4.12-2.51 1.28-.02 2.5.87 3.29.87.78 0 2.26-1.07 3.81-.91.65.03 2.47.26 3.64 1.98-.09.06-2.17 1.28-2.15 3.81.03 3.02 2.65 4.03 2.68 4.04-.03.07-.42 1.44-1.38 2.83M13 3.5c.73-.83 1.94-1.46 2.94-1.5.13 1.17-.34 2.35-1.04 3.19-.69.85-1.83 1.51-2.95 1.42-.15-1.15.41-2.35 1.05-3.11z" />
                  </svg>
                  Apple
                </button>
              </div>
            </>
          )}

          {/* Footer Links - Hide during OTP step */}
          {!(authMode === "phone" && phoneStep === "enter-otp") && (
            <div className="mt-6 text-center space-y-2">
              <button className="text-sm text-brand-color hover:underline">
                Forgot your password?
              </button>
              <p className="text-sm text-gray-500">
                Don&apos;t have an account?{" "}
                <button className="text-brand-color hover:underline font-medium">
                  Sign up
                </button>
              </p>
            </div>
          )}
        </div>
      </div>
    </div>
  );
}

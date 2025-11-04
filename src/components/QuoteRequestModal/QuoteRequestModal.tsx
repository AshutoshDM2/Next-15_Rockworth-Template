/* eslint-disable @typescript-eslint/no-explicit-any */
"use client";

import { Button } from "@/components/ui/Button/Button";
import { Card, CardContent } from "@/components/ui/Card/Card";
import {
  Dialog,
  DialogContent,
  DialogOverlay,
} from "@/components/ui/Dialog/Dialog";
import { Input } from "@/components/ui/Input/Input";
import {
  fieldVariants,
  formVariants,
  initialValues,
  useQuoteRequest,
  validationSchema,
} from "@/hooks/useQuoteRequest";
import { ErrorMessage, Field, FieldProps, Form, Formik } from "formik";
import { AnimatePresence, motion } from "framer-motion";
import { FileText, Send, X } from "lucide-react";
import { SuccessModal } from "../SuccessModal/SuccessModal";
import { Textarea } from "../ui/TextArea/TextArea";

interface QuoteRequestData {
  contact_name: string;
  customer_name: string;
  phoneNo: string;
  cityState: string;
  requirements: string;
}

interface QuoteRequestModalProps {
  isOpen: boolean;
  onClose: () => void;
  onSubmit?: (data: QuoteRequestData) => void;
}

export default function QuoteRequestModal({
  isOpen,
  onClose,
  onSubmit,
}: QuoteRequestModalProps) {
  const {
    showSuccessModal,
    setShowSuccessModal,
    handleSubmit,
    handlePhoneNumberChange,
  } = useQuoteRequest(onClose, onSubmit);

  return (
    <>
      <Dialog open={isOpen} onOpenChange={onClose}>
        <DialogOverlay className="bg-black/30 backdrop-blur-sm" />
        <DialogContent className="sm:max-w-[480px] p-0 overflow-hidden border-0 bg-white rounded-3xl shadow-2xl z-[1000] -mt-4">
          <Card className="border-0 shadow-none bg-white">
            <CardContent className="p-0">
              {/* Close Button */}
              <button
                onClick={onClose}
                className="absolute top-6 right-6 z-10 p-2 hover:bg-gray-100 rounded-full transition-colors"
              >
                <X className="w-5 h-5 text-gray-500" />
              </button>

              <div className="px-8 py-2">
                {/* Header with Icon */}
                <div className="text-center mb-4">
                  <div className="w-10 h-10 bg-gradient-to-br from-orange-500 to-red-600 rounded-full flex items-center justify-center mx-auto my-2 shadow-lg">
                    <FileText className="w-6 h-6 text-white" />
                  </div>
                  <h2 className="text-xl font-bold text-black mb-3">
                    Get Your Quote
                  </h2>
                  <p className="text-gray-500 text-sm leading-relaxed max-w-sm mx-auto">
                    Tell us about your project and we&apos;ll provide you with a
                    personalized quote within 24 hours.
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
                      {({ isSubmitting, errors, touched, setFieldValue }) => (
                        <motion.div
                          variants={formVariants}
                          initial="hidden"
                          animate="visible"
                        >
                          <Form className="space-y-4">
                            {/* Name Field */}
                            <motion.div variants={fieldVariants}>
                              <Field name="contact_name">
                                {({ field }: FieldProps) => (
                                  <Input
                                    {...field}
                                    id="contact_name"
                                    type="text"
                                    placeholder="Enter your full name"
                                    className={`h-12 lg:h-14 px-6 text-lg border-2 bg-gray-50 border-gray-200 rounded-xl focus:ring-2 focus:ring-orange-500 focus:border-transparent placeholder:text-gray-400 placeholder:font-light focus:bg-white focus:ring-offset-0 transition-all duration-200 ${
                                      errors.contact_name &&
                                      touched.contact_name
                                        ? "ring-2 ring-red-400"
                                        : ""
                                    }`}
                                  />
                                )}
                              </Field>
                              <ErrorMessage
                                name="contact_name"
                                component="p"
                                className="text-red-500 text-sm mt-2 ml-2"
                              />
                            </motion.div>

                            {/* Company Name Field */}
                            <motion.div variants={fieldVariants}>
                              <Field name="customer_name">
                                {({ field }: FieldProps) => (
                                  <Input
                                    {...field}
                                    id="customer_name"
                                    type="text"
                                    placeholder="Enter your company name"
                                    className={`h-12 lg:h-14 px-6 text-lg border-2 bg-gray-50 border-gray-200 rounded-xl focus:ring-2 focus:ring-orange-500 focus:border-transparent placeholder:text-gray-400 placeholder:font-light focus:bg-white focus:ring-offset-0 transition-all duration-200 ${
                                      errors.customer_name &&
                                      touched.customer_name
                                        ? "ring-2 ring-red-400"
                                        : ""
                                    }`}
                                  />
                                )}
                              </Field>
                              <ErrorMessage
                                name="customer_name"
                                component="p"
                                className="text-red-500 text-sm mt-2 ml-2"
                              />
                            </motion.div>

                            {/* Phone and Location Row */}
                            <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                              <motion.div variants={fieldVariants}>
                                <Field name="phoneNo">
                                  {({ field }: FieldProps) => (
                                    <Input
                                      {...field}
                                      id="phoneNo"
                                      type="tel"
                                      placeholder="Phone number"
                                      onChange={(e) =>
                                        handlePhoneNumberChange(
                                          e,
                                          setFieldValue
                                        )
                                      }
                                      className={`h-12 lg:h-14 px-6 text-lg border-2 bg-gray-50 border-gray-200 rounded-xl focus:ring-2 focus:ring-orange-500 focus:border-transparent placeholder:text-gray-400 placeholder:font-light focus:bg-white focus:ring-offset-0 transition-all duration-200 ${
                                        errors.phoneNo && touched.phoneNo
                                          ? "ring-2 ring-red-400"
                                          : ""
                                      }`}
                                    />
                                  )}
                                </Field>
                                <ErrorMessage
                                  name="phoneNo"
                                  component="p"
                                  className="text-red-500 text-sm mt-2 ml-2"
                                />
                              </motion.div>

                              <motion.div variants={fieldVariants}>
                                <Field name="cityState">
                                  {({ field }: FieldProps) => (
                                    <Input
                                      {...field}
                                      id="cityState"
                                      type="text"
                                      placeholder="City, State"
                                      className={`h-12 lg:h-14 px-6 text-lg border-2 bg-gray-50 border-gray-200 rounded-xl focus:ring-2 focus:ring-orange-500 focus:border-transparent placeholder:text-gray-400 placeholder:font-light focus:bg-white focus:ring-offset-0 transition-all duration-200 ${
                                        errors.cityState && touched.cityState
                                          ? "ring-2 ring-red-400"
                                          : ""
                                      }`}
                                    />
                                  )}
                                </Field>
                                <ErrorMessage
                                  name="cityState"
                                  component="p"
                                  className="text-red-500 text-sm mt-2 ml-2"
                                />
                              </motion.div>
                            </div>

                            {/* Requirements Field */}
                            <motion.div variants={fieldVariants}>
                              <Field name="requirements">
                                {({ field }: FieldProps) => (
                                  <Textarea
                                    {...field}
                                    id="requirements"
                                    placeholder="Describe your project requirements..."
                                    className={`min-h-[120px] px-6 py-4 text-sm bg-gray-50 border-2 border-gray-200 rounded-xl focus:ring-2 focus:ring-orange-500 focus:border-transparent placeholder:text-gray-400 placeholder:font-light focus:bg-white transition-all duration-200 resize-none ${
                                      errors.requirements &&
                                      touched.requirements
                                        ? "ring-2 ring-red-400"
                                        : ""
                                    }`}
                                  />
                                )}
                              </Field>
                              <ErrorMessage
                                name="requirements"
                                component="p"
                                className="text-red-500 text-sm mt-2 ml-2"
                              />
                            </motion.div>

                            {/* Submit Button */}
                            <motion.div
                              variants={fieldVariants}
                              className="py-2"
                            >
                              <Button
                                type="submit"
                                className="w-full h-12 lg:h-14 bg-gradient-to-r bg-brand-color hover:bg-brand-color text-white text-lg font-semibold rounded-2xl shadow-lg hover:shadow-xl transition-all duration-200 border-0"
                                disabled={isSubmitting}
                              >
                                {isSubmitting ? (
                                  <div className="flex items-center gap-3">
                                    <div className="w-5 h-5 border-2 border-white border-t-transparent rounded-full animate-spin" />
                                    Submitting Request...
                                  </div>
                                ) : (
                                  <div className="flex items-center gap-3">
                                    <Send className="w-5 h-5" />
                                    Submit Request
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

      {/* Success Modal */}
      <SuccessModal
        isOpen={showSuccessModal}
        onClose={() => setShowSuccessModal(false)}
      />
    </>
  );
}

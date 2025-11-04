/* eslint-disable @typescript-eslint/no-explicit-any */
"use client";

import {
  formVariants,
  initialValues,
  useContactForm,
  validationSchema,
} from "@/hooks/ContactForm";

import { ErrorMessage, Field, FieldProps, Form, Formik } from "formik";
import { motion } from "framer-motion";
import { Send } from "lucide-react";
import { SuccessModal } from "../SuccessModal/SuccessModal";
import { Button } from "../ui/Button/Button";
import { Input } from "../ui/Input/Input";
import { Textarea } from "../ui/TextArea/TextArea";
import RockworthHeading from "@/common/MainHeading/MainHeading";

export function ContactForm() {
  const {
    showSuccessModal,
    setShowSuccessModal,
    handleSubmit,
    handlePhoneNumberChange,
  } = useContactForm();

  const containerVariants: any = {
    hidden: { opacity: 0 },
    visible: {
      opacity: 1,
      transition: {
        duration: 0.6,
        staggerChildren: 0.1,
      },
    },
  };

  const itemVariants: any = {
    hidden: { opacity: 0, y: 20 },
    visible: {
      opacity: 1,
      y: 0,
      transition: {
        duration: 0.5,
        ease: "easeOut",
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
    <motion.div
      variants={containerVariants}
      initial="hidden"
      animate="visible"
      className="w-full max-w-lg"
    >
      <motion.div variants={itemVariants} className="mb-5">
        <RockworthHeading title="Let's Get in Touch" />
      </motion.div>
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
                      placeholder="Your Name"
                      className={`h-14 px-6 text-lg border-2 bg-gray-50 border-gray-200 rounded-xl focus:ring-2 focus:ring-orange-500 focus:border-transparent placeholder:text-gray-400 placeholder:font-light focus:bg-white focus:ring-offset-0 transition-all duration-200 ${
                        errors.contact_name && touched.contact_name
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
                      placeholder="Company Name"
                      className={`h-14 px-6 text-lg border-2 bg-gray-50 border-gray-200 rounded-xl focus:ring-2 focus:ring-orange-500 focus:border-transparent placeholder:text-gray-400 placeholder:font-light focus:bg-white focus:ring-offset-0 transition-all duration-200 ${
                        errors.customer_name && touched.customer_name
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
              <motion.div variants={fieldVariants}>
                <Field name="email">
                  {({ field }: FieldProps) => (
                    <Input
                      {...field}
                      id="email"
                      type="text"
                      placeholder="Your Email"
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

              <motion.div variants={fieldVariants}>
                <Field name="phoneNo">
                  {({ field }: FieldProps) => (
                    <Input
                      {...field}
                      id="phoneNo"
                      type="tel"
                      placeholder="Phone number"
                      onChange={(e) =>
                        handlePhoneNumberChange(e, setFieldValue)
                      }
                      className={`h-14 px-6 text-lg border-2 bg-gray-50 border-gray-200 rounded-xl focus:ring-2 focus:ring-orange-500 focus:border-transparent placeholder:text-gray-400 placeholder:font-light focus:bg-white focus:ring-offset-0 transition-all duration-200 ${
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
                      className={`h-14 px-6 text-lg border-2 bg-gray-50 border-gray-200 rounded-xl focus:ring-2 focus:ring-orange-500 focus:border-transparent placeholder:text-gray-400 placeholder:font-light focus:bg-white focus:ring-offset-0 transition-all duration-200 ${
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

              {/* Requirements Field */}
              <motion.div variants={fieldVariants}>
                <Field name="requirements">
                  {({ field }: FieldProps) => (
                    <Textarea
                      {...field}
                      id="requirements"
                      placeholder="Describe your project requirements..."
                      className={`min-h-[120px] px-6 py-4 text-sm bg-gray-50 border-2 border-gray-200 rounded-xl focus:ring-2 focus:ring-orange-500 focus:border-transparent placeholder:text-gray-500 placeholder:font-light focus:bg-white transition-all duration-200 resize-none ${
                        errors.requirements && touched.requirements
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
              <motion.div variants={fieldVariants} className="py-2">
                <Button
                  type="submit"
                  className="w-full h-14 bg-gradient-to-r bg-black hover:from-orange-600  text-white text-lg font-semibold rounded-xl shadow-lg hover:shadow-xl transition-all duration-200 border-0"
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
      {/* Success Modal */}
      <SuccessModal
        isOpen={showSuccessModal}
        onClose={() => setShowSuccessModal(false)}
      />
    </motion.div>
  );
}

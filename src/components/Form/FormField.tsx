// /* eslint-disable @typescript-eslint/no-explicit-any */
// "use client";

// import { motion } from "framer-motion";
// import { Field, ErrorMessage } from "formik";
// import { ChangeEvent, useState } from "react";
// import { Input } from "../ui/Input/Input";

// interface FormFieldProps {
//   name: string;
//   label: string;
//   type?: string;
//   as?: string;
//   rows?: number;
//   placeholder?: string;
//   required?: boolean;
//   className?: string;
//   field: any;
//   error: any;
//   touched: any;
//   id: string;
//   onChange?: (e: ChangeEvent<HTMLInputElement>) => void;
// }

// export function FormField({
//   name,
//   label,
//   type = "text",
//   as,
//   rows,
//   placeholder,
//   required = false,
//   className = "",
//   field,
//   error,
//   touched,
//   id,
//   onChange,
// }: FormFieldProps) {
//   const [isFocused, setIsFocused] = useState(false);
//   const [hasValue, setHasValue] = useState(false);

//   const handleFocus = () => setIsFocused(true);
//   const handleBlur = (e: any) => {
//     setIsFocused(false);
//     setHasValue(e.target.value.length > 0);
//   };

//   const labelVariants = {
//     default: {
//       top: as === "textarea" ? "1rem" : "50%",
//       left: "1rem",
//       fontSize: "0.9rem",
//       color: "#BDBDBD",
//       fontWeight: "400",
//       y: as === "textarea" ? 0 : "-50%",
//     },
//     focused: {
//       top: "-0.5rem",
//       left: "0.75rem",
//       fontSize: "0.75rem",
//       color: "#F97316",
//       y: 0,
//     },
//     filled: {
//       top: "-0.5rem",
//       left: "0.75rem",
//       fontSize: "0.75rem",
//       color: "#6B7280",
//       y: 0,
//     },
//   };

//   const fieldVariants = {
//     default: {
//       borderColor: "#D1D5DB",
//       boxShadow: "0 0 0 0px rgba(249, 115, 22, 0)",
//     },
//     focused: {
//       borderColor: "#F97316",
//       boxShadow: "0 0 0 1px rgba(249, 115, 22, 0.1)",
//     },
//     error: {
//       borderColor: "#EF4444",
//       boxShadow: "0 0 0 1px rgba(239, 68, 68, 0.1)",
//     },
//   };

//   const shouldShowFocusedLabel = isFocused || touched || field.value;

//   return (
//     <div className={`relative ${className}`}>
//       <motion.div
//         className="relative"
//         initial="default"
//         animate={error ? "error" : isFocused ? "focused" : "default"}
//         variants={fieldVariants}
//         transition={{ duration: 0.2 }}
//       >
//         {/* Input/Textarea Field */}
//         <Input
//           {...field}
//           type={type}
//           as={as}
//           error={error}
//           touched={touched}
//           id={id}
//           onChange={onChange}
//           rows={rows}
//           placeholder={placeholder}
//           onFocus={handleFocus}
//           onBlur={handleBlur}
//           className={`
//                   w-full px-4 py-3 border text-sm rounded-lg bg-white
//                   transition-all duration-200 outline-none
//                   ${as === "textarea" ? "resize-none min-h-[120px] pt-6" : ""}
//                   ${error ? "border-red-400" : "border-gray-400"}
//                   hover:border-gray-400 focus:border-brand-color
//                   text-black placeholder-transparent placeholder:text-sm placeholder:font-light
//                 `}
//         />

//         {/* Floating Label */}
//         <motion.label
//           htmlFor={name}
//           className="absolute pointer-events-none bg-white px-2 font-light select-none"
//           initial="default"
//           animate={
//             error && shouldShowFocusedLabel
//               ? "error"
//               : shouldShowFocusedLabel
//               ? isFocused
//                 ? "focused"
//                 : "filled"
//               : "default"
//           }
//           variants={{
//             ...labelVariants,
//             error: {
//               ...labelVariants.focused,
//               color: "#EF4444",
//             },
//           }}
//           transition={{ duration: 0.2, ease: "easeOut" }}
//         >
//           {label}
//           {required && (
//             <motion.span
//               className="text-red-500 ml-1"
//               initial={{ opacity: 0, scale: 0 }}
//               animate={{ opacity: 1, scale: 1 }}
//               transition={{ delay: 0.1 }}
//             >
//               *
//             </motion.span>
//           )}
//         </motion.label>
//       </motion.div>

//       {/* Error Message */}
//       <ErrorMessage name={name}>
//         {(msg) => (
//           <motion.div
//             initial={{ opacity: 0, y: -10, height: 0 }}
//             animate={{ opacity: 1, y: 0, height: "auto" }}
//             exit={{ opacity: 0, y: -10, height: 0 }}
//             transition={{ duration: 0.2 }}
//             className="text-red-500 text-sm mt-1 flex items-center"
//           >
//             <motion.span
//               initial={{ scale: 0 }}
//               animate={{ scale: 1 }}
//               transition={{ delay: 0.1 }}
//               className="mr-1"
//             >
//               ⚠
//             </motion.span>
//             {msg}
//           </motion.div>
//         )}
//       </ErrorMessage>
//     </div>
//   );
// }

/* eslint-disable @typescript-eslint/no-explicit-any */
import { Button } from "@/components/ui/Button/Button";
import { Card, CardContent } from "@/components/ui/Card/Card";
import {
  Dialog,
  DialogContent,
  DialogOverlay,
} from "@/components/ui/Dialog/Dialog";
import { motion } from "framer-motion";
export const SuccessModal = ({
  isOpen,
  onClose,
}: {
  isOpen: boolean;
  onClose: () => void;
}) => {
  const checkmarkVariants: any = {
    hidden: { pathLength: 0, opacity: 0 },
    visible: {
      pathLength: 1,
      opacity: 1,
      transition: {
        pathLength: { type: "spring", duration: 0.6, bounce: 0 },
        opacity: { duration: 0.2 },
      },
    },
  };

  return (
    <Dialog open={isOpen} onOpenChange={onClose}>
      <DialogOverlay className="bg-black/50 backdrop-blur-sm" />
      <DialogContent className="sm:max-w-[400px] p-0 overflow-hidden border-0 bg-white rounded-3xl shadow-2xl">
        <Card className="border-0 shadow-none bg-white">
          <CardContent className="p-8 text-center">
            <motion.div
              initial={{ scale: 0 }}
              animate={{ scale: 1 }}
              transition={{ type: "spring", duration: 0.5 }}
              className="w-20 h-20 mx-auto mb-6 bg-green-100 rounded-full flex items-center justify-center"
            >
              <motion.svg
                width="40"
                height="40"
                viewBox="0 0 24 24"
                fill="none"
                stroke="currentColor"
                strokeWidth="3"
                className="text-green-600"
              >
                <motion.path
                  d="M20 6L9 17l-5-5"
                  variants={checkmarkVariants}
                  initial="hidden"
                  animate="visible"
                />
              </motion.svg>
            </motion.div>
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.3, duration: 0.5 }}
            >
              <h3 className="text-2xl font-bold text-gray-900 mb-3">
                Request Submitted Successfully!
              </h3>
              <p className="text-gray-600 mb-6 leading-relaxed">
                Thank you for your interest. We&apos;ve received your quote
                request and our team will get back to you within 24 hours with a
                personalized proposal.
              </p>
              <Button
                onClick={onClose}
                className="w-full h-12 bg-green-600 hover:bg-green-700 text-white font-semibold rounded-xl transition-colors"
              >
                Close
              </Button>
            </motion.div>
          </CardContent>
        </Card>
      </DialogContent>
    </Dialog>
  );
};

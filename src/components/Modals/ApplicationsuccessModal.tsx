"use client";

import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
} from "@/components/ui/Dialog/Dialog";
import { Button } from "@/components/ui/Button/Button";
import { CheckCircle, X } from "lucide-react";

interface ApplicationSuccessModalProps {
  isOpen: boolean;
  onClose: () => void;
}

export default function ApplicationSuccessModal({
  isOpen,
  onClose,
}: ApplicationSuccessModalProps) {
  return (
    <Dialog open={isOpen} onOpenChange={onClose}>
      <DialogContent className="max-w-md w-full bg-white border-none shadow-2xl rounded-2xl p-6 text-center">
        <DialogHeader>
          <button
            onClick={onClose}
            className="absolute right-4 top-4 p-2 rounded-full hover:bg-gray-100"
            aria-label="Close"
          >
            <X size={20} />
          </button>
          <DialogTitle className="text-center text-2xl font-bold text-gray-900 flex flex-col items-center gap-2">
            <CheckCircle className="h-12 w-12 text-green-500" />
            Application Submitted!
          </DialogTitle>
        </DialogHeader>
        <div className="py-4">
          <p className="text-gray-700 leading-relaxed">
            Your application has been successfully submitted to our HR
            department. We appreciate your interest and will review your
            qualifications shortly. Thank you!
          </p>
        </div>
        <div className="pt-4 border-t">
          <Button
            onClick={onClose}
            className="w-full bg-black text-white hover:bg-gray-800 py-3"
          >
            Close
          </Button>
        </div>
      </DialogContent>
    </Dialog>
  );
}

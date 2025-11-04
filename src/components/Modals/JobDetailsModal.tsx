/* eslint-disable @typescript-eslint/no-explicit-any */
"use client";

import { Badge } from "@/components/ui/Badge/Badge";
import { Button } from "@/components/ui/Button/Button";
import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
} from "@/components/ui/Dialog/Dialog";
import { MapPin, X } from "lucide-react";
import { useState } from "react";
import ApplicationFormModal from "./ApplicationFormModal";
import ApplicationSuccessModal from "./ApplicationsuccessModal";

interface Job {
  id: string;
  title: string;
  location: string;
  type: string;
  experience: string;
  description: string;
  responsibilities: string[];
  qualifications: string[];
  category: string;
}

interface JobDetailsModalProps {
  job: Job | any;
  isOpen: boolean;
  onClose: () => void;
}

export default function JobDetailsModal({
  job,
  isOpen,
  onClose,
}: JobDetailsModalProps) {
  const [isApplicationFormOpen, setIsApplicationFormOpen] = useState(false);
  const [isApplicationSuccessOpen, setIsApplicationSuccessOpen] =
    useState(false);

  const handleApplyClick = () => {
    setIsApplicationFormOpen(true);
  };

  const handleApplicationFormClose = () => {
    setIsApplicationFormOpen(false);
  };

  const handleApplicationSuccess = () => {
    setIsApplicationSuccessOpen(true);
  };

  const handleApplicationSuccessClose = () => {
    setIsApplicationSuccessOpen(false);
    // When the success modal closes, also close the JobDetailsModal
    onClose();
  };

  return (
    <>
      <Dialog open={isOpen} onOpenChange={onClose}>
        <DialogContent className="lg:max-w-2xl max-w-md w-full bg-white border-none shadow-2xl rounded-2xl p-6">
          {job && (
            <>
              <DialogHeader>
                <button
                  onClick={onClose}
                  className="absolute right-4 top-4 p-2 rounded-full hover:bg-gray-100"
                  aria-label="Close"
                >
                  <X size={20} />
                </button>
                <DialogTitle className="text-start text-lg lg:text-2xl font-bold text-gray-900">
                  {job.title}
                </DialogTitle>
              </DialogHeader>
              {/* Outer div to hide scrollbar */}
              <div className="max-h-[70vh] overflow-hidden pr-4 -mr-4">
                {/* Inner div with actual scrollable content */}
                <div className="max-h-full overflow-y-auto space-y-6">
                  <div className="flex flex-col items-start justify-between gap-2 lg:gap-1 text-gray-600">
                    <div className="flex items-center">
                      <MapPin className="h-4 w-4 mr-1" />
                      <span>{job.location}</span>
                    </div>
                    <div className="w-full flex items-center justify-between p-2">
                      <Badge variant="secondary">{job.type}</Badge>
                      <span>{job.experience}</span>
                    </div>
                  </div>
                  <div>
                    <h3 className="text-lg font-normal text-gray-900 mb-2">
                      Description:
                    </h3>
                    <p className="text-gray-700 font-light leading-relaxed">
                      {job.description}
                    </p>
                  </div>
                  <div>
                    <h3 className="text-lg font-normal text-gray-900 mb-3">
                      Key Responsibilities:
                    </h3>
                    <ul className="space-y-2">
                      {job.responsibilities.map(
                        (responsibility: string, index: number) => (
                          <li key={index} className="flex items-start">
                            <span className="text-gray-400 mr-2">•</span>
                            <span className="text-gray-700 font-light leading-relaxed">
                              {responsibility}
                            </span>
                          </li>
                        )
                      )}
                    </ul>
                  </div>
                  <div>
                    <h3 className="text-lg font-normal text-gray-900 mb-3">
                      Key Eligibility:
                    </h3>
                    <ul className="space-y-2">
                      {job.qualifications.map(
                        (qualification: string, index: number) => (
                          <li key={index} className="flex items-start">
                            <span className="text-gray-400 mr-2">•</span>
                            <span className="text-gray-700 font-light leading-relaxed">
                              {qualification}
                            </span>
                          </li>
                        )
                      )}
                    </ul>
                  </div>
                </div>
              </div>
              <div className="pt-6 border-t">
                <Button
                  className="w-full bg-black text-white hover:bg-gray-800 py-3"
                  onClick={handleApplyClick}
                >
                  Apply Now
                </Button>
              </div>
            </>
          )}
        </DialogContent>
      </Dialog>
      <ApplicationFormModal
        isOpen={isApplicationFormOpen}
        onClose={handleApplicationFormClose}
        onSuccess={handleApplicationSuccess}
      />
      <ApplicationSuccessModal
        isOpen={isApplicationSuccessOpen}
        onClose={handleApplicationSuccessClose}
      />
    </>
  );
}

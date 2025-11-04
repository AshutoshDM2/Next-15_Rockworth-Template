import { AlertCircle } from "lucide-react";

interface ErrorStateProps {
  error: string;
}

export function ErrorState({ error }: ErrorStateProps) {
  return (
    <div className="p-3 sm:p-4">
      <div className="flex items-center p-3 sm:p-4 bg-red-50 rounded-lg">
        <AlertCircle className="w-5 h-5 text-red-500 mr-3 shrink-0" />
        <div>
          <h3 className="font-medium text-red-800 text-sm sm:text-base">
            Search Error
          </h3>
          <p className="text-xs sm:text-sm text-red-600">{error}</p>
        </div>
      </div>
    </div>
  );
}

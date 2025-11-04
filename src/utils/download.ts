"use client";

import { useState, useCallback } from "react";
import { showErrorToast, showSuccessToast } from "@/utils/toaster/toast";

export function useFileDownload() {
  const [isDownloading, setIsDownloading] = useState(false);

  const downloadFile = useCallback(
    async (fileUrl: string, fileName: string) => {
      if (!fileUrl) {
        showErrorToast("Download Error: No file link available.");
        return;
      }

      try {
        setIsDownloading(true);

        const response = await fetch(fileUrl);
        if (!response.ok)
          throw new Error(`HTTP error! status: ${response.status}`);

        const blob = await response.blob();
        const url = window.URL.createObjectURL(blob);

        const link = document.createElement("a");
        link.href = url;
        link.setAttribute("download", `${fileName.replace(/\s/g, "-")}.pdf`);
        document.body.appendChild(link);
        link.click();

        // ✅ Show success toast before cleanup
        showSuccessToast(`${fileName} PDF downloaded successfully.`);

        link.remove();
        window.URL.revokeObjectURL(url);
      } catch (error) {
        console.error("Download failed:", error);
        showErrorToast(`Download Failed: Could not download ${fileName} PDF.`);
      } finally {
        setIsDownloading(false);
      }
    },
    []
  );

  return { downloadFile, isDownloading };
}

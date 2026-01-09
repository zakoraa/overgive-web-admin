"use client";

import { useMutation } from "@tanstack/react-query";
import { uploadOperationalReceiptImage } from "../services/upload-operational-receipt-image";

export const useUploadOperationalReceiptImage = () => {
  return useMutation<string, Error, File>({
    mutationFn: (file) => uploadOperationalReceiptImage(file),
  });
};

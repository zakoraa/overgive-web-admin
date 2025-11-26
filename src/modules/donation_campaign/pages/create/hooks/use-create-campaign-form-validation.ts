import { useState } from "react";

export const useCreateCampaignFormValidation = () => {
  const [errors, setErrors] = useState<Record<string, string>>({});

  const validate = (formData: any) => {
    const newErrors: Record<string, string> = {};

    if (!formData.image_file) newErrors.image_file = "Thumbnail wajib diunggah.";
    if (!formData.name) newErrors.name = "Nama kampanye wajib diisi.";
    if (!formData.category) newErrors.category = "Kategori wajib dipilih.";
    if (!formData.background_html) newErrors.background_html = "Latar belakang wajib diisi.";

    setErrors(newErrors);

    return newErrors;
  };

  const clearErrors = () => setErrors({});

  return {
    errors,
    validate,
    clearErrors,
  };
};

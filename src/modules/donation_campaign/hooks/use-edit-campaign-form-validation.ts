import { useState } from "react";

export const useEditCampaignFormValidation = () => {
  const [errors, setErrors] = useState<Record<string, string>>({});

  const validate = (formData: any) => {
    const newErrors: Record<string, string> = {};

    // title (name di form)
    if (!formData.name) {
      newErrors.name = "Nama kampanye wajib diisi.";
    }

    // image wajib ada, tapi tidak wajib upload baru
    if (!formData.image_file && !formData.image_url) {
      newErrors.image_file = "Thumbnail wajib diunggah.";
    }

    // category
    if (!formData.category) {
      newErrors.category = "Kategori wajib dipilih.";
    }

    // background
    if (!formData.background_html) {
      newErrors.background_html = "Latar belakang wajib diisi.";
    }

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

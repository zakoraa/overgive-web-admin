import { useState } from "react";

export type CreateDistributroFormData = {
  email: string;
  fullName: string;
};

export function useCreateDistributorForm() {
  const [form, setForm] = useState<CreateDistributroFormData>({
    email: "",
    fullName: "",
  });

  const [errors, setErrors] = useState<Record<string, string>>({});

  const validate = () => {
    const newErrors: Record<string, string> = {};

    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    if (!form.email.trim()) {
      newErrors.email = "Email wajib diisi";
    } else if (!emailRegex.test(form.email)) {
      newErrors.email = "Format email tidak valid";
    }

    if (!form.fullName.trim()) {
      newErrors.fullName = "Nama lengkap wajib diisi";
    }

    setErrors(newErrors);
    return Object.keys(newErrors).length === 0;
  };

  return {
    form,
    setForm,
    errors,
    validate,
  };
}

"use client";

import { useState } from "react";

export function useCreateAssignmentValidation() {
  const [errors, setErrors] = useState({
    distributor_id: "",
    campaign_id: "",
  });

  const validate = (formData: any) => {
    const newErrors: any = {};

    if (!formData.distributor_id) {
      newErrors.distributor_id = "Distributor wajib dipilih";
    }

    if (!formData.campaign_id) {
      newErrors.campaign_id = "Kampanye wajib dipilih";
    }

    setErrors(newErrors);

    return Object.keys(newErrors).length === 0; 
  };

  return {
    errors,
    validate,
  };
}

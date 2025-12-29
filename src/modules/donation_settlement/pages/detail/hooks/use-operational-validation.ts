import { useState } from "react";

export const useOperationalFormValidation = ({
  initialAmount = 0,
  initialNote = "",
} = {}) => {
  const [amount, setAmount] = useState<number>(initialAmount);
  const [note, setNote] = useState<string>(initialNote);
  const [errors, setErrors] = useState<{ amount?: string; note?: string }>({});

  const validate = (): boolean => {
    const newErrors: { amount?: string; note?: string } = {};

    if (!note.trim()) newErrors.note = "Keterangan harus diisi";
    if (amount <= 0) newErrors.amount = "Jumlah harus lebih dari 0";

    setErrors(newErrors);

    return Object.keys(newErrors).length === 0;
  };

  const reset = () => {
    setAmount(0);
    setNote("");
    setErrors({});
  };

  return {
    amount,
    setAmount,
    note,
    setNote,
    errors,
    validate,
    reset,
  };
};

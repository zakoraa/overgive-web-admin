import { AppButtonSm } from "@/core/components/ui/button/app-button-sm";
import { AppInput } from "@/core/components/ui/input/app-input";
import {
  Dialog,
  DialogContent,
  DialogFooter,
  DialogHeader,
  DialogTitle,
} from "@/core/components/ui/input/app-search-select/dialog";
import { PlusIcon, SaveIcon } from "lucide-react";
import { useOperationalFormValidation } from "../hooks/use-operational-validation";
import { useEffect } from "react";

interface OperationalModalProps {
  isOpen: boolean;
  onClose: () => void;
  onSubmit: (amount: number, note: string) => void;
  initialData?: {
    amount: number;
    note: string | null;
  };
  mode?: "add" | "edit";
}


export const OperationalModal = ({
  isOpen,
  onClose,
  onSubmit,
  initialData,
  mode = "add",
}: OperationalModalProps) => {
  const {
    amount,
    setAmount,
    note,
    setNote,
    errors,
    validate,
    reset,
  } = useOperationalFormValidation();

  useEffect(() => {
    if (initialData) {
      setAmount(initialData.amount);
      setNote(initialData.note ?? "");
    }
  }, [initialData, setAmount, setNote]);

  const handleSubmit = () => {
    if (!validate()) return;
    onSubmit(amount, note);
    reset();
    onClose();
  };

  return (
    <Dialog open={isOpen} onOpenChange={onClose}>
      <DialogContent className="sm:max-w-md">
        <DialogHeader>
          <DialogTitle>
            {mode === "add"
              ? "Tambah Biaya Operasional"
              : "Edit Biaya Operasional"}
          </DialogTitle>
        </DialogHeader>

        <div className="mt-2 flex flex-col gap-3">
          <AppInput
            allowedChar="currency"
            value={amount}
            onChange={(e) => setAmount(Number(e.target.value))}
            label="Jumlah"
            hint="Masukkan jumlah"
            error={errors.amount}
          />

          <AppInput
            value={note}
            maxLength={200}
            onChange={(e) => setNote(e.target.value)}
            label="Keterangan"
            hint="Masukkan keterangan"
            error={errors.note}
          />
        </div>

        <DialogFooter>
          <AppButtonSm
            text={mode === "add" ? "Tambah" : "Simpan Perubahan"}
            icon={mode === "add" ? <PlusIcon /> : <SaveIcon />}
            onClick={handleSubmit}
            className="w-full"
          />
        </DialogFooter>
      </DialogContent>
    </Dialog>
  );
};

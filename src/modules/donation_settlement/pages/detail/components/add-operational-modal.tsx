import { Button } from "@/core/components/ui/button/app-button-shadcn";
import { AppButtonSm } from "@/core/components/ui/button/app-button-sm";
import { AppInput } from "@/core/components/ui/input/app-input";
import {
  Dialog,
  DialogContent,
  DialogFooter,
  DialogHeader,
  DialogTitle,
} from "@/core/components/ui/input/app-search-select/dialog";
import { PlusIcon } from "lucide-react";
import { useState } from "react";

interface AddOperationalModalProps {
  isOpen: boolean;
  onClose: () => void;
  onSubmit: (amount: number, note: string) => void;
}

export const AddOperationalModal = ({
  isOpen,
  onClose,
  onSubmit,
}: AddOperationalModalProps) => {
  const [amount, setAmount] = useState<number>(0);
  const [note, setNote] = useState<string>("");

  const handleSubmit = () => {
    if (amount <= 0) return alert("Jumlah harus lebih dari 0");
    onSubmit(amount, note);
    setAmount(0);
    setNote("");
    onClose();
  };

  return (
    <Dialog open={isOpen} onOpenChange={onClose}>
      <DialogContent className="sm:max-w-md">
        <DialogHeader>
          <DialogTitle>Tambah Biaya Operasional</DialogTitle>
        </DialogHeader>

        <div className="mt-2 flex flex-col gap-3">
          <AppInput
            allowedChar="currency"
            className="w-full rounded border px-2 py-1"
            value={amount}
            onChange={(e) => setAmount(Number(e.target.value))}
            label={"Jumlah"}
            hint={"Masukkan jumlah"}
          />

          <AppInput
            className="w-full rounded border px-2 py-1"
            value={note}
            maxLength={200}
            onChange={(e) => setNote(e.target.value)}
            label={"Keterangan"}
            hint={"Masukkan keterangan"}
          />
        </div>

        <DialogFooter>
          <AppButtonSm
            text="Tambah"
            icon={<PlusIcon />}
            onClick={handleSubmit}
            className="w-full"
          />
        </DialogFooter>
      </DialogContent>
    </Dialog>
  );
};

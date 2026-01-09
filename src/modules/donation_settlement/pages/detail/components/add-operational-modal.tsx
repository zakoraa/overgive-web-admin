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
import { useEffect, useState } from "react";
import { useUploadOperationalReceiptImage } from "../hooks/use-upload-operationa-receipt-image";
import { ReceiptImageUploader } from "./receipt-image-uploader";
import { ModalLoading } from "@/core/components/ui/modal/modal-loading";

interface OperationalModalProps {
  isOpen: boolean;
  onClose: () => void;
  onSubmit: (amount: number, note: string, receiptImageUrl: string) => void;
  initialData?: {
    amount: number;
    note: string | null;
    receiptImageUrl?: string | null;
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
  const { amount, setAmount, note, setNote, errors, validate, reset } =
    useOperationalFormValidation();

  const [selectedFile, setSelectedFile] = useState<File | null>(null);
  const [receiptImageUrl, setReceiptImageUrl] = useState<string>("");
  const [fileError, setFileError] = useState<string>("");
  const [isUploading, setIsUploading] = useState<boolean>(false); // ← state loading

  const uploadMutation = useUploadOperationalReceiptImage();

  useEffect(() => {
    if (initialData) {
      setAmount(initialData.amount);
      setNote(initialData.note ?? "");
      setReceiptImageUrl(initialData.receiptImageUrl ?? "");
      console.log("INITAL DATA: ", initialData.receiptImageUrl);
    }
  }, [initialData, setAmount, setNote]);

 const handleSubmit = async () => {
  if (!validate()) return;

  if (!selectedFile && !receiptImageUrl) {
    setFileError("Bukti pembayaran wajib diupload");
    return;
  } else {
    setFileError("");
  }

  let imageUrl = receiptImageUrl;

  try {
    if (selectedFile) {
      setIsUploading(true);
      imageUrl = await uploadMutation.mutateAsync(selectedFile);
      setReceiptImageUrl(imageUrl); 
    }
  } catch (err) {
    alert("Gagal upload gambar: " + (err as Error).message);
    return;
  } finally {
    setIsUploading(false);
  }

  onSubmit(amount, note, imageUrl); 
  reset();
  setFileError("");
  onClose();
};


  return (
    <Dialog open={isOpen} onOpenChange={onClose}>
      <DialogContent className="sm:max-w-md">
        {isUploading && <ModalLoading isOpen />}
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

          <ReceiptImageUploader
            value={selectedFile}
            initialUrl={initialData?.receiptImageUrl ?? undefined}
            onChange={setSelectedFile}
            error={fileError}
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

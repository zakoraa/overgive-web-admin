import { UploadCloud, Trash2 } from "lucide-react";
import { useEffect, useRef } from "react";
import { useReceiptImage } from "../hooks/use-receipt-image";

interface ReceiptImageUploaderProps {
  value?: File | null;
  onChange: (file: File | null) => void;
  error?: string; // <-- tambahkan ini
}

export const ReceiptImageUploader = ({
  value,
  onChange,
  error,
}: ReceiptImageUploaderProps) => {
  const fileInputRef = useRef<HTMLInputElement>(null);
  const { file, previewUrl, selectFile, removeFile } = useReceiptImage();

  useEffect(() => {
    if (value) selectFile(value);
    else removeFile();
  }, [value]);

  const handleDrop = (e: React.DragEvent<HTMLDivElement>) => {
    e.preventDefault();
    if (e.dataTransfer.files?.[0]) {
      selectFile(e.dataTransfer.files[0]);
      onChange(e.dataTransfer.files[0]);
    }
  };

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    if (e.target.files?.[0]) {
      selectFile(e.target.files[0]);
      onChange(e.target.files[0]);
    }
  };

  const handleRemove = () => {
    removeFile();
    onChange(null);
  };

  const handleOpenNewTab = () => {
    if (previewUrl) window.open(previewUrl, "_blank");
  };

  // border merah kalau error
  const borderClass = error
    ? "border-red-500 hover:border-red-500"
    : "border-gray-300 hover:border-primary hover:bg-primary/5";

  return (
    <div
      onClick={() => fileInputRef.current?.click()}
      onDrop={handleDrop}
      onDragOver={(e) => e.preventDefault()}
      className={`flex cursor-pointer flex-col items-center justify-center rounded-xl border-2 border-dashed p-6 transition ${borderClass}`}
    >
      <UploadCloud className="mb-2 h-10 w-10 text-gray-400" />
      <p className="text-center text-sm text-gray-600">
        <span className="text-primary font-medium">Klik untuk upload</span> atau
        drag gambar ke sini
      </p>
      <p className="mt-1 text-xs text-gray-400">PNG, JPG, maksimal 2MB</p>

      {file && (
        <div className="mt-2 flex items-center gap-2">
          <button
            type="button"
            onClick={(e) => {
              e.stopPropagation();
              handleOpenNewTab();
            }}
            className="text-sm text-blue-600 underline"
          >
            {file.name}
          </button>
          <button
            type="button"
            onClick={(e) => {
              e.stopPropagation();
              handleRemove();
            }}
            className="rounded-full bg-gray-100 p-1 hover:bg-gray-200"
          >
            <Trash2 className="h-4 w-4 text-red-600" />
          </button>
        </div>
      )}

      {error && <p className="mt-1 text-xs text-red-600">{error}</p>}

      <input
        ref={fileInputRef}
        type="file"
        accept="image/*"
        hidden
        onChange={handleChange}
      />
    </div>
  );
};

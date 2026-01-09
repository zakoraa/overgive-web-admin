import { UploadCloud, Trash2 } from "lucide-react";
import { useEffect, useRef } from "react";
import { useReceiptImage } from "../hooks/use-receipt-image";

interface ReceiptImageUploaderProps {
  value?: File | null;
  initialUrl?: string;
  onChange: (file: File | null) => void;
  error?: string;
}


export const ReceiptImageUploader = ({
  value,
  initialUrl,
  onChange,
  error,
}: ReceiptImageUploaderProps) => {
  const fileInputRef = useRef<HTMLInputElement>(null);
  const { file, selectFile, removeFile } = useReceiptImage();
  

  useEffect(() => {
    if (value) selectFile(value);
    else if (!value) removeFile();
  }, [value]);

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

  const handleOpen = () => {
    if (file) {
      const url = URL.createObjectURL(file);
      window.open(url, "_blank");
    } else if (initialUrl) {
      window.open(initialUrl, "_blank");
    }
  };

  return (
    <div
      onClick={() => fileInputRef.current?.click()}
      className="hover:border-primary hover:bg-primary/5 flex cursor-pointer flex-col items-center justify-center rounded-xl border-2 border-dashed border-gray-300 p-6 transition"
    >
      <UploadCloud className="mb-2 h-10 w-10 text-gray-400" />

      <p className="text-center text-sm text-gray-600">
        <span className="text-primary font-medium">Klik untuk upload</span> atau
        drag gambar ke sini
      </p>

      <p className="mt-1 text-xs text-gray-400">
        PNG, JPG, JPEG, WEBP, SVG, maksimal 2MB
      </p>

      {(file || initialUrl) && (
        <div className="mt-2 flex items-center gap-2">
          <button
            type="button"
            onClick={(e) => {
              e.stopPropagation();
              handleOpen();
            }}
            className="text-sm text-blue-600 underline"
          >
            {file ? file.name : "Lihat bukti pembayaran"}
          </button>

          {file && (
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
          )}
        </div>
      )}

      {error && <p className="mt-1 text-xs text-red-600">{error}</p>}

      <input
        ref={fileInputRef}
        type="file"
        accept="image/png, image/jpeg, image/jpg, image/webp, image/svg+xml"
        hidden
        onChange={handleChange}
      />
    </div>
  );
};

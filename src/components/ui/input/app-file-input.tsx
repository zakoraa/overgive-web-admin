import { Label } from "@/components/text/label";
import { FC, useState, useEffect } from "react";

interface AppFileInputProps {
  label: string;
  name: string;
  onChange: (file: File | null) => void;
  accept?: string;
  required?: boolean;
  hint?: string;
}

export const AppFileInput: FC<AppFileInputProps> = ({
  label,
  name,
  onChange,
  accept,
  required = false,
  hint,
}) => {
  const [preview, setPreview] = useState<string | null>(null);
  const [file, setFile] = useState<File | null>(null);

  useEffect(() => {
    if (!file) {
      setPreview(null);
      return;
    }
    const objectUrl = URL.createObjectURL(file);
    setPreview(objectUrl);

    return () => URL.revokeObjectURL(objectUrl);
  }, [file]);

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const selectedFile = e.target.files?.[0] || null;
    setFile(selectedFile);
    onChange(selectedFile);
  };

  return (
    <div className="flex flex-col space-y-2">
      <Label
        text={label}
        htmlFor={name}
        required
      />

      <input
        id={name}
        name={name}
        type="file"
        accept={accept}
        required={required}
        onChange={handleChange}
        className="rounded border p-2"
      />

      {hint && <p className="text-xs text-gray-500">{hint}</p>}

      {preview && (
        <img
          src={preview}
          alt="Preview"
          className="mt-2 h-48 w-48 rounded-lg border object-cover"
        />
      )}
    </div>
  );
};

import { Label } from "@/components/text/label";
import { FC, useState, useEffect } from "react";
import ErrorInputMessage from "../error-input-message";
import clsx from "clsx";

interface AppFileInputProps {
  label: string;
  labelMessage?:string,
  name: string;
  error?: string;
  onChange: (file: File | null) => void;
  accept?: string;
  required?: boolean;
  hint?: string;
}

export const AppFileInput: FC<AppFileInputProps> = ({
  label,
  labelMessage,
  name,
  onChange,
  error,
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
      <Label text={label} htmlFor={name} required />
      {labelMessage && <p className="text-xs text-gray-500">{labelMessage}</p>}

      <input
        id={name}
        name={name}
        type="file"
        accept={accept}
        required={required}
        onChange={handleChange}
        className={clsx(
          "rounded border p-2",
          error
            ? "border-red-500 focus:border-red-600"
            : "border-gray-300 focus:border-gray-500",
        )}
      />

      {hint && <p className="text-xs text-gray-500">{hint}</p>}
      <ErrorInputMessage error={error} />

      {preview && (
        <img
          src={preview}
          alt="Preview"
          className="mt-2 aspect-auto rounded-lg border object-cover"
        />
      )}
    </div>
  );
};

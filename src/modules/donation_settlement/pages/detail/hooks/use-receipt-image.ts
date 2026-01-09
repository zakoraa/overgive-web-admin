import { useState, useEffect } from "react";

const MAX_SIZE_MB = 2;

export const useReceiptImage = () => {
    const [file, setFile] = useState<File | null>(null);
    const [previewUrl, setPreviewUrl] = useState<string | null>(null);
    const [error, setError] = useState<string | null>(null);
    const [isPreviewOpen, setIsPreviewOpen] = useState(false);

    useEffect(() => {
        if (!file) {
            setPreviewUrl(null);
            return;
        }

        const url = URL.createObjectURL(file);
        setPreviewUrl(url);

        return () => URL.revokeObjectURL(url);
    }, [file]);
    const ALLOWED_EXTENSIONS = ["png", "jpg", "jpeg", "svg", "webp"];


    const selectFile = (newFile: File) => {
        setError(null);

        // Cek MIME type awal
        if (!newFile.type.startsWith("image/")) {
            setError("File harus berupa gambar: PNG, JPG, JPEG, SVG, atau WEBP");
            return;
        }

        // Cek extension
        const ext = newFile.name.split(".").pop()?.toLowerCase();
        if (!ext || !ALLOWED_EXTENSIONS.includes(ext)) {
            setError(`Hanya mendukung file: ${ALLOWED_EXTENSIONS.join(", ")}`);
            return;
        }
        // Cek ukuran
        if (newFile.size > MAX_SIZE_MB * 1024 * 1024) {
            setError(`Ukuran gambar maksimal ${MAX_SIZE_MB}MB`);
            return;
        }


        setFile(newFile);
    };

    const removeFile = () => {
        setFile(null);
        setPreviewUrl(null);
        setError(null);
    };

    const togglePreview = () => setIsPreviewOpen((prev) => !prev);

    return {
        file,
        previewUrl,
        error,
        isPreviewOpen,
        selectFile,
        removeFile,
        togglePreview,
    };
};

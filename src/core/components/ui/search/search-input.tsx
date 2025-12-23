"use client";
import Image from "next/image";

interface SearchInputProps {
  placeholder?: string;
  value?: string;
  onChange?: (value: string) => void;
}

export default function SearchInput({
  placeholder = "Cari sesuatu...",
  onChange,
  value,
}: SearchInputProps) {
  return (
    <div className="flex w-full items-center rounded-xl border border-gray-300 px-3 py-2">
      <Image
        src="/icons/ic-search.svg"
        alt="search-icon"
        height={18}
        width={18}
        className="opacity-60"
      />
      <input
        type="text"
        placeholder={placeholder}
        value={value}
        onChange={(e) => onChange?.(e.target.value)}
        className="ml-3 w-full bg-transparent text-sm outline-none"
      />
    </div>
  );
}

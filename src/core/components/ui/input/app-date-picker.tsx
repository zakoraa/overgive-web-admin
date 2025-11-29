"use client";

import { useState, useRef, useEffect } from "react";
import { cn } from "@/core/utils/util";
import { DayPicker } from "react-day-picker";
import { format } from "date-fns";
import { id } from "date-fns/locale";
import { CalendarDays } from "lucide-react";
import { Label } from "@/core/components/text/label";

interface AppDatePickerProps {
  label?: string;
  labelMessage?: string;
  name?: string;
  required?: boolean;
  error?: string;
  placeholder?: string;
  defaultValue?: Date | null;
  disabled?: boolean;
  wrapperClassName?: string;
  labelClassName?: string;
  className?: string;
  onChange?: (date: Date | null) => void;
}

export const AppDatePicker = ({
  label,
  labelMessage,
  name,
  required,
  error,
  placeholder = "Pilih tanggal",
  defaultValue = null,
  disabled,
  wrapperClassName,
  labelClassName,
  className,
  onChange,
}: AppDatePickerProps) => {
  const [selected, setSelected] = useState<Date | null>(defaultValue);
  const [open, setOpen] = useState(false);

  const popupRef = useRef<HTMLDivElement | null>(null);

  // Sync jika defaultValue berubah (misal setelah fetch API)
  useEffect(() => {
    setSelected(defaultValue ?? null);
  }, [defaultValue]);

  const handleSelect = (day: Date | undefined) => {
    const val = day ?? null;
    setSelected(val);
    onChange?.(val);
    setOpen(false);
  };

  // === AUTO CLOSE ON OUTSIDE CLICK ===
  useEffect(() => {
    const handleClickOutside = (e: MouseEvent) => {
      if (!open) return;
      if (popupRef.current && !popupRef.current.contains(e.target as Node)) {
        setOpen(false);
      }
    };

    document.addEventListener("mousedown", handleClickOutside);
    return () => document.removeEventListener("mousedown", handleClickOutside);
  }, [open]);

  return (
    <div className={cn("flex w-full flex-col space-y-1", wrapperClassName)}>
      {label && (
        <Label
          htmlFor={name}
          text={label}
          required={required}
          className={labelClassName}
        />
      )}

      {labelMessage && <p className="text-xs text-gray-500">{labelMessage}</p>}

      {/* Trigger Button */}
      <button
        disabled={disabled}
        type="button"
        onClick={() => !disabled && setOpen(!open)}
        className={cn(
          "flex w-full cursor-pointer items-center justify-between rounded-md border border-gray-300 bg-white px-4 py-2 text-sm text-gray-700",
          "transition hover:bg-gray-50",
          "focus:border-primary focus:ring-primary/20 outline-none focus:ring-2",
          disabled && "cursor-not-allowed bg-gray-100 opacity-60",
          error && "border-red-500 focus:border-red-500 focus:ring-red-300/20",
          className,
        )}
      >
        <span>
          {selected
            ? format(selected, "dd MMMM yyyy", { locale: id })
            : placeholder}
        </span>

        <CalendarDays className="h-5 w-5 text-gray-500" />
      </button>

      {/* Popup Calendar */}
      {open && !disabled && (
        <div className="relative z-50">
          <div
            ref={popupRef}
            className="animate-fadeIn absolute mt-2 w-fit rounded-xl border bg-white p-3 shadow-lg"
          >
            <DayPicker
              mode="single"
              selected={selected ?? undefined}
              onSelect={handleSelect}
              locale={id}
              className="rounded-xl"
            />
          </div>
        </div>
      )}

      {error && <p className="text-sm text-red-500">{error}</p>}
    </div>
  );
};

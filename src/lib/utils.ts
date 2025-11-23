import { clsx, type ClassValue } from "clsx"
import { twMerge } from "tailwind-merge"

export function cn(...inputs: ClassValue[]) {
  return twMerge(clsx(inputs))
}

export function calculateAge(birthDate: string): number {
  const dob = new Date(birthDate);
  const now = new Date();
  let age = now.getFullYear() - dob.getFullYear();
  const m = now.getMonth() - dob.getMonth();
  if (m < 0 || (m === 0 && now.getDate() < dob.getDate())) {
    age--;
  }
  return age;
}

export function toTitleCase(name: string): string {
  if (!name) return "";

  return name
    .split(" ")
    .map((word) =>
      word
        .split(".")
        .map((part) =>
          part.length > 0 ? part[0].toUpperCase() + part.slice(1).toLowerCase() : ""
        )
        .join(".")
    )
    .join(" ");
}

export function formatArrayToCommaSeparated(input: string[] | null | undefined): string {
  if (!input || input.length === 0) return "-";
  return input.join(", ");
}

export const formatRupiah = (value: string) => {
  if (!value) return "";
  const number = parseInt(value.replace(/\D/g, ""), 10);
  return number.toLocaleString("id-ID");
};

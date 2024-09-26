import { clsx, type ClassValue } from "clsx";
import { twMerge } from "tailwind-merge";

export function cn(...inputs: ClassValue[]) {
  return twMerge(clsx(inputs));
}

export function getTitleNameInitials(name: string) {
  if (!name) return "?";
  const words = name.split(" ");
  const initials = words.map((word, index) => {
    if (!word) {
      return "?";
    }
    if (index === 2) {
      return;
    }
    return word[0].toUpperCase();
  });

  return initials.join("");
}

export function percentage(value: number, total: number) {
  return Math.floor((value * 100) / total);
}

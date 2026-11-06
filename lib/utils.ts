import { clsx, type ClassValue } from "clsx";

export function cn(...inputs: ClassValue[]) {
  return clsx(inputs);
}

/** True while a config value still holds its "[PLACEHOLDER]" text. */
export function isPlaceholder(value: string | undefined | null): boolean {
  return !value || /^\[.*\]$/.test(value.trim());
}

export function formatDate(iso?: string): string | undefined {
  if (!iso) return undefined;
  const d = new Date(`${iso}T12:00:00`);
  if (Number.isNaN(d.getTime())) return iso;
  return d.toLocaleDateString("en-GB", { month: "long", year: "numeric" });
}

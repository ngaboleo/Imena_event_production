import { cn } from "@/lib/utils";

interface FieldProps {
  id: string;
  label: string;
  required?: boolean;
  error?: string;
  hint?: string;
  className?: string;
  children: React.ReactNode;
}

/** Label + control + hint/error, wired up for screen readers. */
export function FormField({ id, label, required, error, hint, className, children }: FieldProps) {
  return (
    <div className={cn("flex flex-col gap-2", className)}>
      <label htmlFor={id} className="text-sm font-medium text-white">
        {label}
        {required && (
          <span className="text-electric-400" aria-hidden>
            {" "}
            *
          </span>
        )}
      </label>
      {children}
      <FieldMessage id={id} error={error} hint={hint} />
    </div>
  );
}

export function FieldMessage({ id, error, hint }: { id: string; error?: string; hint?: string }) {
  if (error)
    return (
      <p id={`${id}-error`} className="text-sm text-red-300">
        {error}
      </p>
    );
  if (hint)
    return (
      <p id={`${id}-hint`} className="text-sm text-fog">
        {hint}
      </p>
    );
  return null;
}

export const inputClasses = (hasError?: boolean) =>
  cn(
    "h-12 w-full rounded-xl border bg-night-900 px-4 text-base text-white transition-colors placeholder:text-white/35",
    "focus:border-electric-500 focus:outline-none focus:ring-4 focus:ring-electric-500/20",
    "[&>option]:bg-night-900 [color-scheme:dark]",
    hasError ? "border-red-400" : "border-white/15 hover:border-white/30",
  );

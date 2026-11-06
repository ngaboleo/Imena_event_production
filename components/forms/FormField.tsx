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
      <label htmlFor={id} className="text-sm font-medium text-pine-950">
        {label}
        {required ? (
          <span className="text-brass-600" aria-hidden>
            {" "}
            *
          </span>
        ) : (
          <span className="font-normal text-muted"> (optional)</span>
        )}
      </label>
      {children}
      {hint && !error && (
        <p id={`${id}-hint`} className="text-sm text-muted">
          {hint}
        </p>
      )}
      {error && (
        <p id={`${id}-error`} className="text-sm text-red-700">
          {error}
        </p>
      )}
    </div>
  );
}

export const inputClasses = (hasError?: boolean) =>
  cn(
    "h-12 w-full rounded-xl border bg-white px-4 text-base text-ink transition-colors placeholder:text-muted/60",
    "focus:border-pine-900 focus:outline-none focus:ring-4 focus:ring-pine-900/10",
    hasError ? "border-red-600" : "border-line hover:border-pine-900/40",
  );

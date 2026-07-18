import { cn } from "@/lib/utils";
import type { ReactNode } from "react";

/**
 * Shared input primitives for the RFQ form. Keeping label/error/textarea
 * markup in one place stops the four step components from drifting.
 */

export function FieldLabel({
  htmlFor,
  required,
  children,
}: {
  htmlFor: string;
  required?: boolean;
  children: ReactNode;
}) {
  return (
    <label
      htmlFor={htmlFor}
      className="text-small font-semibold text-graphite-900"
    >
      {children}
      {required ? (
        <span className="ms-1 text-danger-600" aria-hidden="true">
          *
        </span>
      ) : null}
    </label>
  );
}

export function FieldError({ msg }: { msg?: string }) {
  if (!msg) return null;
  return (
    <p className="mt-1 text-legal text-danger-600" role="alert">
      {msg}
    </p>
  );
}

type TextFieldProps = {
  name: string;
  label: string;
  value: string;
  onChange: (v: string) => void;
  type?: string;
  required?: boolean;
  placeholder?: string;
  error?: string;
  mono?: boolean;
  autoComplete?: string;
};

export function TextField({
  name,
  label,
  value,
  onChange,
  type = "text",
  required,
  placeholder,
  error,
  mono,
  autoComplete,
}: TextFieldProps) {
  return (
    <div>
      <FieldLabel htmlFor={name} required={required}>
        {label}
      </FieldLabel>
      <input
        id={name}
        name={name}
        type={type}
        value={value}
        onChange={(e) => onChange(e.target.value)}
        placeholder={placeholder}
        autoComplete={autoComplete}
        aria-invalid={error ? true : undefined}
        inputMode={type === "number" ? "decimal" : undefined}
        min={type === "number" ? 0 : undefined}
        className={cn(
          "mt-2 h-11 w-full rounded-md border bg-white px-3 text-meta text-graphite-900 focus:outline-none",
          error
            ? "border-danger-600 focus:border-danger-600"
            : "border-steel-200 focus:border-graphite-900",
          mono && "font-mono tabular-nums",
        )}
      />
      <FieldError msg={error} />
    </div>
  );
}

type SelectFieldProps = {
  name: string;
  label: string;
  value: string;
  onChange: (v: string) => void;
  required?: boolean;
  placeholder?: string;
  error?: string;
  children: ReactNode;
};

export function SelectField({
  name,
  label,
  value,
  onChange,
  required,
  placeholder,
  error,
  children,
}: SelectFieldProps) {
  return (
    <div>
      <FieldLabel htmlFor={name} required={required}>
        {label}
      </FieldLabel>
      <select
        id={name}
        name={name}
        value={value}
        onChange={(e) => onChange(e.target.value)}
        aria-invalid={error ? true : undefined}
        className={cn(
          "mt-2 h-11 w-full rounded-md border bg-white px-3 text-meta text-graphite-900 focus:outline-none",
          error
            ? "border-danger-600 focus:border-danger-600"
            : "border-steel-200 focus:border-graphite-900",
        )}
      >
        {placeholder !== undefined && (
          <option value="" disabled={required}>
            {placeholder}
          </option>
        )}
        {children}
      </select>
      <FieldError msg={error} />
    </div>
  );
}

type TextAreaProps = {
  name: string;
  label: string;
  value: string;
  onChange: (v: string) => void;
  placeholder?: string;
  required?: boolean;
  error?: string;
};

export function TextArea({
  name,
  label,
  value,
  onChange,
  placeholder,
  required,
  error,
}: TextAreaProps) {
  return (
    <div>
      <FieldLabel htmlFor={name} required={required}>
        {label}
      </FieldLabel>
      <textarea
        id={name}
        name={name}
        value={value}
        onChange={(e) => onChange(e.target.value)}
        placeholder={placeholder}
        rows={5}
        aria-invalid={error ? true : undefined}
        className={cn(
          "mt-2 w-full rounded-md border bg-white p-3 text-meta text-graphite-900 focus:outline-none",
          error
            ? "border-danger-600 focus:border-danger-600"
            : "border-steel-200 focus:border-graphite-900",
        )}
      />
      <FieldError msg={error} />
    </div>
  );
}

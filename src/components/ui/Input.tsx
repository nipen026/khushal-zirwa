// TODO: Implement Input — share design system when ready
import { cn } from "@/lib/utils";
import { InputHTMLAttributes } from "react";

interface InputProps extends InputHTMLAttributes<HTMLInputElement> {
  label?: string;
  error?: string;
}

export default function Input({ label, error, className, ...props }: InputProps) {
  return (
    <div className="placeholder-input-wrapper">
      {label && <label className="placeholder-label">{label}</label>}
      <input className={cn("placeholder-input", className)} {...props} />
      {error && <p className="placeholder-error">{error}</p>}
    </div>
  );
}

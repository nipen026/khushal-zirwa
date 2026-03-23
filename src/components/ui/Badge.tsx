// TODO: Implement Badge — share design system when ready
import { cn } from "@/lib/utils";

interface BadgeProps {
  label: string;
  variant?: "success" | "warning" | "info" | "error" | "default";
  className?: string;
}

export default function Badge({ label, variant = "default", className }: BadgeProps) {
  return (
    <span className={cn("placeholder-badge", `badge-${variant}`, className)}>
      {label}
    </span>
  );
}

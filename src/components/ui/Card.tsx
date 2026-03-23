// TODO: Implement Card — share design system when ready
import { cn } from "@/lib/utils";
import { HTMLAttributes } from "react";

interface CardProps extends HTMLAttributes<HTMLDivElement> {}

export default function Card({ className, children, ...props }: CardProps) {
  return (
    <div className={cn("placeholder-card", className)} {...props}>
      {children}
    </div>
  );
}

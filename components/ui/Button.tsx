import * as React from "react";
import { cn } from "@/lib/utils";

export interface ButtonProps extends React.ButtonHTMLAttributes<HTMLButtonElement> {
  variant?: "default" | "outline" | "ghost" | "secondary" | "danger" | "technical";
  size?: "sm" | "md" | "lg" | "icon";
}

export const Button = React.forwardRef<HTMLButtonElement, ButtonProps>(
  ({ className, variant = "default", size = "md", ...props }, ref) => {
    return (
      <button
        ref={ref}
        className={cn(
          "inline-flex items-center justify-center rounded-lg font-medium transition-all duration-200 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-primary focus-visible:ring-offset-2 disabled:pointer-events-none disabled:opacity-50 select-none",
          {
            "bg-primary hover:bg-primary-hover text-white shadow-[0_0_20px_rgba(124,58,237,0.3)] hover:shadow-[0_0_25px_rgba(124,58,237,0.5)] active:scale-[0.98]":
              variant === "default",
            "border border-white/10 hover:border-white/20 bg-surface hover:bg-surface-secondary text-neutral-200 hover:text-white":
              variant === "outline",
            "hover:bg-white/5 text-neutral-400 hover:text-white": variant === "ghost",
            "bg-surface-secondary hover:bg-surface-tertiary text-neutral-200 border border-border":
              variant === "secondary",
            "bg-rose-500/10 hover:bg-rose-500/20 text-rose-400 border border-rose-500/20":
              variant === "danger",
            "bg-surface-secondary text-primary-light border border-primary/30 font-mono tracking-wider hover:border-primary/60":
              variant === "technical",
          },
          {
            "h-8 px-3 text-xs": size === "sm",
            "h-10 px-4 text-sm": size === "md",
            "h-12 px-6 text-base font-semibold": size === "lg",
            "h-9 w-9 p-0": size === "icon",
          },
          className
        )}
        {...props}
      />
    );
  }
);
Button.displayName = "Button";

import * as React from "react";
import { cn } from "@/lib/utils";

export interface BadgeProps extends React.HTMLAttributes<HTMLDivElement> {
  variant?: "default" | "outline" | "technical" | "accent" | "success" | "warning" | "experiment";
}

export function Badge({ className, variant = "default", ...props }: BadgeProps) {
  return (
    <div
      className={cn(
        "inline-flex items-center rounded-md px-2.5 py-0.5 text-xs font-medium transition-colors",
        {
          "bg-white/5 text-neutral-300 border border-white/10": variant === "default",
          "border border-border text-neutral-400": variant === "outline",
          "bg-primary/10 text-primary-light border border-primary/20 font-mono text-[11px] tracking-wider":
            variant === "technical",
          "bg-indigo-500/10 text-indigo-400 border border-indigo-500/20": variant === "accent",
          "bg-emerald-500/10 text-emerald-400 border border-emerald-500/20": variant === "success",
          "bg-amber-500/10 text-amber-400 border border-amber-500/20": variant === "warning",
          "bg-cyan-500/10 text-cyan-300 border border-cyan-500/30 font-mono tracking-wider text-[11px]":
            variant === "experiment",
        },
        className
      )}
      {...props}
    />
  );
}

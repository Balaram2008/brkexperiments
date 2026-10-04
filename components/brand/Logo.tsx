import React from "react";
import Link from "next/link";
import Image from "next/image";
import { cn } from "@/lib/utils";

interface LogoProps {
  className?: string;
  showSubtitle?: boolean;
  size?: "sm" | "md" | "lg" | "xl";
}

export function Logo({ className, showSubtitle = false, size = "md" }: LogoProps) {
  const sizeMap = {
    sm: "h-7 w-auto",
    md: "h-9 w-auto",
    lg: "h-14 w-auto",
    xl: "h-20 w-auto",
  };

  return (
    <Link href="/" className={cn("group flex items-center gap-3 select-none", className)}>
      <div className="relative overflow-hidden rounded-xl bg-white px-2 py-1 shadow-md border border-white/20 transition-all duration-300 group-hover:scale-105 group-hover:shadow-[0_0_25px_rgba(124,58,237,0.35)] group-hover:border-primary/50 flex items-center justify-center">
        <Image
          src="/logo.png"
          alt="BRK Experiments Logo"
          width={180}
          height={120}
          priority
          className={cn("object-contain transition-transform duration-300", sizeMap[size])}
        />
      </div>

      {showSubtitle && (
        <div className="hidden sm:flex flex-col">
          <div className="flex items-center gap-1.5">
            <span className="text-xs font-mono font-bold tracking-widest text-primary-light uppercase">
              HARDWARE LAB
            </span>
            <span className="flex h-1.5 w-1.5 rounded-full bg-emerald-400 animate-pulse" />
          </div>
          <span className="text-[10px] font-mono text-neutral-400">
            Learn • Build • Innovate
          </span>
        </div>
      )}
    </Link>
  );
}

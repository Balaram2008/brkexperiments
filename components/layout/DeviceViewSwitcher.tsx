"use client";

import React from "react";
import { Monitor, Smartphone } from "lucide-react";
import { useDeviceView } from "@/components/providers/DeviceViewProvider";
import { useFluxTheme } from "@/components/providers/FluxThemeProvider";

export function DeviceViewSwitcher() {
  const { viewMode, setViewMode } = useDeviceView();
  const { currentTheme } = useFluxTheme();

  return (
    <div className="flex items-center rounded-xl bg-white/5 border border-white/10 p-0.5 shadow-sm backdrop-blur-md">
      <button
        onClick={() => setViewMode("desktop")}
        className={`flex items-center gap-1.5 rounded-lg px-2 sm:px-2.5 py-1 text-xs font-mono transition-all ${
          viewMode === "desktop"
            ? "bg-white/15 text-white font-bold shadow-sm border border-white/20"
            : "text-neutral-400 hover:text-white"
        }`}
        title="Desktop PC View"
      >
        <Monitor className="h-3.5 w-3.5 text-cyan-400" />
        <span className="hidden md:inline">PC</span>
      </button>

      <button
        onClick={() => setViewMode("mobile")}
        className={`flex items-center gap-1.5 rounded-lg px-2 sm:px-2.5 py-1 text-xs font-mono transition-all ${
          viewMode === "mobile"
            ? "text-black font-bold shadow-md"
            : "text-neutral-400 hover:text-white"
        }`}
        style={{
          background: viewMode === "mobile" ? `linear-gradient(135deg, ${currentTheme.primary}, ${currentTheme.secondary})` : undefined,
        }}
        title="Mobile App View"
      >
        <Smartphone className="h-3.5 w-3.5" />
        <span className="hidden md:inline">App</span>
      </button>
    </div>
  );
}

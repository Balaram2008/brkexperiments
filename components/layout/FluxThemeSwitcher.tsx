"use client";

import React, { useState, useRef, useEffect } from "react";
import { Sparkles, Palette, ChevronDown, Check } from "lucide-react";
import { useFluxTheme, FLUX_THEMES, FluxThemeId } from "@/components/providers/FluxThemeProvider";

export function FluxThemeSwitcher() {
  const { currentTheme, themeId, setTheme, themes } = useFluxTheme();
  const [open, setOpen] = useState(false);
  const ref = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const handleClickOutside = (e: MouseEvent) => {
      if (ref.current && !ref.current.contains(e.target as Node)) {
        setOpen(false);
      }
    };
    document.addEventListener("mousedown", handleClickOutside);
    return () => document.removeEventListener("mousedown", handleClickOutside);
  }, []);

  return (
    <div className="relative" ref={ref}>
      <button
        onClick={() => setOpen(!open)}
        className="flex items-center gap-1.5 rounded-lg border border-white/10 bg-white/5 px-2.5 py-1.5 text-xs font-mono text-neutral-200 hover:border-white/20 hover:bg-white/10 transition-all backdrop-blur-md shadow-sm"
        title="OxygenOS 7.0 Flux Theme Engine"
      >
        <div
          className="h-3 w-3 rounded-full transition-transform duration-300 ring-2 ring-white/20"
          style={{ backgroundColor: currentTheme.primary, boxShadow: `0 0 10px ${currentTheme.primary}` }}
        />
        <span className="hidden xl:inline text-[11px] font-semibold">{currentTheme.name}</span>
        <span className="xl:hidden text-[11px] font-semibold">Flux</span>
        <ChevronDown className="h-3 w-3 text-neutral-400" />
      </button>

      {open && (
        <div className="absolute right-0 mt-2 w-64 rounded-2xl border border-white/15 bg-[#0C0D12]/95 backdrop-blur-2xl p-2.5 shadow-2xl z-50 animate-in fade-in zoom-in-95">
          <div className="px-2 py-1.5 border-b border-white/10 mb-1.5 flex items-center justify-between">
            <div className="flex items-center gap-1.5 text-xs font-bold text-white font-mono">
              <Palette className="h-3.5 w-3.5 text-cyan-400" />
              <span>OXYGENOS FLUX THEMES</span>
            </div>
            <span className="text-[9px] font-mono px-1.5 py-0.5 rounded bg-white/10 text-neutral-300">v7.0</span>
          </div>

          <div className="space-y-1">
            {themes.map((t) => {
              const active = themeId === t.id;
              return (
                <button
                  key={t.id}
                  onClick={() => {
                    setTheme(t.id);
                    setOpen(false);
                  }}
                  className={`w-full flex items-center justify-between rounded-xl px-2.5 py-2 text-left transition-all ${
                    active
                      ? "bg-white/15 border border-white/20 text-white shadow-md"
                      : "hover:bg-white/5 text-neutral-300 hover:text-white"
                  }`}
                >
                  <div className="flex items-center gap-2.5">
                    <div
                      className="h-3.5 w-3.5 rounded-full flex-shrink-0 ring-1 ring-white/30"
                      style={{
                        background: `linear-gradient(135deg, ${t.primary}, ${t.secondary})`,
                        boxShadow: active ? `0 0 12px ${t.primary}` : "none",
                      }}
                    />
                    <div>
                      <p className="text-xs font-semibold leading-none">{t.name}</p>
                      <p className="text-[10px] text-neutral-400 font-mono mt-0.5">{t.tagline}</p>
                    </div>
                  </div>
                  {active && <Check className="h-3.5 w-3.5 text-emerald-400" />}
                </button>
              );
            })}
          </div>
        </div>
      )}
    </div>
  );
}

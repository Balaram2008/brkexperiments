"use client";

import React, { createContext, useContext, useEffect, useState } from "react";

export type FluxThemeId = "aquamorphic" | "neon-horizon" | "solar-flare" | "emerald-matrix" | "deep-oled";

export interface FluxThemeMeta {
  id: FluxThemeId;
  name: string;
  tagline: string;
  primary: string;
  secondary: string;
  glow: string;
  gradientText: string;
  gradientBg: string;
  pillColor: string;
  badgeBorder: string;
}

export const FLUX_THEMES: Record<FluxThemeId, FluxThemeMeta> = {
  aquamorphic: {
    id: "aquamorphic",
    name: "Aquamorphic Ocean",
    tagline: "OxygenOS Fluid Blue & Mint",
    primary: "#06B6D4",
    secondary: "#10B981",
    glow: "rgba(6, 182, 212, 0.35)",
    gradientText: "from-cyan-400 via-teal-300 to-emerald-400",
    gradientBg: "from-cyan-500/20 via-teal-500/10 to-transparent",
    pillColor: "bg-cyan-500",
    badgeBorder: "border-cyan-500/40 text-cyan-300 bg-cyan-500/10",
  },
  "neon-horizon": {
    id: "neon-horizon",
    name: "Neon Horizon",
    tagline: "Fluid Violet & Electric Pink",
    primary: "#8B5CF6",
    secondary: "#EC4899",
    glow: "rgba(139, 92, 246, 0.35)",
    gradientText: "from-violet-400 via-fuchsia-300 to-pink-400",
    gradientBg: "from-violet-500/20 via-fuchsia-500/10 to-transparent",
    pillColor: "bg-violet-500",
    badgeBorder: "border-violet-500/40 text-violet-300 bg-violet-500/10",
  },
  "solar-flare": {
    id: "solar-flare",
    name: "Solar Flare",
    tagline: "Energetic Sunset Amber & Ruby",
    primary: "#F59E0B",
    secondary: "#EF4444",
    glow: "rgba(245, 158, 11, 0.35)",
    gradientText: "from-amber-400 via-orange-400 to-rose-400",
    gradientBg: "from-amber-500/20 via-orange-500/10 to-transparent",
    pillColor: "bg-amber-500",
    badgeBorder: "border-amber-500/40 text-amber-300 bg-amber-500/10",
  },
  "emerald-matrix": {
    id: "emerald-matrix",
    name: "Emerald Matrix",
    tagline: "Cyber Mint & Quantum Lime",
    primary: "#10B981",
    secondary: "#84CC16",
    glow: "rgba(16, 185, 129, 0.35)",
    gradientText: "from-emerald-400 via-teal-300 to-lime-300",
    gradientBg: "from-emerald-500/20 via-lime-500/10 to-transparent",
    pillColor: "bg-emerald-500",
    badgeBorder: "border-emerald-500/40 text-emerald-300 bg-emerald-500/10",
  },
  "deep-oled": {
    id: "deep-oled",
    name: "Deep OLED Stealth",
    tagline: "Obsidian Black & Ice Blue Neon",
    primary: "#38BDF8",
    secondary: "#A855F7",
    glow: "rgba(56, 189, 248, 0.3)",
    gradientText: "from-sky-300 via-white to-purple-400",
    gradientBg: "from-sky-500/15 via-purple-500/10 to-transparent",
    pillColor: "bg-sky-400",
    badgeBorder: "border-sky-400/40 text-sky-200 bg-sky-500/10",
  },
};

interface FluxThemeContextType {
  currentTheme: FluxThemeMeta;
  themeId: FluxThemeId;
  setTheme: (id: FluxThemeId) => void;
  themes: FluxThemeMeta[];
}

const FluxThemeContext = createContext<FluxThemeContextType | undefined>(undefined);

export function FluxThemeProvider({ children }: { children: React.ReactNode }) {
  const [themeId, setThemeId] = useState<FluxThemeId>("aquamorphic");
  const [mounted, setMounted] = useState(false);

  useEffect(() => {
    const saved = localStorage.getItem("brk_flux_theme") as FluxThemeId;
    if (saved && FLUX_THEMES[saved]) {
      setThemeId(saved);
      applyThemeVariables(saved);
    } else {
      applyThemeVariables("aquamorphic");
    }
    setMounted(true);
  }, []);

  const applyThemeVariables = (id: FluxThemeId) => {
    const theme = FLUX_THEMES[id];
    if (typeof document !== "undefined") {
      const root = document.documentElement;
      root.setAttribute("data-flux-theme", id);
      root.style.setProperty("--flux-primary", theme.primary);
      root.style.setProperty("--flux-secondary", theme.secondary);
      root.style.setProperty("--flux-glow", theme.glow);
      root.style.setProperty("--flux-pill", theme.pillColor);
    }
  };

  const setTheme = (id: FluxThemeId) => {
    setThemeId(id);
    localStorage.setItem("brk_flux_theme", id);
    applyThemeVariables(id);
  };

  const currentTheme = FLUX_THEMES[themeId] || FLUX_THEMES.aquamorphic;
  const themes = Object.values(FLUX_THEMES);

  return (
    <FluxThemeContext.Provider value={{ currentTheme, themeId, setTheme, themes }}>
      {children}
    </FluxThemeContext.Provider>
  );
}

export function useFluxTheme() {
  const context = useContext(FluxThemeContext);
  if (!context) {
    throw new Error("useFluxTheme must be used within a FluxThemeProvider");
  }
  return context;
}

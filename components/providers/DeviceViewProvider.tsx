"use client";

import React, { createContext, useContext, useState, useEffect } from "react";

export type DeviceViewMode = "desktop" | "mobile";

interface DeviceViewContextType {
  viewMode: DeviceViewMode;
  setViewMode: (mode: DeviceViewMode) => void;
  toggleViewMode: () => void;
}

const DeviceViewContext = createContext<DeviceViewContextType | undefined>(undefined);

export function DeviceViewProvider({ children }: { children: React.ReactNode }) {
  const [viewMode, setViewModeState] = useState<DeviceViewMode>("desktop");
  const [mounted, setMounted] = useState(false);

  useEffect(() => {
    const saved = localStorage.getItem("brk_device_view") as DeviceViewMode;
    if (saved === "mobile" || saved === "desktop") {
      setViewModeState(saved);
    }
    setMounted(true);
  }, []);

  const setViewMode = (mode: DeviceViewMode) => {
    setViewModeState(mode);
    localStorage.setItem("brk_device_view", mode);
  };

  const toggleViewMode = () => {
    const next = viewMode === "desktop" ? "mobile" : "desktop";
    setViewMode(next);
  };

  return (
    <DeviceViewContext.Provider value={{ viewMode, setViewMode, toggleViewMode }}>
      {children}
    </DeviceViewContext.Provider>
  );
}

export function useDeviceView() {
  const context = useContext(DeviceViewContext);
  if (!context) {
    throw new Error("useDeviceView must be used within a DeviceViewProvider");
  }
  return context;
}

"use client";

import React from "react";
import { useDeviceView } from "@/components/providers/DeviceViewProvider";
import { Navbar } from "@/components/layout/Navbar";
import { Footer } from "@/components/layout/Footer";
import { CommandPalette } from "@/components/layout/CommandPalette";
import { MobileAppShell } from "@/components/layout/MobileAppShell";

export function DeviceViewContainer({ children }: { children: React.ReactNode }) {
  const { viewMode } = useDeviceView();

  if (viewMode === "mobile") {
    return (
      <MobileAppShell>
        <CommandPalette />
        <main>{children}</main>
      </MobileAppShell>
    );
  }

  return (
    <>
      <Navbar />
      <CommandPalette />
      <main className="flex-1">{children}</main>
      <Footer />
    </>
  );
}

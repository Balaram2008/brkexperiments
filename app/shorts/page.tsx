import React from "react";
import { Metadata } from "next";
import { ShortsAiExpander } from "@/components/hardware/ShortsAiExpander";

export const metadata: Metadata = {
  title: "YouTube Shorts AI Hardware Agent — BRKExperiments",
  description:
    "Fulfill YouTube Shorts from @BRKEXPERIMENTS into complete production hardware packages. Complete .ino firmware, pinout wiring tables, BOM components, and build guides synthesized by AI.",
};

export default function ShortsPage() {
  return (
    <div className="min-h-screen py-10 px-4 sm:px-6 lg:px-8 max-w-7xl mx-auto space-y-12">
      <ShortsAiExpander />
    </div>
  );
}

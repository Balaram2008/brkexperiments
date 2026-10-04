"use client";

import React from "react";
import { Filter, X, Cpu, Layers } from "lucide-react";
import { Badge } from "@/components/ui/Badge";

interface FilterSidebarProps {
  categories: Array<{ id: string; name: string; slug: string }>;
  selectedCategory: string | null;
  onSelectCategory: (slug: string | null) => void;
  selectedPlatform: string | null;
  onSelectPlatform: (platform: string | null) => void;
  selectedDifficulty: string | null;
  onSelectDifficulty: (diff: string | null) => void;
  onReset: () => void;
}

const platforms = [
  "ESP32",
  "Arduino UNO",
  "Arduino Nano",
  "Arduino Mega",
  "ESP8266",
  "Raspberry Pi Pico",
  "STM32",
];
const difficulties = ["Beginner", "Intermediate", "Advanced"];

export function FilterSidebar({
  categories,
  selectedCategory,
  onSelectCategory,
  selectedPlatform,
  onSelectPlatform,
  selectedDifficulty,
  onSelectDifficulty,
  onReset,
}: FilterSidebarProps) {
  const hasActiveFilters =
    selectedCategory !== null ||
    selectedPlatform !== null ||
    selectedDifficulty !== null;

  return (
    <div className="space-y-6 rounded-xl border border-white/10 bg-[#0B0B0D] p-5 shadow-xl">
      <div className="flex items-center justify-between border-b border-white/10 pb-4">
        <div className="flex items-center gap-2">
          <Filter className="h-4 w-4 text-primary-light" />
          <span className="text-xs font-mono uppercase tracking-wider text-white">Hardware Filters</span>
        </div>
        {hasActiveFilters && (
          <button
            onClick={onReset}
            className="flex items-center gap-1 text-[11px] font-mono text-rose-400 hover:text-rose-300"
          >
            <X className="h-3 w-3" />
            <span>Reset</span>
          </button>
        )}
      </div>

      {/* Hardware Platform Filter */}
      <div className="space-y-2">
        <div className="flex items-center gap-1.5 text-[11px] font-mono uppercase tracking-wider text-neutral-400">
          <Cpu className="h-3.5 w-3.5 text-cyan-400" />
          <span>Microcontroller Platform</span>
        </div>
        <div className="space-y-1 pt-1">
          <button
            onClick={() => onSelectPlatform(null)}
            className={`w-full text-left text-xs rounded-lg px-3 py-2 transition-colors ${
              selectedPlatform === null
                ? "bg-primary/20 text-white font-semibold border border-primary/30"
                : "text-neutral-400 hover:text-white hover:bg-white/5"
            }`}
          >
            All Platforms
          </button>
          {platforms.map((plat) => (
            <button
              key={plat}
              onClick={() => onSelectPlatform(selectedPlatform === plat ? null : plat)}
              className={`w-full text-left text-xs rounded-lg px-3 py-2 transition-colors ${
                selectedPlatform === plat
                  ? "bg-primary/20 text-white font-semibold border border-primary/30"
                  : "text-neutral-400 hover:text-white hover:bg-white/5"
              }`}
            >
              {plat}
            </button>
          ))}
        </div>
      </div>

      {/* Category Filter */}
      <div className="space-y-2 border-t border-white/5 pt-4">
        <div className="flex items-center gap-1.5 text-[11px] font-mono uppercase tracking-wider text-neutral-400">
          <Layers className="h-3.5 w-3.5 text-purple-400" />
          <span>Lab Category</span>
        </div>
        <div className="space-y-1 pt-1">
          <button
            onClick={() => onSelectCategory(null)}
            className={`w-full text-left text-xs rounded-lg px-3 py-2 transition-colors ${
              selectedCategory === null
                ? "bg-primary/20 text-white font-semibold border border-primary/30"
                : "text-neutral-400 hover:text-white hover:bg-white/5"
            }`}
          >
            All Categories
          </button>
          {categories.map((c) => (
            <button
              key={c.slug}
              onClick={() => onSelectCategory(selectedCategory === c.slug ? null : c.slug)}
              className={`w-full text-left text-xs rounded-lg px-3 py-2 transition-colors truncate ${
                selectedCategory === c.slug
                  ? "bg-primary/20 text-white font-semibold border border-primary/30"
                  : "text-neutral-400 hover:text-white hover:bg-white/5"
              }`}
            >
              {c.name}
            </button>
          ))}
        </div>
      </div>

      {/* Difficulty Filter */}
      <div className="space-y-2 border-t border-white/5 pt-4">
        <span className="text-[11px] font-mono uppercase tracking-wider text-neutral-400 block">
          Difficulty Level
        </span>
        <div className="flex flex-wrap gap-1.5 pt-1">
          {difficulties.map((diff) => {
            const active = selectedDifficulty === diff;
            return (
              <button
                key={diff}
                onClick={() => onSelectDifficulty(active ? null : diff)}
                className={`rounded-lg px-3 py-1.5 text-xs font-mono transition-colors border ${
                  active
                    ? "bg-primary text-white border-primary"
                    : "border-white/10 bg-white/5 text-neutral-400 hover:text-white"
                }`}
              >
                {diff}
              </button>
            );
          })}
        </div>
      </div>
    </div>
  );
}

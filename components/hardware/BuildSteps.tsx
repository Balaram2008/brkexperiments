"use client";

import React from "react";
import { Hammer, CheckCircle2, AlertTriangle } from "lucide-react";

export interface BuildStepItem {
  step: number;
  title: string;
  instruction: string;
  tip?: string;
}

export function BuildSteps({ buildInstructionsJson }: { buildInstructionsJson: string }) {
  let steps: BuildStepItem[] = [];
  try {
    steps = JSON.parse(buildInstructionsJson);
  } catch {
    steps = [];
  }

  if (!steps || steps.length === 0) return null;

  return (
    <div className="space-y-4 rounded-xl border border-white/10 bg-[#0B0B0D] p-6 shadow-xl">
      <div className="flex items-center gap-2 border-b border-white/10 pb-4">
        <Hammer className="h-5 w-5 text-amber-400" />
        <h2 className="text-xl font-bold text-white tracking-tight">Step-by-Step Hardware Build Guide</h2>
      </div>

      <div className="space-y-4 pt-2">
        {steps.map((st, idx) => (
          <div
            key={idx}
            className="flex gap-4 rounded-xl border border-white/5 bg-[#121217] p-4 transition-colors hover:border-white/20"
          >
            {/* Step Number Circle */}
            <div className="flex h-9 w-9 flex-shrink-0 items-center justify-center rounded-lg bg-primary/20 border border-primary/30 font-mono text-sm font-extrabold text-primary-light">
              {st.step || idx + 1}
            </div>

            {/* Step Body */}
            <div className="space-y-1.5 flex-1">
              <h3 className="text-sm font-bold text-white tracking-wide">{st.title}</h3>
              <p className="text-xs text-neutral-300 leading-relaxed">{st.instruction}</p>
              {st.tip && (
                <div className="mt-2 flex items-start gap-1.5 rounded-lg border border-amber-500/20 bg-amber-500/5 p-2 text-[11px] text-amber-300">
                  <AlertTriangle className="h-3.5 w-3.5 flex-shrink-0 mt-0.5" />
                  <span>{st.tip}</span>
                </div>
              )}
            </div>
          </div>
        ))}
      </div>
    </div>
  );
}

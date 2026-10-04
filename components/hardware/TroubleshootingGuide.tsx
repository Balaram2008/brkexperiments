"use client";

import React from "react";
import { AlertCircle, Wrench, HelpCircle } from "lucide-react";

export interface TroubleshootingItem {
  problem: string;
  cause: string;
  solution: string;
}

export function TroubleshootingGuide({ troubleshootingJson }: { troubleshootingJson: string }) {
  let items: TroubleshootingItem[] = [];
  try {
    items = JSON.parse(troubleshootingJson);
  } catch {
    items = [];
  }

  if (!items || items.length === 0) return null;

  return (
    <div className="space-y-4 rounded-xl border border-white/10 bg-[#0B0B0D] p-6 shadow-xl">
      <div className="flex items-center gap-2 border-b border-white/10 pb-4">
        <Wrench className="h-5 w-5 text-rose-400" />
        <h2 className="text-xl font-bold text-white tracking-tight">Troubleshooting & Hardware Debug Guide</h2>
      </div>

      <div className="space-y-3 pt-1">
        {items.map((item, idx) => (
          <div
            key={idx}
            className="rounded-xl border border-white/5 bg-[#121217] p-4.5 space-y-2.5 transition-colors hover:border-white/10"
          >
            {/* Problem Title */}
            <div className="flex items-start gap-2">
              <AlertCircle className="h-4 w-4 text-rose-400 flex-shrink-0 mt-0.5" />
              <h4 className="text-sm font-bold text-white leading-snug">{item.problem}</h4>
            </div>

            {/* Root Cause */}
            <div className="text-xs text-neutral-400 pl-6 leading-relaxed">
              <span className="font-semibold text-neutral-300 font-mono">ROOT CAUSE: </span>
              {item.cause}
            </div>

            {/* Verified Solution */}
            <div className="rounded-lg border border-emerald-500/20 bg-emerald-500/5 p-3 ml-6 text-xs text-emerald-300 leading-relaxed">
              <span className="font-semibold font-mono text-emerald-400">VERIFIED FIX: </span>
              {item.solution}
            </div>
          </div>
        ))}
      </div>
    </div>
  );
}
